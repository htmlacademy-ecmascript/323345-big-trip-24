import { render, RenderPosition } from '../framework/render.js';

import HeaderTripInfoView from '../view/header-trip-info-view.js';
import ButtonAddNewEventView from '../view/button-add-new-event-view.js';

const tripMain = document.querySelector('.trip-main');


export default class HeaderPresenter {

  #pointsTrip = null;
  #destinations = null;
  #listPoints = [];

  constructor({destinations, listPoints}) {
    this.#listPoints = listPoints;
    this.#destinations = destinations;
  }

  init() {
    this.#listPoints = [...this.#listPoints];

    this.#renderTripHeader();

  }


  /** Создание шапки сайта */
  #renderTripHeader() {
    render(new HeaderTripInfoView({allDestinations: this.#destinations , allPoints: this.#listPoints}), tripMain, RenderPosition.AFTERBEGIN); // Заголовок, даты, общая цена

    render(new ButtonAddNewEventView(), tripMain); // Заголовок, кнопка добавить событие
  }
}
