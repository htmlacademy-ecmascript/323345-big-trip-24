import {createElement} from '../render.js';

const tripInfoTitle = 'Amsterdam &mdash; Chamonix &mdash; Geneva';
const tripInfoDate = '18&nbsp;&mdash;&nbsp;20 Mar';
const tripInfoCostValue = '1230';

function createSectionTripInfoTemplate() {
  return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripInfoTitle}</h1>
        <p class="trip-info__dates">${tripInfoDate}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripInfoCostValue}</span>
      </p>
    </section>`;
}

export default class SectionTripInfo {
  getTemplate() {
    return createSectionTripInfoTemplate();
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


