import { render } from '../render.js';

import SortButtonView from '../view/sort-view.js';
import TripEventListView from '../view/trip-events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-poit-view.js';
import TripEventsMessage from '../view/trip-events-message-view.js';

export default class ListPresenter {

  listComponent = new TripEventListView();

  constructor({ listContainer, eventModel }) {
    this.listContainer = listContainer;
    this.eventModel = eventModel;
  }

  init() {
    this.listEvents = [...this.eventModel.getEvents()];

    render(new SortButtonView(), this.listContainer);
    render(new EventItemView(), this.listContainer);
    render(new AddNewPointView(), this.listContainer);
    render(new EditPointView(), this.listContainer);
    render(this.listComponent, this.listContainer);

    for (let i = 0; i < this.listEvents.length; i++) { // Создание элементов в списке
      render (new EventItemView({event: this.listEvents[i]}), this.listComponent.getElement());
    }

    render(new TripEventsMessage(), this.listContainer);
  }
}
