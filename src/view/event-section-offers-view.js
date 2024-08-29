import {createElement} from '../render.js';

function createEventSectionOffersTemplate() {
  return '<section class="event__section  event__section--offers"></section>';
}

export default class EventSectionOffers {
  getTemplate() {
    return createEventSectionOffersTemplate();
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


