import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate } from '../utils.js';


function createSectionTripInfoTemplate(allDestinations, allPoints) {
  const eventDateStart = allPoints[0].date_from;
  const eventDateEnd = allPoints[allPoints.length - 1].date_to;
  const allDestinationsStr = allDestinations.map((destination) => (destination.name)).join(' — ');

  /** Без учета выбранных предложений */
  const totalBasePrice = allPoints.reduce((acc, point) => acc + point.base_price, 0);


  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${allDestinationsStr}</h1>

              <p class="trip-info__dates">${humanizeEventDate(eventDateStart, 'headerDate')} — ${humanizeEventDate(eventDateEnd, 'headerDate')}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${totalBasePrice}</span>
            </p>
          </section>`
  );
}

export default class SectionTripInfoView extends AbstractView {

  #allDestinations;
  #allPoints;

  constructor({allDestinations, allPoints}) {

    super();
    this.#allDestinations = allDestinations.destinations;
    this.#allPoints = allPoints;
  }

  get template() {
    return createSectionTripInfoTemplate(this.#allDestinations, this.#allPoints);
  }
}


