import { render, RenderPosition, replace } from '../framework/render.js';
import { MESSAGE } from '../const.js';

import SectionTripInfoView from '../view/section-trip-info-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import TripFiltersFormView from '../view/trip-filters-form-view.js';

import SortButtonView from '../view/sort-button-view.js';
import TripEventListView from '../view/trip-events-list-view.js';
import EventItemView from '../view/event-item-view.js';
// import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-poit-view.js';
import TripEventsMessage from '../view/trip-events-message-view.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');

export default class ListPresenter {

  #listContainer = null;
  #pointsTrip = null;
  #destinations = null;
  #offers = null;

  #listComponent = new TripEventListView();

  #listPoints = [];


  constructor({ listContainer, pointsTripModel, destinationsTripModel, offersTripModel }) {
    this.#listContainer = listContainer;
    this.#pointsTrip = pointsTripModel.points;
    this.#destinations = destinationsTripModel;
    this.#offers = offersTripModel;
  }

  init() {
    this.#listPoints = [...this.#pointsTrip];

    /** Отрисовка всех компонентов */
    this.#renderList();
  }


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

  #renderList() {
    /** Отрисовка шапки сайта */
    render(new SectionTripInfoView({allDestinations: this.#destinations , allPoints: this.#listPoints}), tripMain, RenderPosition.AFTERBEGIN); // Заголовок, даты, общая цена
    render(new NewEventButtonView(), tripMain); // Заголовок, кнопка добавить событие
    render (new TripFiltersFormView(), tripControlsFilters); // Кнопки сортировки

    /** Рендерим кнопки сортировки */
    render(new SortButtonView(), this.#listContainer);

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

}
