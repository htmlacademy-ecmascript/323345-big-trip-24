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
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  DisabledSortType
};
