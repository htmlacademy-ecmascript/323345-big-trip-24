import { render, remove } from '../framework/render.js';
import { SortType, FilterType, UpdateType, UserAction } from '../const.js';
import { sortEventsByDay, sortEventsByTime, sortEventsByPrice } from '../utils/sort.js';
import { filter } from '../utils/filter.js';

import FiltersPresenter from './filters-presenter.js';
import MessageEventsView from '../view/message-events-view.js';
import SortEventsView from '../view/sort-events-view.js';

import HeaderPresenter from './header-presenter.js';
import TripPointsPresenter from './trip-points-presenter.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');


export default class ListPresenter {

  #listContainer = null;
  #pointsTripModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;

  #tripPointsPresentersId = new Map();
  #noTripEventsComponent = null;

  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({
    listContainer
    , pointsTripModel
    , destinationsTripModel
    , offersTripModel
    , filtersModel
  }) {
    this.#listContainer = listContainer;
    this.#pointsTripModel = pointsTripModel;
    this.#destinationsModel = destinationsTripModel;
    this.#offersModel = offersTripModel;
    this.#filtersModel = filtersModel;

    /** Подписываемся на изменение данных модели и прокидываем callback */
    this.#pointsTripModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get pointsTrip() {
    this.#filterType = this.#filtersModel.filter;
    const pointsTrip = this.#pointsTripModel.points;
    const filteredTripPoints = filter[this.#filterType](pointsTrip);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredTripPoints.sort(sortEventsByDay);
      case SortType.TIME:
        return filteredTripPoints.sort(sortEventsByTime);
      case SortType.PRICE:
        return filteredTripPoints.sort(sortEventsByPrice);
    }

    return filteredTripPoints;
  }

  init() {

    /** Передаем данные в презентер шапки */
    this.#headerPresenter({
      destinations:this.#destinationsModel
      , tripEventDataList: this.#createTripEventDataList()
    });

    /** Отрисовка компонента фильтрации */
    this.#renderFilters();

    /** Отрисовка всех компонентов путешествия */
    this.#renderList();

  }

  #renderList() {

    if (this.#pointsTripModel.points.length === 0) {
      /** Если список событий пуст, то отрисовываем сообщение */
      this.#renderNoTripEventsComponent();

    } else {
      /** Если список событий не пуст, то отрисовываем события */

      /** Отрисовка компонента сортировки */
      this.#renderSort();

      /** Рендерим список событий */
      this.#renderAllTripEvents();
    }
  }

  #createTripEventDataList() {

    const tripEventDataList = this.pointsTrip.map((point) => this.#tripEventData(point));
    return tripEventDataList;
  }

  /** Елемент события путешествия */
  #tripEventData(item) {
    const destination = this.#destinationsModel.getDestinationById(item);
    const tripOffers = this.#offersModel.getSelectedOffersByType(item.type, item.offers);
    const tripAllOffers = this.#offersModel.getOffersByType(item.type);


    const tripEventData = ({
      id: item.id,
      basePrice: item.base_price,
      dateFrom: item.date_from,
      dateTo: item.date_to,
      destination: destination,
      isFavorite: item.is_favorite,
      offers: tripOffers,
      allOffers: this.#offersModel.offers,
      allOffersThisType: tripAllOffers,
      allDestinations: this.#destinationsModel.destinations,
      type: item.type,
    });
    return tripEventData;
  }

  #renderFilters() {

    const filtersPresenter = new FiltersPresenter({
      filterContainer: tripFiltersElement,
      filtersModel: this.#filtersModel,
      pointsTripModel: this.#pointsTripModel,
    });
    return filtersPresenter.init();
  }

  /** Обновление компонента с событиями путешествия */
  #handleModeChange = () => {
    this.#tripPointsPresentersId.forEach((presenter) => presenter.resetView());
  };

  /**
   * Обработчик события изменения View (от вьюшек)
   * Принимает пользовательские данные от вьюшки и передает их в модель
   * @param {UserAction} actionType - тип события (обновить/добавить/удалить)
   * @param {UpdateType} updateType - тип обновления (patch/minor/major)
   * @param {object} update - обновленные данные (объект с данными от вьюшки)
   * @returns Отправляет обновленные данные в модель для обновленния
   */
  #handleViewAction = (actionType, updateType, update) => {
    const updateParse = {id: update.id, 'base_price': update.basePrice, 'date_from': update.dateFrom, 'date_to': update.dateTo, destination: update.destination.id, 'is_favorite': update.isFavorite, offers: update.offers, type: update.type};

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsTripModel.updatePoint(updateType, updateParse);
        break;
      case UserAction.ADD_POINT:
        this.#pointsTripModel.addPoint(updateType, updateParse);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsTripModel.deletePoint(updateType, updateParse);
        break;
    }
  };

  /**
   * Обработчик события изменения данных модели
   * @param {UpdateType} updateType - тип обновления (patch/minor/major)
   * @param {object} data - обновленные данные
   * @returns перерисовывает компоненты согласно типу обновления
   */
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPointsPresentersId.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripPointList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearTripPointList({ resetSortType: true });
        this.#renderList();
        break;
    }
  };

  #headerPresenter({destinations, tripEventDataList, sourcedTripPoints}) {

    const headerPresenter = new HeaderPresenter({
      destinations
      , tripEventDataList
      , sourcedTripPoints
    });
    return headerPresenter.init();
  }

  /** Отрисовка кнопок cортировки событий путешествия */
  #renderSort() {
    this.#sortComponent = new SortEventsView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });

    render(this.#sortComponent, this.#listContainer);
  }

  /** Перерисовывает события согласно типу сортировки
  * @param {string} sortType - тип сортировки
  * @run Отрисовку всех событий путешествия согласно типу сортировки
  */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearTripPointList();
    this.#renderList();
  };


  /** Создание события путешествия - презентер */
  #renderTripPoint({ tripEventData, listContainer}) {

    if (this.#noTripEventsComponent) {
      remove(this.#noTripEventsComponent);
    }
    const tripPointsPresenter = new TripPointsPresenter({

      tripEventData,
      listContainer,
      onEventChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    tripPointsPresenter.init(tripEventData);

    this.#tripPointsPresentersId.set(tripEventData.id, tripPointsPresenter);
  }

  #renderNoTripEventsComponent() {
    this.#noTripEventsComponent = new MessageEventsView({
      filterType: this.#filterType,
    });
    render(this.#noTripEventsComponent, this.#listContainer);
  }


  /** Создание списка событий путешествия */
  #renderAllTripEvents() {
    this.#renderNoTripEventsComponent();

    this.#createTripEventDataList().forEach((eventData) =>{

      this.#renderTripPoint({
        tripEventData: eventData
        , listContainer: this.#listContainer
      });
    });
  }

  /** Очистка компонента с событиями путешествия */
  #clearTripPointList({ resetSortType = false } = {}) {

    this.#tripPointsPresentersId.forEach((presenter) => presenter.destroy());
    this.#tripPointsPresentersId.clear();

    remove(this.#sortComponent);

    if (this.#noTripEventsComponent) {
      remove(this.#noTripEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
