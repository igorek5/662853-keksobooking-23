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

const setFeatures = (arrFeatures, featuresList) => {
  arrFeatures.forEach((el) => {
    const item = document.createElement('li');
    item.classList.add('popup__feature');
    item.classList.add(`popup__feature--${el}`);
    featuresList.appendChild(item);
  });
};

const setPhotoAdvert = (arrPhotos, fotosList) => {
  arrPhotos.forEach((el) => {
    fotosList.insertAdjacentHTML('beforeend', `<img src="${el}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  });
};

similarAdverts.forEach(({author, offer}) => {
  const advertElement = popupCard.cloneNode(true);

  const titleAdvert = advertElement.querySelector('.popup__title');
  offer.title ? titleAdvert.textContent = offer.title : titleAdvert.remove();

  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  advertElement.querySelector('.popup__type').textContent = TYPE_OF_HOUSING[offer.type];
  advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  advertElement.querySelectorAll('.popup__feature').forEach((item) => item.remove());
  const featuresList = advertElement.querySelector('.popup__features');
  offer.features ? setFeatures(offer.features, featuresList) : featuresList.remove();

  const description = advertElement.querySelector('.popup__description');
  offer.description ? description.textContent = offer.description : description.remove();

  const fotosList = advertElement.querySelector('.popup__photos');
  advertElement.querySelector('.popup__photo').remove();
  offer.photos ? setPhotoAdvert(offer.photos, fotosList) : fotosList.remove();

  const userAvatar = advertElement.querySelector('.popup__avatar');
  author.avatar ? userAvatar.src = author.avatar : userAvatar.remove();

  similarListFragment.appendChild(advertElement);
});

mapCanvas.appendChild(similarListFragment);
