import { FilterType } from '../const/const.js';

const filter = {
  [FilterType.EVERYTHING]: (pointsTrip) => pointsTrip,
  [FilterType.FUTURE]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_from) > Date.now()),
  [FilterType.PRESENT]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_from) <= Date.now() && new Date(pointTrip.date_to) >= Date.now()),
  [FilterType.PAST]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_to) < Date.now()),
};

const NoPointTextByFilter = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
};

export { filter, NoPointTextByFilter };
