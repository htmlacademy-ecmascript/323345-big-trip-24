import { render } from '../framework/render.js';
import { MESSAGE, SortType } from '../const.js';
import { sortEventsByDay, sortEventsByTime, sortEventsByPrice } from '../utils/filter.js';
import { generateFilter } from '../mock/filter.js';
import { updateItem } from '../utils/utils.js';

import SortButtonView from '../view/sort-button-view.js';
import TripFiltersFormView from '../view/trip-filters-form-view.js';
import TripEventListView from '../view/trip-events-list-view.js';
import TripEventsMessage from '../view/trip-events-message-view.js';

import HeaderPresenter from './header-presenter.js';
import TripPointsPresenter from './trip-points-presenter.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');


export default class ListPresenter {

  #listContainer = null;
  #pointsTrip = null;
  #destinations = null;
  #offers = null;

  #listComponent = new TripEventListView();
  #noTripEventsComponent = new TripEventsMessage(MESSAGE.EMPTY);

  #tripPointsPresentersId = new Map();

  #listPoints = [];
  #sourcedTripPoints = [];
  #sortComponent = null;
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
  }

  init() {
    this.#listPoints = [...this.#pointsTrip];

    this.#sourcedTripPoints = [...this.#pointsTrip];

    this.#headerPresenter({destinations:this.#destinations, listPoints: this.#listPoints});

    /** Рендерим кнопки сортировки */
    this.#renderSort();

    /** Рендерим форму фильтрации */
    this.#renderFilters();

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

  #headerPresenter({destinations, listPoints}) {
    const headerPresenter = new HeaderPresenter({
      destinations,
      listPoints,
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
      allOffers: tripAllOffers,
      type: item.type,
      destinationPicture: item.type,
    });

    return tripEventData;
  }

  /** Отрисовка cортировки событий путешествия */
  #renderSort() {
    this.#sortComponent = new SortButtonView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });

    render(this.#sortComponent, this.#listContainer);
  }

  /** Сортировка событий путешествия */
  #sortTripPoints(sortType) {

    switch (sortType) {
      case SortType.DAY:
        this.#pointsTrip.sort(sortEventsByDay);
        break;
      case SortType.TIME:
        this.#pointsTrip.sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this.#pointsTrip.sort(sortEventsByPrice);
        break;
      default:
        this.#pointsTrip = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTripPoints(sortType);
  };

  #clearTripPointList() {
    this.#tripPointsPresentersId.forEach((presenter) => presenter.destroy());
    this.#tripPointsPresentersId.clear();
  }

  #renderFilters() {
    const filters = generateFilter();

    render(new TripFiltersFormView({filters}), tripFiltersElement);
  }

  /** Обновление данных путешествия */
  #handleTripPointChange = (updatedTripEventData) => {

    this.#pointsTrip = updateItem(this.#pointsTrip, updatedTripEventData);
    this.#tripPointsPresentersId.get(updatedTripEventData.id).init(updatedTripEventData);

  };

  #handleModeChange = () => {
    this.#tripPointsPresentersId.forEach((presenter) => presenter.resetView());
  };


  /** Создание события путешествия - презентер */
  #renderTripPoint({destinations, tripEventData, listContainer}) {

    const tripPointsPresenter = new TripPointsPresenter({
      destinations,
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

    this.#listPoints.forEach((item) =>

      this.#renderTripPoint({
        destinations:this.#destinations
        , tripEventData: this.#tripEventData(item)
        , listContainer: this.#listContainer
      })

    );
  }
}
