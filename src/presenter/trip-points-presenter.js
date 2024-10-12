import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

import ItemListEventsView from '../view/item-list-events-view.js';
import EditItemListEventsView from '../view/edit-item-list-events-view.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

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

  init(tripPoint) {
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

    /** Инициализируем компонент для редактирования события */
    this.#createTripPointEditComponent(tripPoint) ;

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      return render(this.#tripPointComponent, this.#pointListContainer);
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

  /**
   * Создает компонент для редактирования события
   */
  #createTripPointEditComponent(tripPoint) {
    this.#tripPointEditComponent = new EditItemListEventsView({
      tripPoint,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onCloseFormClick: this.#handleFormCloseClick,
    });
  }


  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#tripPointEditComponent);
  }

  /**
   * Метод для сброса компонента в начальное состояние
   */
  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#tripPointEditComponent.reset(this.#tripPoint);
      this.#replaceFormToCard();
    }
  }

  /**
   * Регулирует поведение при нажатии на кнопку Esc
   * @param {evt} event событие на кнопку Esc
   */
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  /**
   * Метод для редактирования события
   * Записывает стейт редактируемого компонента
   *  в начальные данные (сохраняет изменения)
   */
  #replaceCardToForm() {

    replace(this.#tripPointEditComponent, this.#tripPointComponent);

    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  /**
   * Метод для редактирования события
   * Сбрасывает стейт редактируемого компонента
   */
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
    this.#replaceFormToCard();
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
