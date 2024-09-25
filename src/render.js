const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

/**
 * Creates an HTML-element based on given template-string.
 *
 * @param {string} template - Template-string for new element.
 * @returns {HTMLElement} - Created element.
 */
function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

/**
 * Render component in container on given position.
 *
 * @param {Object} component - Component to be rendered.
 * @param {HTMLElement} container - Container where component will be rendered.
 * @param {string} [place=RenderPosition.BEFOREEND] - Place where component will be rendered.
 * @return {void}
 */
function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

export {RenderPosition, createElement, render};
