import {createElement} from '../render.js';

const filterName = ['everything', 'future', 'present', 'past'];
const checkedName = ['checked', '', '', ''];
const disabledName = ['', 'disabled', '', '',];

let i = -1;

function createTripFiltersTemplate() {
  i++;
  return (
    `<div class="trip-filters__filter">
            <input id="filter-${filterName[i]}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${filterName[i]} ${checkedName[i]} ${disabledName[i]} >
            <label class="trip-filters__filter-label" for="filter-${filterName[i]}">${filterName[i].charAt(0).toUpperCase() + filterName[i].slice(1)}</label>
          </div>`
  );
}

export default class TripFilters {

  getTemplate() {
    return createTripFiltersTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

