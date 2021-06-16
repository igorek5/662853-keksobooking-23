import {createSimilarAdvert} from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const popupCard = document.querySelector('#card')
  .content
  .querySelector('.popup');
const similarAdverts = createSimilarAdvert();

similarAdverts.forEach((advert) => {
  const advertElement = popupCard.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = advert.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = advert.offer.price;
  mapCanvas.appendChild(advertElement);
});

createSimilarAdvert();
