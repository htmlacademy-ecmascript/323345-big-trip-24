import { render, replace, remove } from '../framework/render.js';
import FiltersEventsView from '../view/filters-events-view.js';
import {FilterType, UpdateType} from '../const/const.js';
import { filter } from '../utils/filter.js';


export default class FiltersPresenter {
  #filterContainer = null;
  #filtersModel = null;
  #pointsTrip = null;

  #filterComponent = null;

  constructor({filterContainer, filtersModel, pointsTripModel}) {
    this.#filterContainer = filterContainer;
    this.#filtersModel = filtersModel;
    this.#pointsTrip = pointsTripModel;

    this.#filtersModel.addObserver(this.#handleModelChange);
    this.#pointsTrip.addObserver(this.#handleModelChange);
  }

  get filters() {
    const points = [...this.#pointsTrip.points];

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'EVERYTHING',
        count: filter[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'FUTURE',
        count: filter[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PAST,
        name: 'PAST',
        count: filter[FilterType.PAST](points).length,
      },
      {
        type: FilterType.PRESENT,
        name: 'PRESENT',
        count: filter[FilterType.PRESENT](points).length,
      },
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersEventsView({
      filters,
      currentFilterType: this.#filtersModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });


    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelChange = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
