import {RenderPosition, render} from './render.js';
import ListPresenter from './presenter/list-presenter.js';
import SectionTripInfoView from './view/section-trip-info-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripFiltersFormView from './view/trip-filters-form-view.js';
import PointsTripModel from './model/points-trip-model.js';
import OffersTripsModel from './model/offers-trip-model.js';
import DestinationsTripModel from './model/destinations-trip-model.js';


const tripMain = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const pointsTripModel = new PointsTripModel();
pointsTripModel.init();
const offersTripModel = new OffersTripsModel();
offersTripModel.init();
const destinationsTripModel = new DestinationsTripModel();
destinationsTripModel.init();

render(new SectionTripInfoView(), tripMain, RenderPosition.AFTERBEGIN); // Заголовок, даты, общая цена
render(new NewEventButtonView(), tripMain); // Заголовок, кнопка добавить событие
render (new TripFiltersFormView(), tripControlsFilters); // Кнопки сортировки

const listPresenter = new ListPresenter({
  listContainer: tripEventsElement,
  pointsTripModel,
  destinationsTripModel,
  offersTripModel,
});

listPresenter.init();


