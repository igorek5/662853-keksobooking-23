import { createSimilarAdvert } from './data.js';

const TYPE_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const mapCanvas = document.querySelector('.map__canvas');
const popupCard = document.querySelector('#card').content.querySelector('.popup');

const similarAdverts = createSimilarAdvert();
const similarListFragment = document.createDocumentFragment();

const createImgMarkup = (el) => `<img src="${el}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
const createFeatureMarkup = (el) => `<li class="popup__feature popup__feature--${el}"></li>`;

const render = (elements, container, fn) => {
  elements.forEach((el) => {
    container.insertAdjacentHTML('beforeend', fn(el));
  });
};

similarAdverts.forEach(({author, offer}) => {
  const advertElement = popupCard.cloneNode(true);

  const userAvatar = advertElement.querySelector('.popup__avatar');
  const titleAdvert = advertElement.querySelector('.popup__title');
  const addressAdvert = advertElement.querySelector('.popup__text--address');
  const priceAdvert = advertElement.querySelector('.popup__text--price');
  const typeAdvert = advertElement.querySelector('.popup__type');

  const capacityAdvert = advertElement.querySelector('.popup__text--capacity');
  const rooms = offer.rooms ? `${offer.rooms} комнаты ` : '';
  const guests = offer.guests ? `для ${offer.guests} гостей` : '';
  const capacityText = `${rooms}${guests}`;

  const timeAdvert = advertElement.querySelector('.popup__text--time');
  const checkin = offer.checkin ? `Заезд после ${offer.checkin}` : '';
  const checkout = offer.checkout ? `выезд до ${offer.checkout}` : '' ;
  const timeComma = checkin && checkout ? ', ' : '';
  const timeText = `${checkin}${timeComma}${checkout}`;

  const featuresList = advertElement.querySelector('.popup__features');
  const description = advertElement.querySelector('.popup__description');
  const photosList = advertElement.querySelector('.popup__photos');

  author.avatar ? userAvatar.src = author.avatar : userAvatar.remove();

  offer.title ? titleAdvert.textContent = offer.title : titleAdvert.remove();

  offer.address ? addressAdvert.textContent = offer.address : addressAdvert.remove();

  offer.price ? priceAdvert.textContent = `${offer.price} ₽/ночь` : priceAdvert.remove();

  offer.type ? typeAdvert.textContent = TYPE_OF_HOUSING[offer.type] : typeAdvert.remove();

  capacityText ? capacityAdvert.textContent = capacityText : capacityAdvert.remove();

  timeText ? timeAdvert.textContent = timeText : timeAdvert.remove();

  featuresList.innerHTML = '';
  offer.features && offer.features.length? render(offer.features, featuresList, createFeatureMarkup) : featuresList.remove();

  offer.description ? description.textContent = offer.description : description.remove();

  photosList.innerHTML = '';
  offer.photos && offer.photos.length ? render(offer.photos, photosList, createImgMarkup) : photosList.remove();

  similarListFragment.appendChild(advertElement);
});

mapCanvas.appendChild(similarListFragment.childNodes[0]);
