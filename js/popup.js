const TYPE_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const popupCard = document.querySelector('#card').content.querySelector('.popup');

const createImgMarkup = (elements) => elements.map((el) => `<img src="${el}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('\n');
const createFeatureMarkup = (elements) => elements.map((el) => `<li class="popup__feature popup__feature--${el}"></li>`).join('\n');

const render = (elements, container, fn) => {
  container.insertAdjacentHTML('beforeend', fn(elements));
};

const addElementTextContent = (value, element, selector) => {
  element.querySelector(selector);
  if (!value) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).textContent = value;
};

const addElementAdditionalTextContent = (value, additionalValue, element, selector) => {
  if (!value) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).textContent = `${value} ${additionalValue}`;
};

const addElementSrc = (value, element, selector) => {
  if (!value) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).src = value;
};

const addListElementContent = (value, element, selector, fn) => {
  if (!value || value.lenght) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).innerHTML = '';
  render(value, element.querySelector(selector), fn);
};


const addTimeElementTextContent = (valueIn, valueOut, element, selector) => {
  element.querySelector(selector);
  const checkIn = valueIn ? `Заезд после ${valueIn}` : '';
  const checkOut = valueOut ? `выезд до ${valueOut}` : '';
  const timeComma = checkIn && checkOut ? ', ' : '';
  const timeText = `${checkIn}${timeComma}${checkOut}`;
  if (!timeText) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).innerHTML = '';
  element.querySelector(selector).textContent = timeText;
};

const addCapacityElementTextContent = (valueRooms, valueGuests, element, selector) => {
  const rooms = valueRooms ? `${valueRooms} комнаты ` : '';
  const guests = valueGuests ? `для ${valueGuests} гостей` : '';
  const capacityText = `${rooms}${guests}`;
  if (!capacityText) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).innerHTML = '';
  element.querySelector(selector).textContent = capacityText;
};

const addTypeElementTextContent = (value, element, selector) => {
  if (!value || !TYPE_OF_HOUSING[value]) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).textContent = TYPE_OF_HOUSING[value];
};

const createSimilarAdvertPopup = (author, offer ) => {
  const advertElement = popupCard.cloneNode(true);

  addElementSrc(author.avatar, advertElement, '.popup__avatar');
  addElementTextContent(offer.title, advertElement, '.popup__title');
  addElementTextContent(offer.address, advertElement, '.popup__text--address');
  addElementAdditionalTextContent(offer.price, '₽/ночь', advertElement, '.popup__text--price');
  addElementTextContent(offer.description, advertElement, '.popup__description');
  addTypeElementTextContent(offer.type, advertElement, '.popup__type');
  addCapacityElementTextContent(offer.rooms, offer.guests, advertElement, '.popup__text--capacity');
  addTimeElementTextContent(offer.checkin, offer.checkout, advertElement, '.popup__text--time');
  addListElementContent(offer.features, advertElement, '.popup__features', createFeatureMarkup);
  addListElementContent(offer.photos, advertElement, '.popup__photos', createImgMarkup);

  return advertElement;
};

export { createSimilarAdvertPopup };
