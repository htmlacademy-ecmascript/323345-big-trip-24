import { FilterType } from '../const.js';
import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: (pointsTrip) => pointsTrip,
  [FilterType.FUTURE]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_from) > Date.now()),
  [FilterType.PRESENT]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_from) <= Date.now() && new Date(pointTrip.date_to) >= Date.now()),
  [FilterType.PAST]: (pointsTrip) => pointsTrip.filter((pointTrip) => new Date(pointTrip.date_to) < Date.now()),
};


function sortEventsByDay (eventA, eventB) {

  if (dayjs.utc(eventA.dateFrom).diff(dayjs.utc(eventB.dateFrom)) < 0) {
    return -1;
  }

  if (dayjs.utc(eventA.dateFrom).diff(dayjs.utc(eventB.dateFrom)) > 0) {
    return 1;
  }

  return 0;
}

function sortEventsByTime (eventA, eventB) {

  if (dayjs.utc(eventA.dateFrom).diff(dayjs.utc(eventA.dateTo)) <
      dayjs.utc(eventB.dateFrom).diff(dayjs.utc(eventB.dateTo))) {
    return -1;
  }

  if (dayjs.utc(eventA.dateFrom).diff(dayjs.utc(eventA.dateTo)) >
      dayjs.utc(eventB.dateFrom).diff(dayjs.utc(eventB.dateTo))) {
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
