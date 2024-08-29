import {createElement} from '../render.js';

let i = -1;

const OFFERS = [
  {
    title: 'Add luggage',
    price: 30,
  },
  {
    title: 'Switch to comfort class',
    price: 100,
  },
  {
    title: 'Add meal',
    price: 15,
  },
  {
    title: 'Choose seats',
    price: 5,
  },
  {
    title: 'Travel by train',
    price: 40,
  },
];

function createEventOfferSelectorTemplate() {
  i++;
  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${i}" type="checkbox" name="event-offer-luggage" checked="">
            <label class="event__offer-label" for="event-offer-luggage-${i}">
              <span class="event__offer-title">${OFFERS[i].title}</span>
                          +€&nbsp;
              <span class="event__offer-price">${OFFERS[i].price}</span>
            </label>
          </div>`;
}

export default class EventOfferSelector {
  getTemplate() {
    return createEventOfferSelectorTemplate();
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

