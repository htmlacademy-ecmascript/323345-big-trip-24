import { FilterType } from '../const.js';
import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: (pointsTrip) => pointsTrip,
  [FilterType.FUTURE]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_from) > Date.now()),
  [FilterType.PRESENT]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_from) <= Date.now() && new Date(pointTrip.date_to) >= Date.now()),
  [FilterType.PAST]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_to) < Date.now()),
};


function sortEventsByDay (eventA, eventB) {

  if (dayjs(eventA.date_from).diff(dayjs(eventB.date_from)) < 0) {
    return -1;
  }

  if (dayjs(eventA.date_from).diff(dayjs(eventB.date_from)) > 0) {
    return 1;
  }

  return 0;
}

function sortEventsByTime (eventA, eventB) {

  if (dayjs(eventA.date_from).diff(dayjs(eventA.date_to)) <
      dayjs(eventB.date_from).diff(dayjs(eventB.date_to))) {
    return -1;
  }

  if (dayjs(eventA.date_from).diff(dayjs(eventA.date_to)) >
      dayjs(eventB.date_from).diff(dayjs(eventB.date_to))) {
    return 1;
  }

  return 0;
}

function sortEventsByPrice (eventA, eventB) {

  if (eventA.base_price < eventB.base_price) {
    return -1;
  }

  if (eventA.base_price > eventB.base_price) {
    return 1;
  }

  return 0;
}

export { filter, sortEventsByDay, sortEventsByTime, sortEventsByPrice };
