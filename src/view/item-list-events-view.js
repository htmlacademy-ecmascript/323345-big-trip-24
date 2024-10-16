import he from 'he';
import { humanizeEventDate, getDuration } from '../utils/time.js';
import AbstractView from '../framework/view/abstract-view.js';

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

function createItemListEventsTemplate(tripPoint, destination, offers) {

  const {
    type,
    date_from: dateFrom,
    date_to: dateTo,
    base_price: price,
    is_favorite: isFavorite
  } = tripPoint;

  const date = humanizeEventDate(dateFrom, 'date') ? humanizeEventDate(dateFrom, 'date') : '';
  const startTime = humanizeEventDate(dateFrom, 'time') ? humanizeEventDate(dateFrom, 'time') : '';
  const endTime = humanizeEventDate(dateTo, 'time') ? humanizeEventDate(dateTo, 'time') : '';
  const datetime = humanizeEventDate(dateFrom, 'datetime');
  const isFavoriteClass = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${datetime}">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="./img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination ? he.encode(destination.name) : ''}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${datetime}">${startTime}</time>
                    —
                    <time class="event__end-time" datetime="${dateTo}">${endTime}</time>
                  </p>
                  <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>

                ${createOffersTemplate(offers)}

                <button class="event__favorite-btn ${isFavoriteClass}" type="button">
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

export default class ItemListEventsView extends AbstractView {

  #tripPoint = null;
  #destinationsModel = null;
  #offersModel = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  #destination = null;
  #offers = null;

  constructor({
    tripPoint,
    destinationsModel,
    offersModel,
    onEditClick,
    onFavoriteClick,

  }) {
    super();
    this.#tripPoint = tripPoint;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.#destination = this.#destinationsModel.getDestinationById(tripPoint.destination);
    this.#offers = this.#offersModel.getSelectedOffersByType(tripPoint.type, tripPoint.offers);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createItemListEventsTemplate(this.#tripPoint, this.#destination, this.#offers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
