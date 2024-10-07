import { render, replace, remove } from '../framework/render.js';

import ListEventsView from '../view/list-events-view.js';
import ItemListEventsView from '../view/item-list-events-view.js';
import EditItemListEventsView from '../view/edit-item-list-events-view.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPointsPresenter {

  #listComponent = null;
  #destinations = null;
  #tripEventData = null;
  #listContainer = null;
  #tripPointComponent = null;
  #tripPointEditComponent = null;
  #handleEventChange = null;
  #mode = Mode.DEFAULT;
  #handleModeChange = null;
  constructor({
    tripEventData
    , listContainer
    , onEventChange
    , onModeChange
  }) {
    this.#destinations = tripEventData.allDestinations;
    this.#tripEventData = tripEventData;
    this.#listContainer = listContainer;
    this.#handleEventChange = onEventChange;
    this.#handleModeChange = onModeChange;
  }

  init(tripEventData) {

    this.#listComponent = new ListEventsView();
    this.#tripEventData = tripEventData;
    /** Рендерим список для новых событий */
    render(this.#listComponent, this.#listContainer);

    const prevTripPointComponent = this.#tripPointComponent;
    const prevTripPointEditComponent = this.#tripPointEditComponent;

    this.#tripPointComponent = new ItemListEventsView(this.#tripEventData, {onEditClick: this.#onEditClick, onFavoriteClick: this.#handleFavoriteClick,});


    this.#tripPointEditComponent = new EditItemListEventsView({
      tripEventData: this.#tripEventData
      , onFormSubmit: this.#onSubmitForm
      , onCloseFormClick: this.#onSubmitForm
    });

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this.#tripPointComponent, this.#listComponent.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }


    if (this.#mode === Mode.EDITING) {
      replace(this.#tripPointEditComponent, prevTripPointEditComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripPointEditComponent);
  }


  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#tripPointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#tripPointEditComponent.reset(this.#tripEventData);
      this.#replaceFormToCard();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#onSubmitForm(this.#tripEventData);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceCardToForm() {

    replace(this.#tripPointEditComponent, this.#tripPointComponent);

    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {

    replace(this.#tripPointComponent, this.#tripPointEditComponent);

    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #onEditClick = () => {
    this.#replaceCardToForm();
  };

  #onSubmitForm = (tripEventData) => {
    this.#handleEventChange(tripEventData);
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#handleEventChange({...this.#tripEventData, isFavorite: !this.#tripEventData.isFavorite});
  };
}
