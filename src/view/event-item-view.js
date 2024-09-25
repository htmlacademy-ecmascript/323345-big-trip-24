import {createElement} from '../render.js';
import {humanizeEventDate, getDuration} from '../utils.js';

function createOffersTemplate(offers) {
  return offers ?
    (`
    <ul class="event__selected-offers">
    ${offers.map(({title, price}) => (`
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
    `)).join('')}
    </ul>
  `) :
    '';
}


function createEventItemTemplate(tripEventData) {
  const {basePrice = tripEventData.basePrice, dateFrom = tripEventData.dateFrom, dateTo = tripEventData.dateTo, destination = tripEventData.destination, offers = tripEventData.offers, type = tripEventData.basePrice, destinationPicture = tripEventData.destinationPicture} = tripEventData;

  const date = humanizeEventDate(dateFrom, 'date');
  const startTime = humanizeEventDate(dateFrom, 'time');
  const endTime = humanizeEventDate(dateTo, 'time');

  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFrom}">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="./img/icons/${destinationPicture}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <ime class="event__start-time" datetime="${dateFrom}">${startTime}</time>
                    —
                    <time class="event__end-time" datetime="${dateTo}">${endTime}</time>
                  </p>
                  <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">${createOffersTemplate(offers)}</span>
                  </li>
                </ul>
                <button class="event__favorite-btn event__favorite-btn--active" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`
  );
}

export default class EventItemView {
  constructor({tripEventData}) {
    this.tripEventData = tripEventData;
  }

  getTemplate() {
    return createEventItemTemplate(this.tripEventData);
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
