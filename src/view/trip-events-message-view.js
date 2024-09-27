import AbstractView from '../framework/view/abstract-view.js';

function createTripEventsMessageTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class TripEventsMessage extends AbstractView {
  get template() {
    return createTripEventsMessageTemplate();
  }
}


