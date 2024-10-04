import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate } from '../utils/utils.js';

const MAX_DESTINATION_NAME_IN_TITLE = 3;

function createHeaderTripInfoTemplate(allDestinations, allPoints) {
  function getDateAllPoints() {

    let eventDateStart = '';
    let eventDateEnd = '';

    if (allPoints.length !== 0) {
      eventDateStart = allPoints[0].date_from;
      eventDateEnd = allPoints[allPoints.length - 1].date_to;

      const allDestinationsStr = (allDestinations.length > MAX_DESTINATION_NAME_IN_TITLE)
        ? `${allDestinations[0].name} — ... — ${allDestinations[allDestinations.length - 1].name}`
        : allDestinations.map((destination) => (destination.name)).join(' — ');

      return {eventDateStart, eventDateEnd, allDestinationsStr};
    }

    // return {eventDateStart, eventDateEnd};
  }
  const date = getDateAllPoints();

  /** Без учета выбранных предложений */
  function getTotalBasePrice() {

    let allBasePrice = 0;
    if (allPoints.length !== 0) {
      allBasePrice = allPoints.reduce((acc, point) => acc + point.base_price, 0);
      return allBasePrice;
    }
    return allBasePrice;
  }

  const totalBasePrice = getTotalBasePrice();


  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${date.allDestinationsStr}</h1>

              <p class="trip-info__dates">${humanizeEventDate(date.eventDateStart, 'headerDate')} — ${humanizeEventDate(date.eventDateEnd, 'headerDate')}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${totalBasePrice}</span>
            </p>
          </section>`
  );
}

export default class HeaderTripInfoView extends AbstractView {

  #allDestinations = null;
  #allPoints = null;

  constructor({allDestinations, allPoints}) {

    super();
    this.#allDestinations = allDestinations.destinations;
    this.#allPoints = allPoints;
  }

  get template() {
    return createHeaderTripInfoTemplate(this.#allDestinations, this.#allPoints);
  }
}


