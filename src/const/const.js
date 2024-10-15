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

const EMPTY_POINT = {
  'base_price': 0,
  'date_from': '',
  'date_to': '',
  'destination': '',
  'is_favorite': false,
  'offers': [],
  'type': 'flight'
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
  INIT: 'INIT',
};

const DisabledSortType = [SortType.EVENT, SortType.OFFERS];

export {
  EVENT_TYPES,
  EMPTY_POINT,
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  DisabledSortType
};
