const title = document.querySelector('#title');
const type = document.querySelector('#type');
const price = document.querySelector('#price');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const guestQuantityOption = capacity.querySelectorAll('option');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const RENT_ROOMS = {
  '1': {
    value: 2,
    items: [2],
  },
  '2': {
    value: 1,
    items: [2, 1],
  },
  '3': {
    value: 0,
    items: [2, 1, 0],
  },
  '100': {
    value: 3,
    items: [3],
  },
  'default': {
    value: 2,
    items: [3, 2, 1, 0],
  },
};

const MIN_PRISE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const validateFieldLength = ({ target }) => {
  if (target.value.length < target.minLength) {
    target.setCustomValidity(`Минимальная длина — ${target.minLength} символов, введите еще ${target.minLength - target.value.length} символов`);
  } else if (target.value.length > target.maxLength) {
    target.setCustomValidity(`Максимальная длина — ${target.maxLength} символов, удалите ${target.value.length - target.maxLength} символов`);
  } else {
    target.setCustomValidity('');
  }
  target.reportValidity();
};

const validateRangeField = ({ target }) => {
  if (target.value < +target.min) {
    target.setCustomValidity(`Минимальное значение для этого поля: ${target.min} ₽/ночь`);
  } else if (target.value > +target.max) {
    target.setCustomValidity(`Максимальное значение для этого поля: ${target.max} ₽/ночь`);
  } else {
    target.setCustomValidity('');
  }
  target.reportValidity();
};

const changePriceInputState = (el) => {
  price.min = MIN_PRISE[el.value];
  price.placeholder = ` от ${MIN_PRISE[el.value]} руб.`;
};

const changeRoomQuantityInputState = (el) => {
  if(!RENT_ROOMS[el.value]) {
    el.value = 'default';
  }
  guestQuantityOption.forEach((option) => {
    option.disabled = true;
  });
  RENT_ROOMS[el.value].items.forEach((item) => {
    guestQuantityOption[item].disabled = false;
  });
  guestQuantityOption[RENT_ROOMS[el.value].value].selected = true;
};

const setFieldDependency = ({target}) => {
  changePriceInputState(target);
  price.setCustomValidity('Изменился диапазон допустимых цен');
  price.reportValidity();
};

const roomQuantitySelectHandler = ({ target }) => {
  changeRoomQuantityInputState(target);
  capacity.setCustomValidity('Изменился выбор количество мест');
  capacity.reportValidity();
};

const setTimeIn = ({ target }) => {
  timeOut.options[target.options.selectedIndex].selected = true;
  timeOut.setCustomValidity('Изменилось время выезда');
  timeOut.reportValidity();
};

const setTimeOut = ({ target }) => {
  timeIn.options[target.options.selectedIndex].selected = true;
  timeIn.setCustomValidity('Изменилось время заезда');
  timeIn.reportValidity();
};

const validateForms = () => {
  changePriceInputState(type);
  changeRoomQuantityInputState(roomNumber);
  title.addEventListener('input', validateFieldLength);
  type.addEventListener('change', setFieldDependency);
  price.addEventListener('input', validateRangeField);
  roomNumber.addEventListener('change', roomQuantitySelectHandler);
  timeIn.addEventListener('change', setTimeIn);
  timeOut.addEventListener('change', setTimeOut);
};

export { validateForms };
