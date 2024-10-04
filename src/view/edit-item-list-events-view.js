import {EVENT_TYPES} from '../const.js';
import { humanizeEventDate, capitalizeFirstLetter } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createOffersTemplate(tripEventData) {

  if (tripEventData.offers.length > 0) {

    const selectedOffers = tripEventData.offers;
    return (`
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">

          ${tripEventData.allOffersThisType.map((offer) => (`
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

  return (
    description || pictures.length > 0
      ? (`
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
        `)
      : ''
  );
}

function createEventTypeList({checkedType}) {

  return (`
    <div class="event__type-list">
    <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>

    ${EVENT_TYPES.map((type) => (`
      <div class="event__type-item">
            <input
              id="event-type-${type}-1"
              class="event__type-input  visually-hidden"
              type="radio" name="event-type"
              value="${type}"
              ${type === checkedType ? 'checked' : ''}
            >
            <label
              class="event__type-label  event__type-label--${type}"
              for="event-type-${type}-1">

              ${capitalizeFirstLetter(type)}
            </label>
          </div>
          `)).join('')}

      </fieldset>
    </div>
  `);
}

function destinationsList(allDestinations) {

  return (`
    <datalist id="destination-list-1">
     ${allDestinations.map((destination) => (`
      <option value="${destination.name}"></option>
    `)).join('')}
    </datalist>
  `);
}

function createEditItemListEventsTemplate(tripEventData, allDestinations) {

  const {
    basePrice = tripEventData.basePrice
    , dateFrom = new Date(tripEventData.dateFrom)
    , dateTo = new Date(tripEventData.dateTo)
    , destination = tripEventData.destination
    , type = tripEventData.type
  } = tripEventData;
  const timeStart = humanizeEventDate(dateFrom, 'eventTime') ? humanizeEventDate(dateFrom, 'eventTime') : '';
  const timeEnd = humanizeEventDate(dateTo, 'eventTime') ? humanizeEventDate(dateTo, 'eventTime') : '';

  return (`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="./img/icons/${type}.png" alt="${type} icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            ${createEventTypeList({checkedType: type})}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">

              ${destinationsList(allDestinations)}

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

          ${createDestinationSectionTemplate(destination)}

        </section>
      </form>
    </li>
    `);
}

export default class EditItemListEventsView extends AbstractStatefulView {

  #tripEventData = null;
  #allDestinations = null;
  #allOffers = null;

  #handleFormSubmit = null;
  #handleCloseFormClick = null;

  constructor(
    {
      tripEventData
      , allDestinations
      , onFormSubmit
      , onCloseFormClick
    }
  ) {
    super();
    this.#tripEventData = tripEventData;
    this.#allDestinations = allDestinations.destinations;
    this.#allOffers = this.#tripEventData.allOffers;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseFormClick = onCloseFormClick;

    this._setState(EditItemListEventsView.parseTripEventDataToState({tripEventData: this.#tripEventData}));

    this._restoreHandlers();
  }

  get template() {

    return createEditItemListEventsTemplate(this._state, this.#allDestinations);
  }

  _restoreHandlers() {

    this.element.querySelector('.event.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeFormClickHandler);

    this.element.querySelector('.event.event--edit')
      .addEventListener('change', this.#eventTypeChangeHandler);

    // this.element.querySelector('.event__available-offers')
    //   .addEventListener('change', this.#offersChangeHandler);
  }

  #offersChangeHandler = (evt) => {

    if (evt.target.type !== 'checkbox') {
      return;
    }
    evt.preventDefault();

    let offers = this._state.offers;

    const selectedOffer = this._state.allOffersThisType.find((offer) => offer.id === evt.target.id);
    const isActive = this._state.offers.some((offer) => offer.id === evt.target.id);

    if (isActive) {
      offers = offers.filter((offer) => offer.id !== selectedOffer.id);
    } else {
      offers.push(selectedOffer);
    }

    this.updateElement({
      offers,
    });


  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.type !== 'radio') {
      return;
    }

    const allOffersThisType = this._state.allOffers.find((offer) => offer.type === evt.target.value).offers;

    this.updateElement({
      type: evt.target.value
      // , allOffers: this.#tripEventData.allOffers
      , allOffersThisType
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #closeFormClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseFormClick();
  };

  static parseTripEventDataToState({tripEventData}) {
    return {
      ...tripEventData
    };
  }

  static parseStateToTripEventData(state) {
    return {
      ...state
    };
  }
}
