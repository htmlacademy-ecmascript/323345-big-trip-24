import {createElement} from '../render.js';

function createEventEditFormTemplate() {
  return '<form class="event event--edit" action="#" method="post"></form>';
}

export default class EventEditForm {
  getTemplate() {
    return createEventEditFormTemplate();
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
