import {createElement} from '../render.js';

function createEventAvailableOffersTemplate() {
  return '<div class="event__available-offers"></div>';
}

export default class EventAvailableOffers {
  getTemplate() {
    return createEventAvailableOffersTemplate();
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


