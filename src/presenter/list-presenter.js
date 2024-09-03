import { render } from '../render.js';

import SortButtonView from '../view/sort-view.js';
import TripEventListView from '../view/trip-events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-poit-view.js';
import TripEventsMessage from '../view/trip-events-message-view.js';

import { destionations } from '../mock/destionations.js';
import { offers } from '../mock/offers.js';

export default class ListPresenter {
  listComponent = new TripEventListView();

  constructor({ listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
    this.destionations = destionations;
    this.offers = offers;
  }

  init() {
    this.listPoints = [...this.pointsModel];

    render(new SortButtonView(), this.listContainer);
    render(new AddNewPointView(), this.listContainer);
    render(new EditPointView(), this.listContainer);
    render(this.listComponent, this.listContainer);

    for (let i = 0; i < this.listPoints.length; i++) { // Создание элементов в списке
      this.pointsModel.forEach((item) => { // Создание элементов в списке
        const destination = destionations.find((dest) => dest.id === item.destination);
        const offersItems = offers.find((offer) => offer.type === item.type);
        const obj = {
          basePrice: item.basePrice,
          dateFrom: item.dateFrom,
          dateTo: item.dateTo,
          destination: destination.name,
          isFavorite: item.isFavorite,
          offers: offersItems.offers.map((offer) => ({title: offer.title, price: offer.price, id: offer.id})),
          type: item.type,
          destinationPicture: `./img/icons/${offersItems.type}.png`,
        };
        render (new EventItemView({obj}), this.listComponent.getElement());
      });
    }

    render(new TripEventsMessage(), this.listContainer);
  }
}
