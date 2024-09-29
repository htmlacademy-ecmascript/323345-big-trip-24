import { render, replace } from '../framework/render.js';
import { MESSAGE } from '../const.js';
import { SortType } from '../const.js';
import { sortEventsByDay, sortEventsByTime, sortEventsByPrice } from '../utils/filter.js';
import { generateFilter } from '../mock/filter.js';

import SortButtonView from '../view/sort-button-view.js';
import TripFiltersFormView from '../view/trip-filters-form-view.js';
import TripEventListView from '../view/trip-events-list-view.js';
import EventItemView from '../view/event-item-view.js';
// import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-poit-view.js';
import TripEventsMessage from '../view/trip-events-message-view.js';

import HeaderPresenter from './header-presenter.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');


export default class ListPresenter {

  #listContainer = null;
  #pointsTrip = null;
  #destinations = null;
  #offers = null;

  #listComponent = new TripEventListView();

  #listPoints = [];
  #sourcedTripPoints = [];
  #sortComponent = null;
  #currentSortType = SortType.DAY;

  constructor({ listContainer, pointsTripModel, destinationsTripModel, offersTripModel }) {
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

    /** Рендерим форму фильтрации */
    this.#renderFilters();

    /** Отрисовка всех компонентов путешествия */
    this.#renderList();

  }

  #renderList() {

    /** Рендерим список для новых событий */
    render(this.#listComponent, this.#listContainer);

    if (this.#listPoints.length === 0) {
      /** Если список событий пуст, то отрисовываем сообщение */
      render(new TripEventsMessage(MESSAGE.EMPTY), this.#listContainer);

    } else {
      /** Если список событий не пуст, то отрисовываем события */

      /** Рендерим редактируемое событие */
      this.#rederTripEvent(this.#listPoints[0]);

      /** Рендерим список событий */
      this.#renderAllTripEvents();
    }


    // Переделать логику отрисовки новой точки!
    // render(new AddNewPointView({pointsTrip: this.#listPoints, offers: this.#offers}), this.#listContainer);
  }

  #headerPresenter({destinations, pointsTrip}) {
    const headerPresenter = new HeaderPresenter({
      destinations,
      pointsTrip,
    });

    return headerPresenter.init();
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
      destination: destination.name,
      isFavorite: item.is_favorite,
      offers: tripOffers.offers.map((offer) => ({title: offer.title, price: offer.price, id: offer.id})),
      type: item.type,
      destinationPicture: tripOffers.type,
    });

    return tripEventData;
  }

  /** Создание события путешествия */
  #rederTripEvent(item) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripPointEditComponent = new EditPointView({
      tripEventData: this.#tripEventData(item)
      , destinations: this.#destinations.getDestinationById(item)
      , allDestinations: this.#destinations
      , onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
      , onCloseFormClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    const tripPointComponent = new EventItemView(this.#tripEventData(item)
      , {onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
      });

    function replaceCardToForm() {
      replace(tripPointEditComponent, tripPointComponent);
    }

    function replaceFormToCard() {
      replace(tripPointComponent, tripPointEditComponent);
    }

    render (tripPointComponent, this.#listComponent.element);
  }

  /** Создание списка событий путешествия */
  #renderAllTripEvents() {

    this.#listPoints.forEach((item) => {

      this.#rederTripEvent(item);

    });
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
