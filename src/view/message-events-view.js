import AbstractView from '../framework/view/abstract-view.js';
import { NoPointTextByFilter } from '../utils/filter.js';

function createMessageEventsTemplate(filterType) {
  const message = NoPointTextByFilter[filterType];
  return (`
    <p class="trip-events__msg">${message}</p>
    `);
}

export default class MessageEventsView extends AbstractView {

  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createMessageEventsTemplate(this.#filterType);
  }
}


