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
  #tripPointComponent = null;
  #tripPointEditComponent = null;

  constructor({
    destinations
    , pointsTrip
    , tripEventData
    , item
    , listContainer
  }) {
    this.#destinations = destinations;
    this.#pointsTrip = pointsTrip;
    this.#tripEventData = tripEventData;
    this.#item = item;
    this.#listContainer = listContainer;
  }

  init() {

    /** Рендерим список для новых событий */
    render(this.#listComponent, this.#listContainer);

    this.#tripPointComponent = new EventItemView(this.#tripEventData, {onEditClick: this.#replaceCardToForm});

    this.#tripPointEditComponent = new EditPointView({
      tripEventData: this.#tripEventData
      , destinations: this.#destinations.getDestinationById(this.#item)
      , allDestinations: this.#destinations
      , onFormSubmit: this.#replaceFormToCard
      , onCloseFormClick: this.#replaceFormToCard
    });

    this.#rederTripEvent(this.#item);
  }

  /** Создание события путешествия */
  #rederTripEvent() {

    render (this.#tripPointComponent, this.#listComponent.element);
  }


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceCardToForm() {

    replace(this.#tripPointEditComponent, this.#tripPointComponent);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {

    replace(this.#tripPointComponent, this.#tripPointEditComponent);

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}
