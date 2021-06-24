const title = document.querySelector('#title');
const type = document.querySelector('#type');
const price = document.querySelector('#price');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

const MinPrice = {
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

const setFieldDependency = () => {
  price.min = price.placeholder = MinPrice[type.value];
};

const setCapacityGuests = (target) => {
  capacity.options[capacity.options.length - 1].disabled = true;
  for (let i = 0; i < capacity.options.length; i++) {
    if (target.value < +capacity.options[i].value) {
      capacity.options[i].disabled = true;
    }
    if ((+target.value >= capacity.options[i].value) && (+capacity.options[i].value !== 0)) {
      capacity.options[i].disabled = false;
    }
    if (target.value === capacity.options[i].value) {
      capacity.options[i].selected = true;
    }
  }
};

const setNoGuests = () => {
  capacity.options[capacity.options.length - 1].selected = true;
  capacity.options[capacity.options.length - 1].disabled = false;
  for (let i = 0; i < capacity.options.length - 1; i++) {
    capacity.options[i].disabled = true;
  }
};

const setDependencyCapacity = ({ target }) => {
  +target.value === 100 ? setNoGuests() : setCapacityGuests(target);
};

const setTimeIn = ({target}) => {
  timeout.options[target.options.selectedIndex].selected = true;
};

const setTimeOut = ({target}) => {
  timeIn.options[target.options.selectedIndex].selected = true;
};

const validateForms = () => {
  title.addEventListener('input', validateFieldLength);
  type.addEventListener('change', setFieldDependency);
  price.addEventListener('input', validateRangeField);
  roomNumber.addEventListener('change', setDependencyCapacity);
  timeIn.addEventListener('change', setTimeIn);
  timeout.addEventListener('change', setTimeOut);
};

export { validateForms };
