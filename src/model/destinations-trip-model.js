import {destinations} from '../mock/destinations.js';

export default class DestinationsTripModel {
  #destinations = null;
  constructor() {
    this.#destinations = destinations;
  }

  getDestinationById(points) {
    return this.#destinations.filter((dest) => dest.id === points)[0];
  }

  getDestinationByName(destinationName) {
    return this.#destinations
      .filter((destinationItem) => destinationItem.name === destinationName)[0];
  }

  getDestinationNames() {
    return this.#destinations.map((destination) => destination.name);
  }

  get destinations () {
    return this.#destinations;
  }

}
