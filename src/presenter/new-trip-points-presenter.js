import { render, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, EMPTY_POINT } from '../const/const.js';
import EditItemListEventsView from '../view/edit-item-list-events-view.js';


export default class NewTripPointPresenter {

  #pointComponentContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #tripPointEditComponent = null;

  #destinationsModel = null;
  #offersModel = null;

  constructor({
    tripPointListContainer,
    onDataChange,
    onDestroy,
    destinationsModel,
    offersModel,
  }) {
    this.#pointComponentContainer = tripPointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    if (this.#tripPointEditComponent !== null) {
      return;
    }

    this.#tripPointEditComponent = new EditItemListEventsView({
      tripPoint: EMPTY_POINT,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onCloseFormClick: this.#handleFormCloseClick,
      isNewPoint: true,
    });

    render(this.#tripPointEditComponent, this.#pointComponentContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#tripPointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#tripPointEditComponent);
    this.#tripPointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#tripPointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#tripPointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripPointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (tripPoint) => {

    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      tripPoint,
    );

    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormCloseClick = () => {
    this.destroy();
  };
}
