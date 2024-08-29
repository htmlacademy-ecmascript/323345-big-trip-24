import {createElement} from '../render.js';

function createEventSectionDestinationTemplate() {
  return '<section class="event__section  event__section--destination"></section>';
}

export default class EventSectionDestination {
  getTemplate() {
    return createEventSectionDestinationTemplate();
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
