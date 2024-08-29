import { render } from '../render.js';

import SortButtonView from '../view/sort-view.js';
import TripEventListView from '../view/trip-events-list-view.js';
import TripEventItemView from '../view/trip-events-item-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-poit-view.js';
import TripEventsMessage from '../view/trip-events-message-view.js';

export default class ListPresenter {

  listComponent = new TripEventListView();

  constructor({ listContainer }) {
    this.listContainer = listContainer;
  }

  init() {
    render(new SortButtonView(), this.listContainer);
    render(new TripEventItemView(), this.listContainer);
    render(new AddNewPointView(), this.listContainer);
    render(new EditPointView(), this.listContainer);
    render(this.listComponent, this.listContainer);

    for (let i = 0; i < 3; i++) { // Создание элементов в списке
      render (new TripEventItemView(), this.listComponent.getElement());
    }

    render(new TripEventsMessage(), this.listContainer);
  }
}
