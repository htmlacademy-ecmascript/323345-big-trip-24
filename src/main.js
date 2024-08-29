import {RenderPosition, render} from './render.js';
import SectionTripInfo from './view/section-trip-info-view.js';
import TripFiltersForm from './view/trip-filters-form-view.js';
import TripFilters from './view/trip-filters-view.js';
import SortView from './view/sort-view.js';
import TripEventList from './view/trip-events-list-view.js';
import TripEventItem from './view/trip-events-item-view.js';
import Loading from './view/loading-view.js';
import TripEventsMessage from './view/trip-events-message-view.js';
import EventEditForm from './view/event-edit-form-view.js';
import EventHeader from './view/event-header-view.js';
import SectionEventDetails from './view/event-section-details-views.js';
import EventSectionTitle from './view/event-section-title-view.js';
import EventSectionOffers from './view/event-section-offers-view.js';
import EventAvailableOffers from './view/event-available-offers-view.js';
import EventOfferSelector from './view/event-offers-selector-view.js';
import EventSectionDestination from './view/event-section-detination-view.js';
import EventDestinationDescription from './view/event-destination-description-view.js';
import EventPhotosTape from './view/event-photos-tape-view.js';
import EventPhoto from './view/event-photo-view.js';
import EventPhotosContainer from './view/event-photos-container-view.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

render(new SectionTripInfo(), tripMain, RenderPosition.AFTERBEGIN); // Заголовок, даты, общая цена
render (new TripFiltersForm(), tripControlsFilters);

const tripFilters = document.querySelector('.trip-filters');

for (let i = 0; i < 4; i++) { // Создание кнопок для сортировки по времени
  render(new TripFilters(i), tripFilters);
}

render (new SortView(), tripEvents); // Создание кнопок для сортировки по дате, виду передвижения, цене...
render (new TripEventList(), tripEvents); // Создание списка элементов

const tripEventList = document.querySelector('.trip-events__list');

for (let i = 0; i < 9; i++) { // Создание элементов в списке
  render (new TripEventItem(), tripEventList);
}

render (new Loading(), tripEvents); // Сообщение о загрузке
render (new TripEventsMessage(), tripEvents);

const tripEventItem = document.querySelector('.trip-events__item');
render (new EventEditForm(), tripEventItem); // Создание формы(контейнера) для редактирования события

const eventEditForm = document.querySelector('.event--edit');
render (new EventHeader(), eventEditForm); // Создание header для редактирования события
render (new SectionEventDetails(), eventEditForm); // Создание Секции для редактирования деталей события

const eventSectionDetails = document.querySelector('.event__details');
render (new EventSectionOffers(), eventSectionDetails); //Создание секции offers

const eventSectionOffers = document.querySelector('.event__section--offers');
render (new EventSectionTitle(0), eventSectionOffers); // Создание заголовка для секции деталий события                 КАК ПЕРЕДАТЬ ПЕРЕМЕННЫЕ?
render (new EventAvailableOffers(), eventSectionOffers); // Создание контейнера для предложений

const eventAvailableOffers = document.querySelector('.event__available-offers');

for (let i = 0; i < 5; i++) { // Создание элементов в списке  предложений
  render (new EventOfferSelector(), eventAvailableOffers);
}

render (new EventSectionDestination(), eventSectionDetails); // создает блок destionation

const eventSectionDestination = document.querySelector('.event__section--destination');
render (new EventSectionTitle(1), eventSectionDestination); // Создание заголовка для секции описания
render (new EventDestinationDescription(), eventSectionDestination); // создает описание места
render (new EventPhotosContainer(), eventSectionDestination);

const EventPhotoContainer = document.querySelector('.event__photos-container');
render (new EventPhotosTape(), EventPhotoContainer); // создает описание места

const EventPhotoTape = document.querySelector('.event__photos-tape');
for (let i = 0; i < 5; i++) { // Создание элементов в списке  предложений
  render (new EventPhoto(), EventPhotoTape); // создает фотографии места
}

