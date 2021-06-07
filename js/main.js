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

const photos = [
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

const getRandomIntegers = function (min, max) {
  return (min < max && min >= 0) ? Math.floor(Math.random() * (max - min + 1) + min) : false;
};

const getRandomDesetic = function (min, max, des = 5) {
  return (min < max && min >= 0) ? +(Math.random() * (max - min) + min).toFixed(des) : false;
};

/* Перемешивает массив */

const shuffle = (array) => {
  for (let el = array.length - 1; el > 0; el--) {
    const tmp = array[el];
    const randomEl = Math.floor(Math.random() * (el + 1));
    array[el] = array[randomEl];
    array[randomEl] = tmp;
  }
  return array;
};

/* Создает массив нужной длины в случайном пордке */

const getShuffleArray = (numberElements) => {
  const array = [];
  for (let el = 1; el <= numberElements; el++) {
    array.push(el);
  }
  return shuffle(array);
};

/* Случайный элемент массива */

const getRandomArrayElement = (elemests) => elemests[getRandomIntegers(0, elemests.length - 1)];

/* Получил не повторяющийся массив в случайном порядке длиною 'SIMILAR_ADVERT_COUNT' и сложил в переменную */

const getRandomArray = getShuffleArray(SIMILAR_ADVERT_COUNT);

/* Случайная длинна массива в случайном пордке */

const getShuffleRandomArray = (arr) => {
  const newArr = shuffle(arr);
  const numberRandom = getRandomIntegers(0, arr.length - 1);
  return newArr.slice(numberRandom);
};

let currentCount = SIMILAR_ADVERT_COUNT;

const createAdvert = function () {
  currentCount--;
  const locationLat = getRandomDesetic(LOCATION.lat.min, LOCATION.lat.max);
  const locationLng = getRandomDesetic(LOCATION.lng.min, LOCATION.lng.max);
  return {
    author: {
      avatar: `img/avatars/user${getRandomArray[currentCount] <= 9 ? '0' : ''}${getRandomArray[currentCount]}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `location.x: ${locationLat}, location.y ${locationLng}`,
      price: getRandomIntegers(PRISE.minPrise, PRISE.maxPrise),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntegers(ROOMS.minRooms, ROOMS.maxRooms),
      guests: getRandomIntegers(GUESTS.minGuests, GUESTS.maxGuests),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getShuffleRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getShuffleRandomArray(photos),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const similarAdvert = new Array(SIMILAR_ADVERT_COUNT).fill('').map(() => createAdvert());
similarAdvert;
