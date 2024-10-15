import { render, remove, replace, RenderPosition } from '../framework/render.js';
import { humanizeEventDate } from '../utils/time.js';
import { MAX_DESTINATION_NAME_IN_TITLE } from '../const/header-const.js';

import HeaderTripInfoView from '../view/header-trip-info-view.js';

export default class HeaderPresenter {

  #headerContainer = null;
  #pointsTripModel = null;
  #offersTripModel = null;
  #destinationsTripModel = null;
  #filtersModel = null;

  #headerTripComponent = null;
  #pointsTrip = [];

  constructor({
    headerContainer,
    pointsTripModel,
    offersTripModel,
    destinationsTripModel,
    filtersModel
  }) {
    this.#headerContainer = headerContainer;
    this.#pointsTripModel = pointsTripModel;
    this.#offersTripModel = offersTripModel;
    this.#destinationsTripModel = destinationsTripModel;
    this.#filtersModel = filtersModel;

    this.#pointsTripModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);

  }

  init() {
    this.#pointsTrip = this.#pointsTripModel.points;

    this.#renderTripHeader();
  }


  /** Создание шапки сайта */
  #renderTripHeader() {
    const prevHeaderTripComponent = this.#headerTripComponent;

    this.#headerTripComponent = new HeaderTripInfoView({
      totallPrice: this.#getTotalPrice(),
      tripDate: this.#getTripDate(),
      titleDestinations: this.#getTitleDestinations(),
    });

    if (prevHeaderTripComponent === null) {
      render(this.#headerTripComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#headerTripComponent, prevHeaderTripComponent);
    remove(prevHeaderTripComponent);

    if (this.#pointsTrip.length === 0) {
      remove(this.#headerTripComponent);
      this.#headerTripComponent = null;
    }
  }

  #handleModelEvent = () => {
    this.#pointsTrip = [];
    this.init();
  };

  #getTotalPrice() {
    const totalPrice = this.#pointsTrip.reduce(
      (accumulator, currentValue) => {
        const selectedOffersPrice = this.#offersTripModel.getSelectedOffersPrice(currentValue.type, currentValue.offers);

        accumulator = accumulator + currentValue.base_price + selectedOffersPrice;

        return accumulator;
      },
      0,
    );
    return totalPrice;
  }

  #getTripDate() {
    let eventDateStart = '';
    let eventDateEnd = '';

    if (this.#pointsTrip.length !== 0) {
      eventDateStart = this.#pointsTrip.at(0).date_from;
      eventDateEnd = this.#pointsTrip.at(-1).date_to;
    }
    const date = {
      eventDateStart: humanizeEventDate(eventDateStart, 'headerDate'),
      eventDateEnd: humanizeEventDate(eventDateEnd, 'headerDate')
    };

    if (!eventDateStart && !eventDateEnd) {
      return '';
    }

    return date ;
  }

  #getTitleDestinations() {
    const allDestinations = this.#destinationsTripModel.destinations;

    const allDestinationsNames = (allDestinations.length > MAX_DESTINATION_NAME_IN_TITLE)
      ? `${allDestinations.at(0).name} &mdash; &hellip; &mdash; ${allDestinations.at(-1).name}`
      : allDestinations.map((destination) => (destination.name)).join(' &mdash; ');

    return allDestinationsNames ;
  }
}


