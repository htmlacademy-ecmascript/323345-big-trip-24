import ListPresenter from './presenter/list-presenter.js';
import PointsTripModel from './model/points-trip-model.js';
import OffersTripsModel from './model/offers-trip-model.js';
import DestinationsTripModel from './model/destinations-trip-model.js';

const tripEventsElement = document.querySelector('.trip-events');

const pointsTripModel = new PointsTripModel();
const offersTripModel = new OffersTripsModel();
const destinationsTripModel = new DestinationsTripModel();


const listPresenter = new ListPresenter({
  listContainer: tripEventsElement,
  pointsTripModel,
  destinationsTripModel,
  offersTripModel,
});

listPresenter.init();


