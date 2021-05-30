const getRandomIntegers = function (min, max) {
  return (min < max && min >= 0) ? Math.floor(Math.random() * (max - min + 1) + min) : false;
};

getRandomIntegers(5, 10);

const getRandomDesetic = function (min, max, des) {
  return (min < max && min >= 0) ? +(Math.random() * (max - min) + min).toFixed(des) : false;
};

getRandomDesetic(1.1, 1.2, 3);
