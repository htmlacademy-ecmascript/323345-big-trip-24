import {createElement} from '../render.js';

function createEventPhotosContainerTemplate() {
  return '<div class="event__photos-container"></div>';
}

export default class EventPhotosContainer {
  getTemplate() {
    return createEventPhotosContainerTemplate();
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

