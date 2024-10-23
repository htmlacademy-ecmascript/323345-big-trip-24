export default class DestinationsTripModel {
  #destinations = [];
  #destinationsApiService = null;
  constructor({destinationsApiService}) {
    this.#destinationsApiService = destinationsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch(err) {
      throw new Error('destinations not found');
    }
  }

  getDestinationById(points) {
    return this.#destinations.find((destination) => destination.id === points);
  }

  getDestinationByName(destinationName) {
    return this.#destinations
      .find((destinationItem) => destinationItem.name === destinationName);
  }


  getDestinationNames() {
    return this.#destinations.map((destination) => destination.name);
  }

  get destinations () {
    return this.#destinations;
  }

}
