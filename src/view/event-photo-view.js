import {createElement} from '../render.js';

const EVENT_PHOTO = ['img/photos/1.jpg', 'img/photos/2.jpg', 'img/photos/3.jpg', 'img/photos/4.jpg', 'img/photos/5.jpg', ];

let i = -1;

function createEventPhotoTemplate() {
  i++;
  return `<img class="event__photo" src="${EVENT_PHOTO[i]}" alt="Event photo"></img>`;
}

export default class EventPhoto {
  getTemplate() {
    return createEventPhotoTemplate();
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

