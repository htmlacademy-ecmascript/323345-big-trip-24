import { render, remove, RenderPosition } from '../framework/render.js';
import { SortType, FilterType, UpdateType, UserAction } from '../const.js';
import { sortEventsByDay, sortEventsByTime, sortEventsByPrice } from '../utils/sort.js';
import { filter } from '../utils/filter.js';

import NewTripPointPresenter from './new-trip-points-presenter.js';
import TripPointsPresenter from './trip-points-presenter.js';

import SortEventsView from '../view/sort-events-view.js';
import ListEventsView from '../view/list-events-view.js';
import MessageLoadingView from '../view/message-loading-view.js';
import MessageEventsView from '../view/message-events-view.js';

import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class ListPresenter {

  #listContainer = null;
  #pointsTripModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;

  #tripPointsPresentersId = new Map();
  #newTripPointPresenter = null;

  #noTripEventsComponent = null;
  #tripLoadingComponent = new MessageLoadingView();
  #listComponent = new ListEventsView();

  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({
    listContainer,
    pointsTripModel,
    destinationsTripModel,
    offersTripModel,
    filtersModel,
    onNewTripPointClose
  }) {
    this.#listContainer = listContainer;
    this.#pointsTripModel = pointsTripModel;
    this.#destinationsModel = destinationsTripModel;
    this.#offersModel = offersTripModel;
    this.#filtersModel = filtersModel;


    this.#newTripPointPresenter = new NewTripPointPresenter({
      tripPointListContainer: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTripPointClose,
    });


    this.#pointsTripModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get tripPoints() {
    const tripPoints = this.#pointsTripModel.points;
    const filteredTripPoints = filter[this.#filtersModel.filter](tripPoints);
    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredTripPoints.sort(sortEventsByDay);
      case SortType.TIME:
        return filteredTripPoints.sort(sortEventsByTime);
      case SortType.PRICE:
        return filteredTripPoints.sort(sortEventsByPrice);
    }
    return filteredTripPoints;
  }

  init(failedLoadViewComonent) {

    render(this.#listComponent, this.#listContainer);
    this.#renderList(failedLoadViewComonent);
  }

  createTripPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if (this.#noTripEventsComponent) {
      remove(this.#noTripEventsComponent);
    }

    this.#newTripPointPresenter.init();
  }

  checkPointsLength() {
    if (this.#pointsTripModel.points.length === 0) {
      this.#renderNoTripEventsComponent();
    }
  }

  #renderList(failedLoadViewComonent) {

    if (this.#isLoading) {
      this.#renderMessageLoadingComponent();

      if (failedLoadViewComonent) {
        remove(this.#tripLoadingComponent);
      }

      return;
    }

    if (this.#pointsTripModel.points.length === 0) {
      this.#renderNoTripEventsComponent();
      return;
    }

    this.#renderSort();
    this.#renderAllTripEvents();
  }

  #handleModeChange = () => {
    this.#newTripPointPresenter.destroy();
    this.#tripPointsPresentersId.forEach((presenter) => presenter.resetView());
  };

  /**
   * Обработчик события изменения View (от вьюшек)
   * Принимает пользовательские данные от вьюшки и передает их в модель
   * @param {UserAction} actionType - тип события (обновить/добавить/удалить)
   * @param {UpdateType} updateType - тип обновления (patch/minor/major)
   * @param {object} update - обновленные данные (объект с данными от вьюшки)
   * @returns Отправляет обновленные данные в модель для обновленния
   */
  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripPointsPresentersId.get(update.id).setSaving();
        try {
          await this.#pointsTripModel.updatePoint(updateType, update);
        } catch (err) {
          this.#tripPointsPresentersId.get(update.id).setAborting();
        }
        break;

      case UserAction.ADD_POINT:
        this.#newTripPointPresenter.setSaving();
        try {
          await this.#pointsTripModel.addPoint(updateType, update);
        } catch (err) {
          this.#newTripPointPresenter.setAborting();
        }
        break;

      case UserAction.DELETE_POINT:
        this.#tripPointsPresentersId.get(update.id).setDeleting();
        try {
          await this.#pointsTripModel.deletePoint(updateType, update);
        } catch (err) {
          this.#tripPointsPresentersId.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  /**
   * Обработчик события изменения данных модели
   * @param {UpdateType} updateType - тип обновления (patch/minor/major)
   * @param {object} data - обновленные данные
   * @returns перерисовывает компоненты согласно типу обновления
   */
  #handleModelEvent = (updateType, data) => {

    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPointsPresentersId.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripPointList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearTripPointList({ resetSortType: true });
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#tripLoadingComponent);
        this.#renderList();
        break;
    }
  };

  #renderSort() {
    this.#sortComponent = new SortEventsView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });
    render(this.#sortComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripPointList();
    this.#renderList();
  };

  #renderTripPoint(tripPoint) {
    if (this.#noTripEventsComponent) {
      remove(this.#noTripEventsComponent);
    }

    const tripPointsPresenter = new TripPointsPresenter({
      pointListContainer: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    tripPointsPresenter.init(tripPoint);
    this.#tripPointsPresentersId.set(tripPoint.id, tripPointsPresenter);
  }

  #renderMessageLoadingComponent() {
    render(this.#tripLoadingComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoTripEventsComponent() {
    this.#noTripEventsComponent = new MessageEventsView({
      filterType: this.#filtersModel.filter,
    });
    render(this.#noTripEventsComponent, this.#listComponent.element);
  }

  #renderAllTripEvents() {
    this.#renderNoTripEventsComponent();
    this.tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint));
  }

  #clearTripPointList({ resetSortType = false } = {}) {

    this.#newTripPointPresenter.destroy();
    this.#tripPointsPresentersId.forEach((presenter) => presenter.destroy());
    this.#tripPointsPresentersId.clear();

    remove(this.#sortComponent);
    remove(this.#tripLoadingComponent);

    if (this.#noTripEventsComponent) {
      remove(this.#noTripEventsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
