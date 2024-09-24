import {points} from '../mock/points.js';

export default class PointsTripModel {
  constructor(data) {
    this.data = data;
  }

  init() {
    this.data = points;
  }

  get() {
    return this.data;
  }
}
