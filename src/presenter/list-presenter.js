import { render } from '../render.js';

import SortButtonView from '../view/sort-view.js';
import TripEventListView from '../view/trip-events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-poit-view.js';
import TripEventsMessage from '../view/trip-events-message-view.js';

// import { destionations } from '../mock/destionations.js';
// import { offers } from '../mock/offers.js';

export default class ListPresenter {
  listComponent = new TripEventListView();

  constructor({ listContainer, pointsTripModel, destinationsTripModel, offersTripModel }) {
    this.listContainer = listContainer;
    this.pointsTrip = pointsTripModel.get();
    this.destinations = destinationsTripModel;
    this.offers = offersTripModel;
  }

  init() {
    this.listPoints = [...this.pointsTrip];

    const tripEventData = (item) => {
      const destination = this.destinations.getDestinationById(item);
      const tripOffers = this.offers.getOffersByType(item);

      return ({
        basePrice: item.base_price,
        dateFrom: new Date(item.date_from),
        dateTo: new Date(item.date_to),
        destination: destination.name,
        isFavorite: item.is_favorite,
        offers: tripOffers.offers.map((offer) => ({title: offer.title, price: offer.price, id: offer.id})),
        type: item.type,
        destinationPicture: tripOffers.type,
      });
    };

    render(new SortButtonView(), this.listContainer);
    render(new AddNewPointView({pointsTrip: this.listPoints, offers: this.offers}), this.listContainer);

    render(new EditPointView(
      tripEventData(this.pointsTrip[0]),
      this.destinations.getDestinationById(this.pointsTrip[0]),
      {allDestinations: this.destinations}
    ), this.listContainer);
    render(this.listComponent, this.listContainer);

    // Создание элементов в списке
    this.listPoints.forEach((item) => { // Создание элементов в списке

      render (new EventItemView({tripEventData: tripEventData(item)}), this.listComponent.getElement());
    });


    render(new TripEventsMessage(), this.listContainer);
  }
}
