import { render, RenderPosition } from '../framework/render.js';

import SectionTripInfoView from '../view/section-trip-info-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';

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
    render(new SectionTripInfoView({allDestinations: this.#destinations , allPoints: this.#listPoints}), tripMain, RenderPosition.AFTERBEGIN); // Заголовок, даты, общая цена

    render(new NewEventButtonView(), tripMain); // Заголовок, кнопка добавить событие
  }
}
