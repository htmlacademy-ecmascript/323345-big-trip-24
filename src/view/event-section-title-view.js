import {createElement} from '../render.js';

const titleOptions = ['Offers', 'Destination'];


function createEventSectionTitleTemplate() {
  return `<h3 class="event__section-title  event__section-title--offers">${titleOptions[0]}</h3>`;
}

export default class EventSectionTitle {
  getTemplate() {
    return createEventSectionTitleTemplate();
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

