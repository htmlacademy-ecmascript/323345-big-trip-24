import {points} from '../mock/points.js';

export default class PointsTripModel {
  #points;
  constructor() {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }

  set points(tripPoints) {
    this.#points = tripPoints;
  }
}
