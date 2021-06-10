import {getRandomNumber, getRandomArrayElement} from './utils.js';

const SIMILAR_ADVERT_COUNT = 10;

const TITLES = [
  'Маленькая квартира в центре',
  'Большая квартира в центре',
  'Отличная квартира',
  'Реальная квартира',
  'Не реальная квартира',
  'Фантастическая квартира',
  'Дом не далеко от центра',
  'Дом в центре',
  'Дворец с садом',
  'Двухместное бунгало',
];

const USER_COUNTER = {
  min: 1,
  max: 8,
};

const PRISE = {
  minPrise: 0,
  maxPrise: 10000,
};

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const ROOMS = {
  minRooms: 0,
  maxRooms: 10,
};

const GUESTS = {
  minGuests: 0,
  maxGuests: 3,
};

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Жилье находится не далеко от парка',
  'Вид из окна на берег реки',
  'Зимой тепло и уютно',
  'Нет соседей',
  'Рядом торговый центр',
  'Не далеко от остановки с общественным транспортом',
  'В шаговой доступности детский сад, и школа',
  'Во дворе большой спортивный комплекс',
  'Вместительная парковка',
  'Тихое место',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LOCATION = {
  lat: {
    min: 35.65000,
    max: 35.70000,
  },
  lng: {
    min: 139.70000,
    max: 139.80000,
  },
};

const createAdvert = function () {
  const locationLat = getRandomNumber(LOCATION.lat.min, LOCATION.lat.max, 5);
  const locationLng = getRandomNumber(LOCATION.lng.min, LOCATION.lng.max, 5);

  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(USER_COUNTER.min, USER_COUNTER.max)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `location.x: ${locationLat}, location.y ${locationLng}`,
      price: getRandomNumber(PRISE.minPrise, PRISE.maxPrise),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(ROOMS.minRooms, ROOMS.maxRooms),
      guests: getRandomNumber(GUESTS.minGuests, GUESTS.maxGuests),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: [...new Set(new Array(getRandomNumber(1, 6)).fill('').map(() => getRandomArrayElement(FEATURES)))],
      description: getRandomArrayElement(DESCRIPTION),
      photos: [...new Set(new Array(getRandomNumber(1, 3)).fill('').map(() => getRandomArrayElement(PHOTOS)))],
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const createSimilarAdvert = () => new Array(SIMILAR_ADVERT_COUNT).fill('').map(() => createAdvert());

export {createSimilarAdvert};
