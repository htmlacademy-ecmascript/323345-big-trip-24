import {createElement} from '../render.js';

const EVENTS = [
  {
    iconParth: 'img/icons/taxi.png',
    title: 'Taxi Amsterdam',
    eventDate: 'MAR 18',
    eventStartTime: '2019-03-18T10:30',
    eventStartTimeText: '10:30',
    eventEndTime: '2019-03-18T11:00',
    eventEndTimeText: '11:00',
    price: '20',
  },
  {
    iconParth: 'img/icons/flight.png',
    title: 'Flight Chamonix',
    eventDate: 'MAR 18',
    eventStartTime: '2019-03-18T12:25',
    eventStartTimeText: '12:25',
    eventEndTime: '2019-03-18T13:35',
    eventEndTimeText: '13:35',
    price: '160',
  },
  {
    iconParth: 'img/icons/drive.png',
    title: 'Drive Chamonix',
    eventDate: 'MAR 18',
    eventStartTime: '2019-03-18T14:30',
    eventStartTimeText: '14:30',
    eventEndTime: '2019-03-18T16:05',
    eventEndTimeText: '16:05',
    price: '160',
  },
  {
    iconParth: 'img/icons/check-in.png',
    title: 'Check-in Chamonix',
    eventDate: 'MAR 18',
    eventStartTime: '2019-03-18T16:20',
    eventStartTimeText: '16:20',
    eventEndTime: '2019-03-18T17:00',
    eventEndTimeText: '17:00',
    price: '600',
  },
  {
    iconParth: 'img/icons/sightseeing.png',
    title: 'Sightseeing Chamonix',
    eventDate: 'MAR 19',
    eventStartTime: '2019-03-19T11:20',
    eventStartTimeText: '11:20',
    eventEndTime: '2019-03-19T13:00',
    eventEndTimeText: '13:00',
    price: '50',
  },
  {
    iconParth: 'img/icons/drive.png',
    title: 'Drive Geneva',
    eventDate: 'MAR 19',
    eventStartTime: '2019-03-19T10:00',
    eventStartTimeText: '10:00',
    eventEndTime: '2019-03-19T11:00',
    eventEndTimeText: '11:00',
    price: '20',
  },
  {
    iconParth: 'img/icons/flight.png',
    title: 'Flight Geneva',
    eventDate: 'MAR 19',
    eventStartTime: '2019-03-19T18:00',
    eventStartTimeText: '18:00',
    eventEndTime: '2019-03-19T19:00',
    eventEndTimeText: '19:00',
    price: '20',
  },
  {
    iconParth: 'img/icons/taxi.png',
    title: 'Drive Geneva',
    eventDate: 'MAR 20',
    eventStartTime: '2019-03-20T08:25',
    eventStartTimeText: '08:25',
    eventEndTime: '2019-03-20T09:25',
    eventEndTimeText: '09:25',
    price: '20',
  },
  {
    iconParth: 'img/icons/sightseeing.png',
    title: 'Sightseeing Geneva',
    eventDate: 'MAR 20',
    eventStartTime: '2019-03-20T11:15',
    eventStartTimeText: '11:15',
    eventEndTime: '2019-03-20T12:15',
    eventEndTimeText: '12:15',
    price: '180',
  },

];
const OFFERS = {
  title: ['Order Uber', 'Add luggage', 'Switch to comfort', 'Rent a car', 'Add breakfast', 'Book tickets', 'Lunch in city', ],
  price: ['20', '30', '40', '50', '80', '100', '200'],
};

let i = -1;

function createTripEventItemTemplate() {
  i++;
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${EVENTS[i].eventStartTime}">${EVENTS[i].eventDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="${EVENTS[i].iconParth}" alt="Event type icon">
                </div>
                <h3 class="event__title">${EVENTS[i].title}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${EVENTS[i].eventStartTime}">${EVENTS[i].eventStartTimeText}</time>
                    —
                    <time class="event__end-time" datetime="${EVENTS[i].eventEndTime}">${EVENTS[i].eventEndTimeText}</time>
                  </p>
                  <p class="event__duration">${((Date.parse(EVENTS[i].eventEndTime) - Date.parse(EVENTS[i].eventStartTime)) / 1000) / 60}M</p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${EVENTS[i].price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">${OFFERS.title[i]}</span>
                    +€&nbsp;
                    <span class="event__offer-price">${OFFERS.price[i]}</span>
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
            </li>`;
}

export default class TripEventItem {
  getTemplate() {
    return createTripEventItemTemplate();
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
