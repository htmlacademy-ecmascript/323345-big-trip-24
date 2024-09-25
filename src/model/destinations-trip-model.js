import {destinations} from '../mock/destinations.js';

export default class DestinationsTripModel {
  constructor(data) {
    this.data = data;
  }

  init() {
    this.data = destinations;
  }

  getDestinationById(points) {
    return this.data.find((dest) => dest.id === points.destination);
  }

  get() {
    return this.data;
  }
}
