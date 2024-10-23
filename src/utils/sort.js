import dayjs from 'dayjs';

function sortEventsByDay (eventA, eventB) {

  if (dayjs.utc(eventA.date_from).diff(dayjs.utc(eventB.date_from)) < 0) {
    return -1;
  }

  if (dayjs.utc(eventA.date_from).diff(dayjs.utc(eventB.date_from)) > 0) {
    return 1;
  }

  return 0;
}

function sortEventsByTime (eventA, eventB) {
  if (dayjs.utc(eventA.date_from).diff(dayjs.utc(eventA.date_to)) <
      dayjs.utc(eventB.date_from).diff(dayjs.utc(eventB.date_to))) {
    return -1;
  }

  if (dayjs.utc(eventA.date_from).diff(dayjs.utc(eventA.date_to)) >
      dayjs.utc(eventB.date_from).diff(dayjs.utc(eventB.date_to))) {
    return 1;
  }

  return 0;
}

function sortEventsByPrice (eventA, eventB) {

  if (eventA.base_price > eventB.base_price) {
    return -1;
  }

  if (eventA.base_price < eventB.base_price) {
    return 1;
  }

  return 0;
}

export { sortEventsByDay, sortEventsByTime, sortEventsByPrice };
