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

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }

  getSelectedOffersByType(type, offersList){
    return this.getOffersByType(type)
      .filter((offer) => offersList.includes(offer.id));
  }

  getOffersById(id) {
    return this.#offers.find((offer) => offer.id === id);
  }
}
