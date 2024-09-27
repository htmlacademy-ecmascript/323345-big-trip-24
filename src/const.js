const EVENT_TYPES = [
  'taxi'
  , 'bus'
  , 'train'
  , 'ship'
  , 'drive'
  , 'flight'
  , 'check-in'
  , 'sightseeing'
  , 'restaurant'];

const MESSAGE = {
  EMPTY: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILED_LOAD: 'Failed to load latest route information',
};

const FiltersPoints = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortPoints = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export {EVENT_TYPES, MESSAGE};
