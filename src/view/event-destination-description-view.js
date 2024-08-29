import {createElement} from '../render.js';

function createEventDestinationDescriptionTemplate() {
  return '<p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>';
}

export default class EventDestinationDescription {
  getTemplate() {
    return createEventDestinationDescriptionTemplate();
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


