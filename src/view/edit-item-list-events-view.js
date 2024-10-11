import flatpickr from 'flatpickr';

import {EVENT_TYPES} from '../const.js';
import { capitalizeFirstLetter } from '../utils/utils.js';
import { humanizeEventDate, getUtcTimeFromLocal } from '../utils/time.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';


function createOffersTemplate(tripEventData) {

  const {allOffersThisType = tripEventData.offers, selectedOffers = tripEventData.offers} = tripEventData;

  return (`
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">

        ${
    allOffersThisType.length > 0
      ? allOffersThisType.map((offer) =>
        (`
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="${offer.title}" ${selectedOffers.includes(offer) && 'checked'}>
            <label class="event__offer-label" for="${offer.id}">
              <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `)
      ).join('')
      : ''
    }

        </div>
      </section>
    `);
}


function createDestinationSectionTemplate(destinations) {

  const {description = destinations.description, pictures = destinations.pictures} = destinations;

  return (
    description || pictures.length > 0
      ? (`
          <section class="event__section  event__section--destination">

        ${
        description
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

function destinationsList(tripEventData) {
  const {allDestinations} = tripEventData;

  return (`
    <datalist id="destination-list-1">
     ${allDestinations.map((destination) => (`
      <option value="${destination.name}">${destination.name}</option>
    `)).join('')}
    </datalist>
  `);
}

function createEditItemListEventsTemplate(tripEventData) {

  const {

    basePrice
    , dateFrom = new Date(tripEventData.dateFrom)
    , dateTo = new Date(tripEventData.dateTo)
    , destination = tripEventData.destination[0]
    , type
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

              ${destinationsList(tripEventData)}

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


  #handleFormSubmit = null;
  #handleCloseFormClick = null;
  #handleDeleteClick = null;

  #flatpickrDateFrom = null;
  #flatpickrDateTo = null;
  constructor(
    {
      tripEventData
      , onFormSubmit
      , onCloseFormClick
      , onDeleteClick
    }
  ) {
    super();
    this.#tripEventData = tripEventData;


    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseFormClick = onCloseFormClick;
    this.#handleDeleteClick = onDeleteClick;

    /** Инициализирует стейт из начальных данных*/
    this._setState(EditItemListEventsView.parseTripEventDataToState({tripEventData: this.#tripEventData, allDestinations: this.#tripEventData.allDestinations}));

    this._restoreHandlers();
  }

  get template() {

    return createEditItemListEventsTemplate(this._state);
  }

  /**
   * Группирует все обработчики событий
   */
  _restoreHandlers() {

    this.element.querySelector('.event.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeFormClickHandler);

    this.element.querySelector('.event.event--edit')
      .addEventListener('change', this.#eventTypeChangeHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offersChangeHandler);

    this.element.querySelector('.event__input.event__input--price')
      .addEventListener('blur', (evt) => {
        evt.stopPropagation();
        this.#priceChangeHandler(evt);
      });

    this.element.querySelector('.event__input.event__input--destination')
      .addEventListener('input', this.#destinationInputHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#closeFormClickHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

    this.#setFlatpickrTripEvent();

  }

  /**
   * Сбрасывает стейт до начальных данных
   * @param {object} tripEventData начальные данные
   */
  reset(tripEventData) {
    this.updateElement(tripEventData);
  }

  /**
   * Удаляет элемент flatpickr
   */
  removeElement() {
    super.removeElement();

    if (this.#flatpickrDateFrom) {
      this.#flatpickrDateFrom.destroy();
      this.#flatpickrDateFrom = null;
    }

    if (this.#flatpickrDateTo) {
      this.#flatpickrDateTo.destroy();
      this.#flatpickrDateTo = null;
    }
  }

  /**
	 * Выбираем нужные предложения
	 * @param {evt} event событие на каждом предложении
	 * @returns выбранныое предложение
	 */
  #offersChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.type !== 'checkbox') {
      return;
    }

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

  /**
	 * Выбираем вид путешествия и согласно выбранному типу
	 *  отображаем возможные офферы
	 * @param {evt} event событие на изменении типа путешествия
	 * @returns Все виды офферов для подобного типа путешествия
	 */
  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.type !== 'radio') {
      return;
    }

    const allOffersThisType = this.#tripEventData.allOffers.find((offer) => offer.type === evt.target.value).offers;

    this.updateElement({
      type: evt.target.value
      , allOffersThisType
      , offers: []
    });
  };

  /**
	 * Сохранет ценну в стейт
	 * @param {evt} event событие на изменении цены
	 * @returns сохраняет ценну
	 */
  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    const EventPrice = Number(evt.target.value);

    if (!EventPrice) {
      return;
    }

    this.updateElement({
      basePrice: EventPrice,
    });
  };

  /**
	 * Сохраняет выбранные данные из стейта в реальные данные
	 * @param {evt} event событие на кнопке сохранения
	 */
  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this.#handleFormSubmit(EditItemListEventsView.parseStateToTripEventData(this._state));
  };

  /**
   * Закрывает и сбрасывает стейт до начального.
   * @param {evt} event событие на кнопке закрытия
   */
  #closeFormClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleCloseFormClick(this.#tripEventData);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick({...this._state});
  };

  /**
   * Ищет пункт назначения по названию сравнивая его с названиями
   *  пунктов назначения и закидывает выбранный в стейт
   * @param {evt} event - событие на поле ввода
   * @returns {string} - название пункта назначения
   */
  #destinationInputHandler = (evt) => {
    evt.preventDefault();

    const destination = this.#tripEventData.allDestinations.find((destinationItem) => (destinationItem.name === evt.target.value));

    if (this.#tripEventData.allDestinations.map((dest) => dest.name).includes(evt.target.value)) {

      this.updateElement({
        destination
      });
    }
  };

  /**
   *  Настройки календаря для flatpickr
   * enableTime: true - включает ввод времени
   * dateFormat: 'd/m/y H:i' - формат даты
   * defaultDate дата по умолчанию
   * maxDate, minDate - максимальная и минимальная дата
   * onClose - срабатывает при закрытии календаря
   */
  #setFlatpickrTripEvent() {

    this.#flatpickrDateFrom = flatpickr(this.element.querySelector('#event-start-time-1'), {
      enableTime: true
      , 'time_24hr': true
      , dateFormat: 'd/m/y H:i'
      , defaultDate: humanizeEventDate(this._state.dateFrom, 'eventTime')
      , maxDate: humanizeEventDate(this._state.dateTo, 'eventTime')
      , onClose: this.#dateChangeHandler
    });

    this.#flatpickrDateTo = flatpickr(this.element.querySelector('#event-end-time-1'), {
      enableTime: true
      , 'time_24hr': true
      , dateFormat: 'd/m/y H:i'
      , defaultDate: humanizeEventDate(this._state.dateTo, 'eventTime')
      , minDate: humanizeEventDate(this._state.dateFrom, 'eventTime')
      , onClose: this.#dateChangeHandler
    });
  }

  /**
   *
   * @param {*} selectedDates Массив выбранных дат. Если пользователь выбрал один день, то в массиве будет только одна дата. Если пользователь выбрал диапазон дат, то в массиве будут две даты: начало и конец диапазона.
   * @param {*} dateStr Строка, представляющая выбранную дату или диапазон дат в формате, заданном в настройках плагина.
   * @param {*} instance Объект, представляющий текущий экземпляр плагина flatpickr.
   */
  #dateChangeHandler = (selectedDates, dateStr, instance) => {
    // dateStr default value this library
    if (instance === this.#flatpickrDateFrom) {
      this.updateElement({
        dateFrom: getUtcTimeFromLocal(selectedDates)
      });
    } else if (instance === this.#flatpickrDateTo) {
      this.updateElement({
        dateTo: getUtcTimeFromLocal(selectedDates)
      });
    }

  };

  static parseTripEventDataToState({tripEventData}) {
    return {
      ...tripEventData
    };
  }

  static parseStateToTripEventData(state) {
    const tripEventData = { ...state };
    tripEventData.offers = tripEventData.offers.map((offer) => offer.id);
    return tripEventData;
  }
}
