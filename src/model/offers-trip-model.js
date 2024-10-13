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
    return this.#offers
      .filter((offersItem) => offersItem.type === type)[0]
      .offers;
  }

  getSelectedOffersByType(type, allOffers){
    return this.getOffersByType(type)
      .filter((offer) => allOffers.includes(offer.id));
  }

  getOffersById(id) {
    return this.#offers.find((offer) => offer.id === id);
  }

  getSelectedOffersPrice(type, allOffers) {
    const selectedOffers = this.getSelectedOffersByType(type, allOffers);

    const totalPrice = selectedOffers.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0,
    );

    return totalPrice;
  }
}
