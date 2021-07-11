const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const renderElement = (el, container, position = 'beforeend') => {
  container.insertAdjacentHTML(position, el);
};

export { isEscEvent, renderElement };
