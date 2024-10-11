import { render, RenderPosition } from '../framework/render.js';

import HeaderTripInfoView from '../view/header-trip-info-view.js';
import ButtonAddNewEventView from '../view/button-add-new-event-view.js';

const tripMain = document.querySelector('.trip-main');


export default class HeaderPresenter {

  #pointsTrip = null;
  #destinations = null;
  #tripEventDataList = [];

  constructor({destinations, tripEventDataList}) {
    this.#tripEventDataList = tripEventDataList;
    this.#destinations = destinations;
  }

  init() {
    this.#tripEventDataList = [...this.#tripEventDataList];

    this.#renderTripHeader();

  }


  /** Создание шапки сайта */
  #renderTripHeader() {
    render(new HeaderTripInfoView({allDestinations: this.#destinations , tripEventDataList: this.#tripEventDataList}), tripMain, RenderPosition.AFTERBEGIN); // Заголовок, даты, общая цена

    // render(new ButtonAddNewEventView(), tripMain); // Заголовок, кнопка добавить событие
  }

  // #renderButtonAddNewEvent() {

  //   const ButtonAddNewEventComponent = new ButtonAddNewEventView({
  //     onClick: handleNewTripPointButtonClick
  //   });

  //   function handleNewTripPointButtonClick() {
  //     listPresenter.pointsTrip();
  //     ButtonAddNewEventComponent.element.disabled = true;
  //   }
  // }
}

