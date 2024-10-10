import dayjs from 'dayjs';

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

export { sortEventsByDay, sortEventsByTime, sortEventsByPrice };
