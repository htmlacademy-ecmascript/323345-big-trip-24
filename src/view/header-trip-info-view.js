import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate } from '../utils/time.js';

const MAX_DESTINATION_NAME_IN_TITLE = 3;

function createHeaderTripInfoTemplate(allBasePrice, allDestinationsNames, date) {
  const { eventDateStart, eventDateEnd } = date;

  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${allDestinationsNames}</h1>

              <p class="trip-info__dates">${eventDateStart} &mdash; ${eventDateEnd}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${allBasePrice}</span>
            </p>
          </section>`
  );
}

export default class HeaderTripInfoView extends AbstractView {

  #allDestinations = null;
  #tripEventDataList = null;

  constructor({allDestinations, tripEventDataList }) {

    super();
    this.#allDestinations = allDestinations.destinations;
    this.#tripEventDataList = tripEventDataList;
  }

  get template() {
    return createHeaderTripInfoTemplate(this.#totalBasePrice(), this.#allDestinationsNames(), this.#date());
  }

  #totalBasePrice() {
    const allBasePrice = this.#tripEventDataList.length !== 0
      ? this.#tripEventDataList.reduce((acc, point) => acc + point.basePrice, 0)
      : 0;

    return allBasePrice;
  }

  #date() {

    let eventDateStart = '';
    let eventDateEnd = '';

    if (this.#tripEventDataList.length !== 0) {
      eventDateStart = this.#tripEventDataList[0].dateFrom;
      eventDateEnd = this.#tripEventDataList[this.#tripEventDataList.length - 1].dateTo;
    }
    const date = {
      eventDateStart: humanizeEventDate(eventDateStart, 'headerDate'),
      eventDateEnd: humanizeEventDate(eventDateEnd, 'headerDate')
    };
    return date ;
  }


  #allDestinationsNames() {

    const allDestinationsNames = (this.#allDestinations.length > MAX_DESTINATION_NAME_IN_TITLE)
      ? `${this.#allDestinations[0].name} &mdash; &hellip; &mdash; ${this.#allDestinations[this.#allDestinations.length - 1].name}`
      : this.#allDestinations.map((destination) => (destination.name)).join(' &mdash; ');

    return allDestinationsNames ;
  }
}
