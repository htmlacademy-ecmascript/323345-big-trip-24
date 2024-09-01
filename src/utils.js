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

/**
 * Returns a humanized representation of a given due date.
 * @param {string} dueDate - Due date in ISO format.
 * @returns {string} - Humanized representation of given due date, or empty string if due date is not given.
 */
function humanizeEventDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT).toUpperCase() : '';
}


export {getRandomArrayElement, humanizeEventDueDate};
