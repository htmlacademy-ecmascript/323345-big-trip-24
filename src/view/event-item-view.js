import {createElement} from '../render.js';
import {humanizeEventDate, diffTime} from '../utils.js';

function createOffersTemplate(offers) {
  return `${offers.map((offer) =>`${offer.title} +€&nbsp; ${offer.price}</br>`).join('')}`;
}


function createEventItemTemplate(obj) {
  const {basePrice = obj.basePrice, dateFrom = obj.dateFrom, dateTo = obj.dateTo, offers = obj.offers, type = obj.basePrice, destinationPicture = obj.destinationPicture} = obj;

  const date = humanizeEventDate(dateFrom, 'date');
  const startTime = humanizeEventDate(dateFrom);
  const endTime = humanizeEventDate(dateTo);

  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFrom}">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="${destinationPicture}" alt="Event type icon">
                </div>
                <h3 class="event__title">${type}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <ime class="event__start-time" datetime="${dateFrom}">${startTime}</time>
                    —
                    <time class="event__end-time" datetime="${dateTo}">${endTime}</time>
                  </p>
                  <p class="event__duration">${diffTime(dateFrom, dateTo)}</p>
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
  constructor({obj}) {
    this.obj = obj;
  }

  getTemplate() {
    return createEventItemTemplate(this.obj);
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
