import {destinations} from '../mock/destinations.js';

export default class DestinationsTripModel {
  constructor() {
    this.data = undefined;
  }

  init() {
    this.data = destinations;
  }

  get() {
    return this.data;
  }
}
