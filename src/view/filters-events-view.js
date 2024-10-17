import AbstractView from '../framework/view/abstract-view.js';

function createFiltersEventsTemplate(filters, currentFilterType) {

  return (`
    <div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">

        ${filters.map((filter) => (`
            <div class="trip-filters__filter">
              <input
                id="filter-${filter.type}" class="trip-filters__filter-input visually-hidden"
                type="radio"
                name="trip-filter"
                value="${filter.type}"
                ${filter.type === currentFilterType && 'checked'}
                 ${filter.count === 0 ? 'disabled' : ''}
              >
              <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
            </div>
          `)).join('')}

          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>
  `);
}

export default class FiltersEventsView extends AbstractView {

  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#handleFilterChange);
  }

  get template() {
    return createFiltersEventsTemplate(this.#filters, this.#currentFilterType);
  }

  #handleFilterChange = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}


