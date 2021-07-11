const title = document.querySelector('#title');
const type = document.querySelector('#type');
const price = document.querySelector('#price');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const guestQuantityOption = capacity.querySelectorAll('option');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const roomsToOptions = {
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

const typeToPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
  'default': 1000,
};

const formTitleInputHandler = ({ target }) => {
  if (target.value.length < target.minLength) {
    target.setCustomValidity(`Минимальная длина — ${target.minLength} символов, введите еще ${target.minLength - target.value.length} символов`);
  } else if (target.value.length > target.maxLength) {
    target.setCustomValidity(`Максимальная длина — ${target.maxLength} символов, удалите ${target.value.length - target.maxLength} символов`);
  } else {
    target.setCustomValidity('');
  }
  target.reportValidity();
};

const formPriceInputHandler = ({ target }) => {
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
  price.min = typeToPrice[el.value];
  price.placeholder = typeToPrice[el.value];
};

const changeRoomQuantityInputState = (el) => {
  if (!roomsToOptions[el.value]) {
    el.value = 'default';
  }
  guestQuantityOption.forEach((option) => {
    option.disabled = true;
  });
  roomsToOptions[el.value].items.forEach((item) => {
    guestQuantityOption[item].disabled = false;
  });
  guestQuantityOption[roomsToOptions[el.value].value].selected = true;
};

const formTypeChangeHandler = ({ target }) => {
  changePriceInputState(target);
};

const formQuantitySelectHandler = ({ target }) => {
  changeRoomQuantityInputState(target);
};

const formTimeInChangeHandler = ({ target }) => {
  timeOut.options[target.options.selectedIndex].selected = true;
};

const formTimeOutChangeHandler = ({ target }) => {
  timeIn.options[target.options.selectedIndex].selected = true;
};

const setPriceDefault = () => {
  price.min = typeToPrice['default'];
  price.placeholder = typeToPrice['default'];
};

const setRoomsDefault = () => {
  changeRoomQuantityInputState(roomNumber);
};

const validateForms = () => {
  changePriceInputState(type);
  changeRoomQuantityInputState(roomNumber);
  title.addEventListener('input', formTitleInputHandler);
  type.addEventListener('change', formTypeChangeHandler);
  price.addEventListener('input', formPriceInputHandler);
  roomNumber.addEventListener('change', formQuantitySelectHandler);
  timeIn.addEventListener('change', formTimeInChangeHandler);
  timeOut.addEventListener('change', formTimeOutChangeHandler);
};

export { validateForms, setPriceDefault, setRoomsDefault };
