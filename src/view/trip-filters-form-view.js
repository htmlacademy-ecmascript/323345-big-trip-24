import {createElement} from '../render.js';

function createTripFiltersFormTemplate() {
  return '<form class="trip-filters" action="#" method="get"></form>';
}

export default class TripFiltersForm {
  getTemplate() {
    return createTripFiltersFormTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}


