import { render, replace } from '../framework/render.js';

import TripEventListView from '../view/trip-events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EditPointView from '../view/edit-poit-view.js';


export default class TripPointsPresenter {

  #listComponent = new TripEventListView();
  #destinations = null;
  #pointsTrip = null;
  #tripEventData = null;
  #item = null;
  #listContainer = null;
  #listPoints = [];

  constructor({destinations, pointsTrip, tripEventData, item, listContainer}) {
    this.#destinations = destinations;
    this.#pointsTrip = pointsTrip;
    this.#tripEventData = tripEventData;
    this.#item = item;
    this.#listContainer = listContainer;
  }

  init() {

    render(this.#listComponent, this.#listContainer);

    this.#rederTripEvent(this.#item);

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
      tripEventData: this.#tripEventData
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

    const tripPointComponent = new EventItemView(this.#tripEventData
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
}
