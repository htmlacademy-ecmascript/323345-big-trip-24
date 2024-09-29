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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const DisabledSortType = [SortType.EVENT, SortType.OFFERS];

export {EVENT_TYPES, MESSAGE, FilterType, SortType, DisabledSortType};
