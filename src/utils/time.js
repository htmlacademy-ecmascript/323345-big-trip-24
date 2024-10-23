import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const FORMATS = {
  'headerDate': 'DD MMM',
  'date': 'MMM D',
  'time': 'HH:mm',
  'datetime': 'YYYY-MM-DD',
  'eventTime': 'DD/MM/YY HH:mm',
};

const DAY_HAS_MINUTES = 1440;
const HOUR_HAS_MINUTES = 60;

/**
 * Returns a humanized representation of a given due date.
 * @param {string} dueDate - Due date in ISO format.
 * @returns {string} - Humanized representation of given due date, or empty string if due date is not given.
 */
function humanizeEventDate(eventDate, format) {
  return eventDate ? dayjs(eventDate).utc().format(FORMATS[format]) : '';
}

/**
 * Returns UTC time from local date.
 * @param {string} localDate - Local date in ISO format.
 * @returns {string} - UTC time in ISO format.
 */
function getUtcTimeFromLocal(localDate) {
  const date = new Date(localDate);
  const timezoneOffset = new Date().getTimezoneOffset() / HOUR_HAS_MINUTES;
  const changedDate = date.setHours(date.getHours() - timezoneOffset);
  return new Date(changedDate).toUTCString();
}

/**
 * Возвращает продолжительность между двумя датами в человеко-читаемом форме
 * @param {string} startTime - Start time in ISO format.
 * @param {string} endTime - End time in ISO format.
 * @returns {string} - Вернет разницу между датами в формате 1D 00H 39M
 */
function getDuration(startTime, endTime) {
  const differensInMinutes = dayjs.utc(endTime).diff(dayjs.utc(startTime), 'm');

  let minutesLeft = differensInMinutes;

  let dayDuration = '';
  let hoursDuration = '';
  let minutesDuration = '';

  if (minutesLeft >= DAY_HAS_MINUTES) {
    const days = Math.floor(minutesLeft / DAY_HAS_MINUTES);
    dayDuration = days < 10 ? `0${days}D` : `${days}D`;
    minutesLeft = minutesLeft - days * DAY_HAS_MINUTES;
  }

  if (minutesLeft >= HOUR_HAS_MINUTES) {
    const hours = Math.floor(minutesLeft / HOUR_HAS_MINUTES);
    hoursDuration = hours < 10 ? `0${hours}H` : `${hours}H`;
    minutesLeft = minutesLeft - hours * HOUR_HAS_MINUTES;
  }

  minutesDuration = minutesLeft < 10 ? `0${minutesLeft}M` : `${minutesLeft}M`;

  dayDuration = !dayDuration ? '00D' : dayDuration;
  hoursDuration = !hoursDuration ? '00H' : hoursDuration;
  minutesDuration = !minutesDuration ? '00M' : minutesDuration;


  return `${dayDuration} ${hoursDuration} ${minutesDuration}`;
}

export { humanizeEventDate, getDuration, getUtcTimeFromLocal };
