import dayjs from 'dayjs';

/**
 * Returns a random element from the given array.
 * @param {Array} items - Array of any type of elements.
 * @returns {any} - Random element from the array.
 */
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const FORMATS = {
  'date': 'MMM D',
  'time': 'HH:mm',
  'datetime': 'YYYY-MM-DD',
  'eventTime': 'DD/MM/YY HH:mm',
};

/**
 * Returns a humanized representation of a given due date.
 * @param {string} dueDate - Due date in ISO format.
 * @returns {string} - Humanized representation of given due date, or empty string if due date is not given.
 */
function humanizeEventDate(eventDate, format) {
  return eventDate ? dayjs(eventDate).format(FORMATS[format]).toUpperCase() : '';
}

/**
 * Возвращает продолжительность между двумя датами в человеко-читаемом форме
 * @param {string} startTime - Start time in ISO format.
 * @param {string} endTime - End time in ISO format.
 * @returns {string} - Вернет разницу между датами в формате 1D 15H 39M
 */
function getDuration(startTime, endTime) {
  const differensInMinutes = dayjs(endTime).diff(startTime, 'm');

  let minutesLeft = differensInMinutes;

  let dayDuration = '';
  let hoursDuration = '';
  let minutesDuration = '';

  if (minutesLeft >= 1440) {
    const days = Math.floor(minutesLeft / 1440);
    dayDuration = `${days}D`;
    minutesLeft = minutesLeft - days * 1440;
  }

  if (minutesLeft >= 60) {
    const hours = Math.floor(minutesLeft / 60);
    hoursDuration = `${hours}H`;
    minutesLeft = minutesLeft - hours * 60;
  }

  minutesDuration = `${minutesLeft}M`;

  return (`${dayDuration} ${hoursDuration} ${minutesDuration}`);
}

function capitalizeFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}

export { getRandomArrayElement, humanizeEventDate, getDuration, capitalizeFirstLetter };
