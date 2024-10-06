import { render } from '../framework/render.js';
import { MESSAGE, SortType } from '../const.js';
import { generateFilter } from '../mock/filter.js';
import { updateItem } from '../utils/utils.js';
import { sortEventsByDay, sortEventsByTime, sortEventsByPrice } from '../utils/filter.js';

import FiltersEventsView from '../view/filters-events-view.js';
import MessageEventsView from '../view/message-events-view.js';
import SortEventsView from '../view/sort-events-view.js';

import HeaderPresenter from './header-presenter.js';
import TripPointsPresenter from './trip-points-presenter.js';


const tripFiltersElement = document.querySelector('.trip-controls__filters');


export default class ListPresenter {

  #listContainer = null;
  #pointsTrip = null;
  #destinations = null;
  #offers = null;
  #tripEventDataMap = null;

  #noTripEventsComponent = new MessageEventsView(MESSAGE.EMPTY);

  #tripPointsPresentersId = new Map();

  #listPoints = [];

  #sortComponent = null;
  #sourcedTripPoints = [];
  #currentSortType = SortType.DAY;

  constructor({
    listContainer
    , pointsTripModel
    , destinationsTripModel
    , offersTripModel
  }) {
    this.#listContainer = listContainer;
    this.#pointsTrip = pointsTripModel.points;
    this.#destinations = destinationsTripModel;
    this.#offers = offersTripModel;
    this.#tripEventDataMap = this.#pointsTrip.map((point) => this.#tripEventData(point));
  }

  init() {
    this.#listPoints = [...this.#pointsTrip];
    /** Копируем список событий, что бы можно было вернуть к изначальному виду */
    this.#sourcedTripPoints = [...this.#pointsTrip];

    /** Передаем данные в презентер шапки */
    this.#headerPresenter({
      destinations:this.#destinations
      , listPoints: this.#listPoints
    });

    /** Отрисовка компонента фильтрации */
    this.#renderFilters();

    /** Отрисовка компонента сортировки */
    this.#renderSort();

    /** Отрисовка всех компонентов путешествия */
    this.#renderList();

  }

  #renderList() {

    if (this.#listPoints.length === 0) {
      /** Если список событий пуст, то отрисовываем сообщение */
      render(this.#noTripEventsComponent, this.#listContainer);

    } else {
      /** Если список событий не пуст, то отрисовываем события */

      /** Рендерим список событий */
      this.#renderAllTripEvents();
    }
  }

  #headerPresenter({destinations, listPoints, sourcedTripPoints}) {
    const headerPresenter = new HeaderPresenter({
      destinations
      , listPoints
      , sourcedTripPoints
    });
    return headerPresenter.init();
  }

  /** Елемент события путешествия */
  #tripEventData(item) {
    const destination = this.#destinations.getDestinationById(item);
    const tripOffers = this.#offers.getSelectedOffersByType(item.type, item.offers);
    const tripAllOffers = this.#offers.getOffersByType(item.type);


    const tripEventData = ({
      id: item.id,
      basePrice: item.base_price,
      dateFrom: item.date_from,
      dateTo: item.date_to,
      destination: destination,
      isFavorite: item.is_favorite,
      offers: tripOffers,
      allOffers: this.#offers.offers,
      allOffersThisType: tripAllOffers,
      allDestinations: this.#destinations.destinations,
      type: item.type,
    });

    return tripEventData;
  }

  #renderFilters() {
    const filters = generateFilter();

    render(new FiltersEventsView({filters}), tripFiltersElement);
  }

  /** Обновление компонента с событиями путешествия */
  #handleModeChange = () => {
    this.#tripPointsPresentersId.forEach((presenter) => presenter.resetView());
  };

  /** Обновление данных путешествия */
  #handleTripPointChange = (updatedTripEventData) => {

    this.#tripEventDataMap = updateItem(this.#tripEventDataMap, updatedTripEventData);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedTripEventData);
    this.#tripPointsPresentersId.get(updatedTripEventData.id).init(updatedTripEventData);

  };

  /** Отрисовка кнопок cортировки событий путешествия */
  #renderSort() {
    this.#sortComponent = new SortEventsView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });

    render(this.#sortComponent, this.#listContainer);
  }

  /** Очистка компонента с событиями путешествия */
  #clearTripPointList() {
    this.#tripPointsPresentersId.forEach((presenter) => presenter.destroy());
    this.#tripPointsPresentersId.clear();
  }


  /** Сортировка событий путешествия
  * @param {string} sortType тип сортировки (default = day)
  * @return {array} отсортированный список событий
  * */
  #sortTripPoints(sortType) {

    switch (sortType) {
      case SortType.DAY:
        this.#tripEventDataMap.sort(sortEventsByDay);
        break;
      case SortType.TIME:
        this.#tripEventDataMap.sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this.#tripEventDataMap.sort(sortEventsByPrice);
        break;
      default:
        this.#tripEventDataMap = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  /** Перерисовывает события согласно типу сортировки
  * @param {string} sortType - тип сортировки
  * @run Отрисовку всех событий путешествия согласно типу сортировки
  * */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTripPoints(sortType);
    this.#clearTripPointList();
    this. #renderAllTripEvents();
  };


  /** Создание события путешествия - презентер */
  #renderTripPoint({ tripEventData, listContainer}) {

    const tripPointsPresenter = new TripPointsPresenter({

      tripEventData,
      listContainer,
      onEventChange: this.#handleTripPointChange,
      onModeChange: this.#handleModeChange,
    });

    tripPointsPresenter.init(tripEventData);

    this.#tripPointsPresentersId.set(tripEventData.id, tripPointsPresenter);
  }


  /** Создание списка событий путешествия */
  #renderAllTripEvents() {

    this.#tripEventDataMap.forEach((eventData) =>{

      this.#renderTripPoint({
        tripEventData: eventData
        , listContainer: this.#listContainer
      });
    });
  }
}
