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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const DisabledSortType = [SortType.EVENT, SortType.OFFERS];

export {
  EVENT_TYPES,
  MESSAGE,
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  DisabledSortType
};
