import {points} from '../mock/points.js';

export default class PointsTripModel {
  #points;
  constructor() {
    this.#points = points;
  }

  get() {
    return this.#points;
  }
}
