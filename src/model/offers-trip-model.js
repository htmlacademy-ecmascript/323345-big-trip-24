import {offers} from '../mock/offers.js';
export default class OffersTripsModel {
  constructor(data) {
    this.data = data;
  }

  init() {
    this.data = offers;
  }

  get() {
    return this.data;
  }

  getOffersByType(points) {
    return this.data.find((offer) => offer.type === points.type);
  }
}
