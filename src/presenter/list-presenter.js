import { render, replace } from '../framework/render.js';

import SortButtonView from '../view/sort-view.js';
import TripEventListView from '../view/trip-events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-poit-view.js';
import TripEventsMessage from '../view/trip-events-message-view.js';

export default class ListPresenter {

  #listContainer;
  #pointsTrip;
  #destinations;
  #offers;

  #listComponent = new TripEventListView();

  #listPoints = [];


  constructor({ listContainer, pointsTripModel, destinationsTripModel, offersTripModel }) {
    this.#listContainer = listContainer;
    this.#pointsTrip = pointsTripModel.get();
    this.#destinations = destinationsTripModel;
    this.#offers = offersTripModel;
  }

  init() {
    this.#listPoints = [...this.#pointsTrip];

    /** Переделать логику отрисовки редактируемого события */
    this.#rederTripEvent(this.#listPoints[0]);

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
    // console.log(tripPointComponent);
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
    /** Рендерим список для новых событий */
    render(this.#listComponent, this.#listContainer);

    /** Если список событий пуст, то отрисовываем сообщение */
    if (this.#listPoints.length === 0) {
      render(new TripEventsMessage, this.#listContainer);

    }
    /** Рендерим кнопки сортировки */
    render(new SortButtonView(), this.#listContainer);

    /** Рендерим список событий */
    this.#renderAllTripEvents();

    // Переделать логику отрисовки новой точки!
    // render(new AddNewPointView({pointsTrip: this.#listPoints, offers: this.#offers}), this.#listContainer);
  }

}
