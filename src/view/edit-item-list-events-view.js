import flatpickr from 'flatpickr';
import he from 'he';

import {EVENT_TYPES} from '../const/const.js';
import { capitalizeFirstLetter } from '../utils/utils.js';
import { humanizeEventDate, getUtcTimeFromLocal } from '../utils/time.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';


function createOffersTemplate(offers, allOffers, isDisabled) {

  return (`
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">

        ${
    allOffers.length > 0
      ? allOffers.map((offer) =>
        (`
          <div class="event__offer-selector">
            <input
              class="event__offer-checkbox  visually-hidden"
              id="${offer.id}"
              type="checkbox"
              name="${offer.title}"
              ${offers.includes(offer) && 'checked'}
              ${isDisabled ? 'disabled' : ''}
            >
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

function createDestinationSectionTemplate({ description, pictures }) {

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

function createEventTypeList({checkedType, isDisabled}) {

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
              ${isDisabled ? 'disabled' : ''}
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

function createEditItemListEventsTemplate(
  tripPoint,
  destinationNames,
  isNewPoint,
) {

  const {
    type,
    date_from: dateFrom,
    date_to: dateTo,
    base_price: price,
    destination,
    offers,
    allOffers,
    isDisabled,
    isSaving,
    isDeleting,
  } = tripPoint;

  const dateFromLocal = dateFrom !== '' ? getUtcTimeFromLocal(dateFrom) : '';
  const dateToLocal = dateTo !== '' ? getUtcTimeFromLocal(dateTo) : '';

  const startTime = humanizeEventDate(dateFromLocal, 'eventTime') ? humanizeEventDate(dateFromLocal, 'eventTime') : '';
  const endTime = humanizeEventDate(dateToLocal, 'eventTime') ? humanizeEventDate(dateToLocal, 'eventTime') : '';

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

            ${createEventTypeList({checkedType: type, isDisabled })}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text" name="event-destination"
              value="${destination ? he.encode(destination.name) : ''}"
              list="destination-list-1"
              ${isDisabled ? 'disabled' : ''}
            >

            <datalist id="destination-list-1">
              ${destinationNames.map((destinationName) => (`
                <option value="${destinationName}"></option>
              `)).join('')}
            </datalist>

          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button
            class="event__save-btn  btn  btn--blue"
            type="submit"
            ${isDisabled ? 'disabled' : ''}
          >

            ${isSaving ? 'Saving...' : 'Save'}

          </button>
          <button
            class="event__reset-btn"
            type="reset"
            ${isDisabled ? 'disabled' : ''}>

            ${isNewPoint ? 'Cancel' : (` ${isDeleting ? 'Deleting...' : 'Delete'} `)}

            </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">

          ${allOffers.length > 0 ? createOffersTemplate(offers, allOffers) : ''}

          ${destination ? createDestinationSectionTemplate(destination) : ''}

        </section>
      </form>
    </li>
    `);
}

export default class EditItemListEventsView extends AbstractStatefulView {

  #destinationsModel = null;
  #offersModel = null;
  #handleFormSubmit = null;
  #handleCloseFormClick = null;
  #handleDeleteClick = null;
  #isNewPoint = null;

  #destination = null;
  #offers = null;
  #allOffers = null;
  #destinationNames = null;

  #flatpickrDateFrom = null;
  #flatpickrDateTo = null;
  constructor(
    {
      tripPoint,
      destinationsModel,
      offersModel,
      onFormSubmit,
      onCloseFormClick,
      onDeleteClick,
      isNewPoint,
    }
  ) {
    super();
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseFormClick = onCloseFormClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#isNewPoint = isNewPoint;

    this.#destination = this.#destinationsModel.getDestinationById(tripPoint.destination);
    this.#offers = this.#offersModel.getSelectedOffersByType(tripPoint.type, tripPoint.offers);
    this.#allOffers = this.#offersModel.getOffersByType(tripPoint.type);
    this.#destinationNames = this.#destinationsModel.getDestinationNames();

    /** Инициализирует стейт из начальных данных*/
    this._setState(EditItemListEventsView.parseTripPointToState(tripPoint, this.#destination, this.#offers, this.#allOffers));

    this._restoreHandlers();
  }

  get template() {

    return createEditItemListEventsTemplate(this._state, this.#destinationNames, this.#isNewPoint);
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
      ?.addEventListener('change', this.#offersChangeHandler);

    this.element.querySelector('.event__input.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element.querySelector('.event__input.event__input--destination')
      .addEventListener('input', this.#destinationInputHandler);

    this.#setFlatpickrTripEvent();

    if (this.#isNewPoint) {
      this.element.querySelector('.event__reset-btn')
        .addEventListener('click', this.#closeFormClickHandler);
    } else {
      this.element.querySelector('.event__reset-btn')
        .addEventListener('click', this.#formDeleteClickHandler);
    }
  }

  /**
   * Сбрасывает стейт до начальных данных
   * @param {object} tripEventData начальные данные
   */
  reset(tripPoint) {
    const destination = this.#destinationsModel.getDestinationById(tripPoint.destination);
    const offers = this.#offersModel.getSelectedOffersByType(tripPoint.type, tripPoint.offers);
    const allOffers = this.#offersModel.getOffersByType(tripPoint.type);

    this.updateElement(
      EditItemListEventsView.parseTripPointToState(tripPoint, destination, offers, allOffers)
    );
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

    const selectedOffer = this._state.allOffers.find((offer) => offer.id === evt.target.id);
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

    const allOffers = this.#offersModel.getOffersByType(evt.target.value);

    this.updateElement({
      type: evt.target.value
      , allOffers
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

    this.updateElement({
      'base_price': /^(\d+)$/.test(evt.target.value) ? parseInt(evt.target.value, 10) : this._state.base_price,
    });
  };

  /**
   * Закрывает и сбрасывает стейт до начального.
   * @param {evt} event событие на кнопке закрытия
   */
  #closeFormClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleCloseFormClick();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditItemListEventsView.parseStateToTripPoint(this._state));
  };

  /**
   * Ищет пункт назначения по названию сравнивая его с названиями
   *  пунктов назначения и закидывает выбранный в стейт
   * @param {evt} event - событие на поле ввода
   * @returns {string} - название пункта назначения
   */
  #destinationInputHandler = (evt) => {
    evt.preventDefault();

    if (!this.#destinationsModel.getDestinationNames().includes(evt.target.value)) {
      return;
    }

    this._setState({
      destination: evt.target.value !== '' ? evt.target.value : this._state.destination,
    });

    if (this.#destinationNames.includes(evt.target.value)) {
      const destination = this.#destinationsModel.getDestinationByName(evt.target.value);
      this.updateElement({
        destination,
      });
    }
  };

  /**
	 * Сохраняет выбранные данные из стейта в реальные данные
	 * @param {evt} event событие на кнопке сохранения
	 */
  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this.#handleFormSubmit(EditItemListEventsView.parseStateToTripPoint(this._state));
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
      enableTime: true,
      'time_24hr': true,
      dateFormat: 'd/m/y H:i',
      defaultDate: humanizeEventDate(this._state.date_from, 'eventTime'),
      maxDate: humanizeEventDate(this._state.date_to, 'eventTime'),
      onClose: this.#dateChangeHandler,
    });

    this.#flatpickrDateTo = flatpickr(this.element.querySelector('#event-end-time-1'), {
      enableTime: true,
      'time_24hr': true,
      dateFormat: 'd/m/y H:i',
      defaultDate: humanizeEventDate(this._state.date_to, 'eventTime'),
      minDate: humanizeEventDate(this._state.date_from, 'eventTime'),
      onClose: this.#dateChangeHandler,
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
    if (!dateStr) {
      return;
    }
    const dateInUtc = getUtcTimeFromLocal(selectedDates);
    if (instance === this.#flatpickrDateFrom) {
      this.updateElement({
        'date_from': instance !== null ? new Date(dateInUtc).toISOString() : null
      });
    } else if (instance === this.#flatpickrDateTo) {
      this.updateElement({
        'date_to': instance ? new Date(dateInUtc).toISOString() : ''
      });
    }

  };

  static parseTripPointToState(tripPoint, destination, offers, allOffers) {
    return {
      ...tripPoint,
      destination,
      offers,
      allOffers,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToTripPoint(state) {
    const tripPoint = { ...state };
    tripPoint.offers = tripPoint.offers.map((offer) => offer.id);
    if (!tripPoint.destination){
      tripPoint.destination = null;
    } else {
      tripPoint.destination = tripPoint.destination.id;
    }

    delete tripPoint.allOffers;
    delete tripPoint.isDisabled;
    delete tripPoint.isSaving;
    delete tripPoint.isDeleting;

    return tripPoint;
  }
}
