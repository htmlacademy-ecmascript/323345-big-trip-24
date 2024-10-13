import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

import { render } from './framework/render.js';

import ListPresenter from './presenter/list-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';

import PointsTripModel from './model/points-trip-model.js';
import OffersTripsModel from './model/offers-trip-model.js';
import DestinationsTripModel from './model/destinations-trip-model.js';
import FiltersModel from './model/filters-model.js';
import ButtonAddNewEventView from './view/button-add-new-event-view.js';

const tripEventsElement = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');

const pointsTripModel = new PointsTripModel();
const offersTripModel = new OffersTripsModel();
const destinationsTripModel = new DestinationsTripModel();
const filtersModel = new FiltersModel();


const listPresenter = new ListPresenter({
  listContainer: tripEventsElement,
  pointsTripModel,
  destinationsTripModel,
  offersTripModel,
  filtersModel,
  onNewTripPointClose: handleNewTripPointFormClose
});


const headerPresenter = new HeaderPresenter({
  headerContainer,
  pointsTripModel,
  offersTripModel,
  destinationsTripModel,
});

const buttonAddNewEventComponent = new ButtonAddNewEventView({
  onClick: handleButtonNewPointClick
});

function handleNewTripPointFormClose() {
  buttonAddNewEventComponent.element.disabled = false;
}

function handleButtonNewPointClick() {
  listPresenter.createTripPoint();
  buttonAddNewEventComponent.element.disabled = true;
}

render(buttonAddNewEventComponent, headerContainer);

headerPresenter.init();
listPresenter.init();


