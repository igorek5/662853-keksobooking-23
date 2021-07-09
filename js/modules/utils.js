const getRandomNumber = (min, max, roundTo = 0) => {
  const num = min + Math.random() * (max - min);
  return roundTo > 0 ? num.toFixed(roundTo) : Math.round(num);
};

const getRandomArrayElement = (elements) => elements[Math.round(Math.random() * (elements.length - 1))];

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const renderElement = (el, container, position = 'beforeend') => {
  container.insertAdjacentHTML(position, el);
};

export { getRandomNumber, getRandomArrayElement, isEscEvent, renderElement };