import {createElement} from '../render.js';
import {humanizeEventDate, diffTime} from '../utils.js';

function createEventItemTemplate(event) {
  const {title, icon, price, eventStartTime, eventEndtTime, offers} = event;

  const date = humanizeEventDate(eventStartTime, 'date');
  const startTime = humanizeEventDate(eventStartTime);
  const endTime = humanizeEventDate(eventEndtTime);

  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${eventStartTime}">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="${icon}" alt="Event type icon">
                </div>
                <h3 class="event__title">${title}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <ime class="event__start-time" datetime="${eventStartTime}">${startTime}</time>
                    —
                    <time class="event__end-time" datetime="${eventEndtTime}">${endTime}</time>
                  </p>
                  <p class="event__duration">${diffTime(eventStartTime, eventEndtTime)}</p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">${offers.map((element) => element.title)}</span>
                    +€&nbsp;
                    <span class="event__offer-price">${offers.map((element) => element.price)}</span>
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
  constructor({event}) {
    this.event = event;
  }

  getTemplate() {
    return createEventItemTemplate(this.event);
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
