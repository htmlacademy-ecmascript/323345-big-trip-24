import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import { Mode } from '../const.js';

import ItemListEventsView from '../view/item-list-events-view.js';
import EditItemListEventsView from '../view/edit-item-list-events-view.js';

export default class TripPointsPresenter {

  #pointListContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #handleDataChange = null;

  #tripPoint = null;
  #tripPointComponent = null;
  #tripPointEditComponent = null;
  #mode = Mode.DEFAULT;
  #handleModeChange = null;
  constructor({
    pointListContainer,
    destinationsModel,
    offersModel,
    onDataChange,
    onModeChange,
  }) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  async init(tripPoint) {
    if (this.#offersModel.offers.length === 0) {
      await this.#offersModel.init();
    }

    if (this.#destinationsModel.destinations.length === 0) {
      await this.#destinationsModel.init();
    }

    this.#tripPoint = tripPoint;
    this.#createTripPointComponent(tripPoint);
  }

  #createTripPointComponent(tripPoint) {
    const prevTripPointComponent = this.#tripPointComponent;
    const prevTripPointEditComponent = this.#tripPointEditComponent;

    this.#tripPointComponent = new ItemListEventsView({
      tripPoint,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onEditClick: this.#onEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#createTripPointEditComponent(tripPoint);

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      return render(this.#tripPointComponent, this.#pointListContainer);
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripPointComponent, prevTripPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevTripPointComponent);
    remove(prevTripPointEditComponent);
  }

  #createTripPointEditComponent(tripPoint) {
    this.#tripPointEditComponent = new EditItemListEventsView({
      tripPoint,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onCloseFormClick: this.#handleFormCloseClick,
      isNewPoint: false,
    });
  }


  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#tripPointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#tripPointEditComponent.reset(this.#tripPoint);
      this.#replaceFormToCard();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#tripPointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#tripPointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripPointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#tripPointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripPointEditComponent.shake(resetFormState);
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
    this.#tripPointEditComponent.reset(this.#tripPoint);

    this.#handleModeChange();
    document.addEventListener('keydown', this.#escKeyDownHandler);
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

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      this.#tripPoint.date_from !== update.date_from
      || this.#tripPoint.date_to !== update.date_to
      || this.#tripPoint.base_price !== update.base_price;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#tripPoint, 'is_favorite': !this.#tripPoint.is_favorite}
    );
  };

  #handleFormCloseClick = () => {
    this.#replaceFormToCard();
  };

  #handleDeleteClick = (tripPoint) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      tripPoint
    );
  };
}
