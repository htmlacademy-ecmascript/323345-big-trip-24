import AbstractView from '../framework/view/abstract-view.js';

function createMessageLoadingTemplate() {
  return (`
    <p class="trip-events__msg">Loading...</p>
  `);
}

export default class MessageLoadingView extends AbstractView {
  get template() {
    return createMessageLoadingTemplate();
  }
}
