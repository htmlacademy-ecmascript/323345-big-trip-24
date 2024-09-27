import {render} from './framework/render.js';

import ListPresenter from './presenter/list-presenter.js';
import PointsTripModel from './model/points-trip-model.js';
import OffersTripsModel from './model/offers-trip-model.js';
import DestinationsTripModel from './model/destinations-trip-model.js';
import TripFiltersFormView from './view/trip-filters-form-view.js';
import { generateFilter } from './mock/filter.js';

const tripEventsElement = document.querySelector('.trip-events');
const tripFiltersElement = document.querySelector('.trip-controls__filters');

const pointsTripModel = new PointsTripModel();
const offersTripModel = new OffersTripsModel();
const destinationsTripModel = new DestinationsTripModel();


const listPresenter = new ListPresenter({
  listContainer: tripEventsElement,
  pointsTripModel,
  destinationsTripModel,
  offersTripModel,
});

const filters = generateFilter();

render(new TripFiltersFormView({filters}), tripFiltersElement);

listPresenter.init();


