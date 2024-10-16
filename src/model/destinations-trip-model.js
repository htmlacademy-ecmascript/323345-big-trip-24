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
