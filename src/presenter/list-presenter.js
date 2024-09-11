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

  constructor({ listContainer, pointsTripModel, destionationsTripModel, offersTripModel }) {
    this.listContainer = listContainer;
    this.pointsTrip = pointsTripModel;
    this.destionations = destionationsTripModel;
    this.offers = offersTripModel;
  }

  init() {
    this.listPoints = [...this.pointsTrip];

    render(new SortButtonView(), this.listContainer);
    render(new AddNewPointView(), this.listContainer);
    render(new EditPointView(), this.listContainer);
    render(this.listComponent, this.listContainer);

    // Создание элементов в списке
    this.pointsTrip.forEach((item) => { // Создание элементов в списке
      const destination = this.destionations.find((dest) => dest.id === item.destination);
      const offersItems = this.offers.find((offer) => offer.type === item.type);
      const obj = {
        basePrice: item.base_price,
        dateFrom: new Date(item.date_from),
        dateTo: new Date(item.date_to),
        destination: destination.name,
        isFavorite: item.is_favorite,
        offers: offersItems.offers.map((offer) => ({title: offer.title, price: offer.price, id: offer.id})),
        type: item.type,
        destinationPicture: `./img/icons/${offersItems.type}.png`,
      };
      render (new EventItemView({obj}), this.listComponent.getElement());
    });


    render(new TripEventsMessage(), this.listContainer);
  }
}
