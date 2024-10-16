import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

import { render } from './framework/render.js';

import ListPresenter from './presenter/list-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';

import PointsTripModel from './model/points-trip-model.js';
import OffersTripsModel from './model/offers-trip-model.js';
import DestinationsTripModel from './model/destinations-trip-model.js';
import FiltersModel from './model/filters-model.js';

import PointsApiService from './api-service/points-api-service.js';
import OffersApiService from './api-service/offers-api-service.js';
import DestinationsApiService from './api-service/destinations-api-service.js';
import { AUTHORIZATION, END_POINT } from './const/api-const.js';

import ButtonAddNewEventView from './view/button-add-new-event-view.js';


const tripEventsElement = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');


const pointsTripModel = new PointsTripModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});
const offersTripModel = new OffersTripsModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION),
});
const destinationsTripModel = new DestinationsTripModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION),
});

const filtersModel = new FiltersModel();

const listPresenter = new ListPresenter({
  listContainer: tripEventsElement,
  pointsTripModel,
  destinationsTripModel,
  offersTripModel,
  filtersModel,
  onNewTripPointClose: handleNewTripPointFormClose
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


Promise.all(
  [
    offersTripModel.init(),
    destinationsTripModel.init(),
    pointsTripModel.init().finally(() => {
      buttonAddNewEventComponent.element.disabled = false;
    }),
  ]
) .then (() => {
  const filtersPresenter = new FiltersPresenter({
    filterContainer: tripFiltersElement,
    filtersModel,
    pointsTripModel,
  });

  filtersPresenter.init();

  const headerPresenter = new HeaderPresenter({
    headerContainer,
    pointsTripModel,
    offersTripModel,
    destinationsTripModel,
    filtersModel,
  });

  headerPresenter.init().finally(() => {
    render(buttonAddNewEventComponent, headerContainer);

  });
})
  .catch((err) => {
    buttonAddNewEventComponent.element.disabled = true;
    throw new Error(err);
  });


listPresenter.init();
