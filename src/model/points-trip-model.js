import {points} from '../mock/points.js';

export default class PointsTripModel {
  constructor() {
    this.data = undefined;
  }

  init() {
    this.data = points;
  }

  get() {
    return this.data;
  }
}
