import {createElement} from '../render.js';

function createSectionEventDetailsTemplate() {
  return '<section class="event__details"></section>';
}

export default class SectionEventDetails {
  getTemplate() {
    return createSectionEventDetailsTemplate();
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
