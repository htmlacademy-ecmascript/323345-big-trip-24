import { render } from '../framework/render.js';
import { MESSAGE, SortType } from '../const.js';
import { sortEventsByDay, sortEventsByTime, sortEventsByPrice } from '../utils/filter.js';
import { generateFilter } from '../mock/filter.js';

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
  #loadingTripEventsComponent = new TripEventsMessage(MESSAGE.LOADING);
  #failedLoadingTripEventsComponent = new TripEventsMessage(MESSAGE.FAILED_LOAD);

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


    this.#headerPresenter({destinations:this.#destinations, pointsTrip: this.#pointsTrip});

    /** Рендерим кнопки сортировки */
    this.#renderSort();

    this.#renderAllTripEvents();

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

  #headerPresenter({destinations, pointsTrip}) {
    const headerPresenter = new HeaderPresenter({
      destinations,
      pointsTrip,
    });

    return headerPresenter.init();
  }

  /** Создание события путешествия - презентер */
  #tripPointsPresenter({destinations, pointsTrip, tripEventData, item, listContainer}) {
    const tripPointsPresenter = new TripPointsPresenter({
      destinations,
      pointsTrip,
      tripEventData,
      item,
      listContainer,
    });

    return tripPointsPresenter.init();
  }

  #renderFilters() {
    const filters = generateFilter();

    render(new TripFiltersFormView({filters}), tripFiltersElement);
  }

  /** Елемент события путешествия */
  #tripEventData(item) {
    const destination = this.#destinations.getDestinationById(item);
    const tripOffers = this.#offers.getOffersByType(item);

    const tripEventData = ({
      basePrice: item.base_price,
      dateFrom: new Date(item.date_from),
      dateTo: new Date(item.date_to),
      destination: destination,
      isFavorite: item.is_favorite,
      offers: tripOffers.offers.map((offer) => ({title: offer.title, price: offer.price, id: offer.id})),
      type: item.type,
      destinationPicture: tripOffers.type,
    });

    return tripEventData;
  }

  /** Создание списка событий путешествия */
  #renderAllTripEvents() {

    this.#listPoints.forEach((item) =>

      this.#tripPointsPresenter({
        destinations:this.#destinations
        , pointsTrip: this.#pointsTrip
        , tripEventData: this.#tripEventData(item)
        , item: item
        , listContainer: this.#listContainer
      })
    );
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

}
