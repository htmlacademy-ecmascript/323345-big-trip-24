import {humanizeEventDate, getDuration} from '../utils/utils.js';
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


function createItemListEventsTemplate(tripEventData) {

  const {
    basePrice = tripEventData.basePrice
    , dateFrom = new Date(tripEventData.dateFrom)
    , dateTo = new Date(tripEventData.dateTo)
    , destination = tripEventData.destination
    , offers = tripEventData.offers
    , type = tripEventData.basePrice
    , isFavorite = tripEventData.isFavorite
  } = tripEventData;

  const date = humanizeEventDate(dateFrom, 'date') ? humanizeEventDate(dateFrom, 'date') : '';
  const startTime = humanizeEventDate(dateFrom, 'time') ? humanizeEventDate(dateFrom, 'time') : '';
  const endTime = humanizeEventDate(dateTo, 'time') ? humanizeEventDate(dateTo, 'time') : '';
  const isFavoriteClass = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFrom}">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="./img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
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

  #tripEventData = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor(tripEventData, {onEditClick, onFavoriteClick}) {
    super();
    this.#tripEventData = tripEventData;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {

    return createItemListEventsTemplate(this.#tripEventData);
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
