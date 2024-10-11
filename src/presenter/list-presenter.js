import { render, remove } from '../framework/render.js';
import { SortType, FilterType, UpdateType, UserAction } from '../const.js';
import { sortEventsByDay, sortEventsByTime, sortEventsByPrice } from '../utils/sort.js';
import { filter } from '../utils/filter.js';

import FiltersPresenter from './filters-presenter.js';
import MessageEventsView from '../view/message-events-view.js';
import SortEventsView from '../view/sort-events-view.js';
import ListEventsView from '../view/list-events-view.js';

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
  #listComponent = null;

  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({
    listContainer,
    pointsTripModel,
    destinationsTripModel,
    offersTripModel,
    filtersModel,
  }) {
    this.#listContainer = listContainer;
    this.#pointsTripModel = pointsTripModel;
    this.#destinationsModel = destinationsTripModel;
    this.#offersModel = offersTripModel;
    this.#filtersModel = filtersModel;

    this.#listComponent = new ListEventsView();

    /** Подписываемся на изменение данных модели и прокидываем callback */
    this.#pointsTripModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get tripPoints() {
    this.#filterType = this.#filtersModel.filter;
    const tripPoints = this.#pointsTripModel.points;
    const filteredTripPoints = filter[this.#filterType](tripPoints);

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
    /** Отрисовка компонента фильтрации */
    this.#renderFilters();
    // render(this.#listComponent, this.#listContainer);
    /** Отрисовка всех компонентов путешествия */
    this.#renderList();

  }

  createTripPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if (this.#noTripEventsComponent) {
      remove(this.#noTripEventsComponent);
    }
  }

  #renderList() {
    this.#renderSort();
    render(this.#listComponent, this.#listContainer);
    if (this.#pointsTripModel.points.length === 0) {
      /** Если список событий пуст, то отрисовываем сообщение */
      this.#renderNoTripEventsComponent();
    } else {
      /** Рендерим список событий */
      this.#renderAllTripEvents(this.tripPoints);
    }
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


  /** Парсер данных события путешествия из общего обьекта
   *  в формат данных сервера для pointsTripModel
  */

  /**
   * Обработчик события изменения View (от вьюшек)
   * Принимает пользовательские данные от вьюшки и передает их в модель
   * @param {UserAction} actionType - тип события (обновить/добавить/удалить)
   * @param {UpdateType} updateType - тип обновления (patch/minor/major)
   * @param {object} update - обновленные данные (объект с данными от вьюшки)
   * @returns Отправляет обновленные данные в модель для обновленния
   */
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsTripModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsTripModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsTripModel.deletePoint(updateType, update);
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
  #renderTripPoint(tripPoint) {
    if (this.#noTripEventsComponent) {
      remove(this.#noTripEventsComponent);
    }
    const tripPointsPresenter = new TripPointsPresenter({
      pointListContainer: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onEventChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    tripPointsPresenter.init(tripPoint);

    this.#tripPointsPresentersId.set(tripPoint.id, tripPointsPresenter);
  }

  #renderNoTripEventsComponent() {
    this.#noTripEventsComponent = new MessageEventsView({
      filterType: this.#filterType,
    });
    render(this.#noTripEventsComponent, this.#listComponent.element);
  }


  /** Создание списка событий путешествия */
  #renderAllTripEvents(tripPoints) {
    this.#renderNoTripEventsComponent();
    tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint));
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
