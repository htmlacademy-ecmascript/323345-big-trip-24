import {destinations} from '../mock/destinations.js';

export default class DestinationsTripModel {
  #destinations;
  constructor() {
    this.#destinations = destinations;
  }

  getDestinationById(points) {

    return this.#destinations.find((dest) => dest.id === points.destination);
  }

  get destinations () {
    return this.#destinations;
  }

  set destinations (destinationsPoints) {
    this.#destinations = destinationsPoints;
  }
}
