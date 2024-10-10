import Observable from '../framework/observable.js';
import {points} from '../mock/points.js';

export default class PointsTripModel extends Observable {
  #dataPoints = null;
  constructor() {
    super();
    this.#dataPoints = points;
  }

  get points() {
    return this.#dataPoints;
  }

  updatePoint(updateType, update) {
    const index = this.#dataPoints.findIndex((point) => point.id === update.id);

    if(index === -1){
      throw new Error('Can\'t update unexisting point');
    }

    this.#dataPoints = [
      ...this.#dataPoints.slice(0, index),
      update,
      ...this.#dataPoints.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update){
    this.#dataPoints = [
      update,
      ...this.#dataPoints
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#dataPoints.findIndex((point) => point.id === update.id);

    if(index === -1){
      throw new Error('Can\'t delete unexisting point');
    }

    this.#dataPoints = [
      ...this.#dataPoints.slice(0, index),
      ...this.#dataPoints.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
