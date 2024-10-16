
export default class OffersTripsModel {
  #offers = [];
  #offersApiService;

  constructor({offersApiService}) {
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#offersApiService.offers
      .catch(new Error('offers not found'));
  }

  getOffersByType(type) {
    return this.#offers
      .find((offersItem) => offersItem.type === type)
      .offers;
  }


  getSelectedOffersByType(type, allOffers){
    return this.getOffersByType(type)
      .filter((offer) => allOffers.includes(offer.id));
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
