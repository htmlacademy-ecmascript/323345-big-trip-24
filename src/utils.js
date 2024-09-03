import dayjs from 'dayjs';

/**
 * Returns a random element from the given array.
 * @param {Array} items - Array of any type of elements.
 * @returns {any} - Random element from the array.
 */
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';

/**
 * Returns a humanized representation of a given due date.
 * @param {string} dueDate - Due date in ISO format.
 * @returns {string} - Humanized representation of given due date, or empty string if due date is not given.
 */
function humanizeEventDate(eventDate, format) {
  if (format === 'date') {
    return eventDate ? dayjs(eventDate).format(DATE_FORMAT).toUpperCase() : '';
  }
  return eventDate ? dayjs(eventDate).format(TIME_FORMAT).toUpperCase() : '';
}

function diffTime(startTime, endTime) {
  let time = dayjs(endTime).diff(startTime, 'm');
  if (time > 1440) {
    time = `${Math.floor(time / 1440)}D ${Math.floor(time / 60)}H ${time % 60}M`;
  }
  if (time > 60) {
    time = `${Math.floor(time / 60)}H ${time % 60}M`;
  }
  return time;
}

export {getRandomArrayElement, humanizeEventDate, diffTime};
