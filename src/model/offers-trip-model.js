import {offers} from '../mock/offers.js';
export default class OffersTripsModel {
  constructor() {
    this.data = undefined;
  }

  init() {
    this.data = offers;
  }

  get() {
    return this.data;
  }
}
