import { FilterType } from '../const.js';
import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: (pointsTrip) => pointsTrip,
  [FilterType.FUTURE]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_from) > Date.now()),
  [FilterType.PRESENT]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_from) <= Date.now() && new Date(pointTrip.date_to) >= Date.now()),
  [FilterType.PAST]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_to) < Date.now()),
};


function sortEventsByDay (eventA, eventB) {

  if (dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom)) < 0) {
    return -1;
  }

  if (dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom)) > 0) {
    return 1;
  }

  return 0;
}

function sortEventsByTime (eventA, eventB) {

  if (dayjs(eventA.dateFrom).diff(dayjs(eventA.dateTo)) <
      dayjs(eventB.dateFrom).diff(dayjs(eventB.dateTo))) {
    return -1;
  }

  if (dayjs(eventA.dateFrom).diff(dayjs(eventA.dateTo)) >
      dayjs(eventB.dateFrom).diff(dayjs(eventB.dateTo))) {
    return 1;
  }

  return 0;
}

function sortEventsByPrice (eventA, eventB) {

  if (eventA.basePrice > eventB.basePrice) {
    return -1;
  }

  if (eventA.basePrice < eventB.basePrice) {
    return 1;
  }

  return 0;
}

export { filter, sortEventsByDay, sortEventsByTime, sortEventsByPrice };
