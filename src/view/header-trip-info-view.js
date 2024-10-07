import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate } from '../utils/time.js';

const MAX_DESTINATION_NAME_IN_TITLE = 3;

function createHeaderTripInfoTemplate(allDestinations, tripEventDataList) {
  function getDateAllPoints() {

    let eventDateStart = '';
    let eventDateEnd = '';

    if (tripEventDataList.length !== 0) {
      eventDateStart = tripEventDataList[0].date_from;
      eventDateEnd = tripEventDataList[tripEventDataList.length - 1].date_to;

      const allDestinationsPoints = (allDestinations.length > MAX_DESTINATION_NAME_IN_TITLE)
        ? `${allDestinations[0].name} — ... — ${allDestinations[allDestinations.length - 1].name}`
        : allDestinations.map((destination) => (destination.name)).join(' — ');

      return {eventDateStart, eventDateEnd, allDestinationsPoints};
    }

    // return {eventDateStart, eventDateEnd};
  }
  const date = getDateAllPoints();

  /** Без учета выбранных предложений */
  function getTotalBasePrice() {
    const allBasePrice = tripEventDataList.length
      ? tripEventDataList.reduce((acc, point) => acc + point.basePrice, 0)
      : 0;

    return allBasePrice;
  }
  const totalBasePrice = getTotalBasePrice();


  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${date.allDestinationsPoints}</h1>

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
  #tripEventDataList = null;

  constructor({allDestinations, tripEventDataList }) {

    super();
    this.#allDestinations = allDestinations.destinations;
    this.#tripEventDataList = tripEventDataList;
  }

  get template() {
    return createHeaderTripInfoTemplate(this.#allDestinations, this.#tripEventDataList);
  }
}


