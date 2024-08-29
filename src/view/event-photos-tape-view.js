import {createElement} from '../render.js';

function createEventPhotosTapeTemplate() {
  return '<div class="event__photos-tape"></div>';
}

export default class EventPhotosTape {
  getTemplate() {
    return createEventPhotosTapeTemplate();
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


