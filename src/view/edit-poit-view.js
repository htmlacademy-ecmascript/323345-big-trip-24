import {createElement} from '../render.js';
import {EVENT_TYPES} from '../const.js';
import { humanizeEventDate, capitalizeFirstLetter } from '../utils.js';

function createOffersTemplate(tripEventData) {

  if (tripEventData.offers.length > 0) {

    const selectedOffers = tripEventData.offers;
    return (`
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">

          ${tripEventData.offers.map((offer) => (`
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="${offer.title}" ${selectedOffers.includes(offer) && 'checked'}>
              <label class="event__offer-label" for="${offer.id}">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>
          `)).join('')}

        </div>
      </section>
    `);
  }
  return '';
}


function createDestinationSectionTemplate(destinations) {
  const {description = destinations.description, pictures = destinations.pictures} = destinations;

  return (`
    <section class="event__section  event__section--destination">

    ${description
      ? (`<h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>`)
      : ''
    }

    ${pictures.length > 0
      ? (`<div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((picture) => (`
            <img class="event__photo" src="${picture.src}" alt="${picture.description}">
          `))}
        </div>
      </div>`)
      : ''
    }

    </section>
  `);
}

function createEventTypeList() {

  return (`
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

        ${EVENT_TYPES.map((type) => (`
          <div class="event__type-item">
            <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === 'flight' && 'checked'}>
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
          </div>
          `)).join('')}

      </fieldset>
    </div>
  `);
}

function destinationsList(destinations) {

  return (`
    <datalist id="destination-list-1">
     ${destinations.map((destination) => (`
      <option value="${destination.name}"></option>
    `)).join('')}
    </datalist>
  `);
}

function createEditPointTemplate(tripEventData, destinations, allDestinations) {
  const {basePrice = tripEventData.basePrice, dateFrom = tripEventData.dateFrom, dateTo = tripEventData.dateTo, destination = tripEventData.destination, type = tripEventData.type, destinationPicture = tripEventData.destinationPicture} = tripEventData;

  const timeStart = humanizeEventDate(dateFrom, 'eventTime');
  const timeEnd = humanizeEventDate(dateTo, 'eventTime');
  return (`
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="./img/icons/${destinationPicture}.png" alt="${destinationPicture} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          ${createEventTypeList()}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">

            ${destinationsList(allDestinations.allDestinations.data)}

        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStart}">
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEnd}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">

        ${createOffersTemplate(tripEventData)}

        ${createDestinationSectionTemplate(destinations)}

      </section>
    </form>
    `);
}

export default class EditPointView {
  constructor(tripEventData, destinations, allDestinations) {
    this.tripEventData = tripEventData;
    this.destinations = destinations;
    this.allDestinations = allDestinations;
  }

  getTemplate() {
    return createEditPointTemplate(this.tripEventData, this.destinations, this.allDestinations);
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


