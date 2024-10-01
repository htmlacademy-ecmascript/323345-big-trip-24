import {offers} from '../mock/offers.js';
export default class OffersTripsModel {
  #offers;
  constructor() {
    this.#offers = offers;
  }

  get offers() {
    return this.#offers;
  }

  set offers(offersPoints) {
    this.#offers = offersPoints;
  }

  getOffersByType(points) {
    return this.#offers.find((offer) => offer.type === points).offers;
  }

  getSelectedOffersByType(type, offersList){
    return this.getOffersByType(type)
      .filter((offer) => offersList.includes(offer.id));
  }
}
