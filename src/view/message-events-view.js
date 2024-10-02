import AbstractView from '../framework/view/abstract-view.js';

function createMessageEventsTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class MessageEventsView extends AbstractView {

  #message = null;

  constructor(message) {

    super();
    this.#message = message;
  }

  get template() {
    return createMessageEventsTemplate(this.#message);
  }
}


