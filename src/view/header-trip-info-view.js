import AbstractView from '../framework/view/abstract-view.js';


function createHeaderTripInfoTemplate(totallPrice, tripDate, titleDestinations) {
  const { eventDateStart, eventDateEnd } = tripDate;

  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${titleDestinations}</h1>

              <p class="trip-info__dates">${eventDateStart} &mdash; ${eventDateEnd}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${totallPrice}</span>
            </p>
          </section>`
  );
}

export default class HeaderTripInfoView extends AbstractView {

  #totallPrice = null;
  #tripDate = null;
  #titleDestinations = null;

  constructor({ totallPrice, tripDate, titleDestinations,}) {

    super();
    this.#totallPrice = totallPrice;
    this.#tripDate = tripDate;
    this.#titleDestinations = titleDestinations;
  }

  get template() {
    return createHeaderTripInfoTemplate(this.#totallPrice, this.#tripDate, this.#titleDestinations);
  }
}
