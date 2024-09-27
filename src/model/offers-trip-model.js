import {offers} from '../mock/offers.js';
export default class OffersTripsModel {
  #offers;
  constructor() {
    this.#offers = offers;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(points) {
    return this.#offers.find((offer) => offer.type === points.type);
  }
}
