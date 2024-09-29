import AbstractView from '../framework/view/abstract-view.js';
import { SortType, DisabledSortType } from '../const.js';

function createSortButtonTemplate(currentSortType) {

  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">

      ${Object.values(SortType).map((type) => (`
          <div class="trip-sort__item  trip-sort__item--${type}">
            <input
              id="sort-${type}"
              class="trip-sort__input
              visually-hidden"
              type="radio"
              name="trip-sort"
              value="sort-${type}"
              data-sort-type="${type}"
              ${DisabledSortType.includes(type) ? 'disabled' : ''}
              ${currentSortType === type ? 'checked' : ''}
            >
            <label class="trip-sort__btn" for="sort-${type}">${type}</label>
          </div>
        `)).join('')}

    </form>
  `);
}

export default class SortButtonView extends AbstractView {

  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({ onSortTypeChange, currentSortType }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createSortButtonTemplate(this.#currentSortType);
  }
}
