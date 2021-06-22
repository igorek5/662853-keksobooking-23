const adForm = document.querySelector('.ad-form');

const validateForms = (form) => {
  const title = form.querySelector('#title');
  const type = form.querySelector('#type');
  const price = form.querySelector('#price');
  const roomNumber = form.querySelector('#room_number');
  const capacity = form.querySelector('#capacity');
  const minPrice = {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000,
  };

  const validateFieldLength = (field) => {
    const lengthValue = field.value.length;
    const minLength = field.minLength;
    const maxLength = field.maxLength;

    if (lengthValue < minLength) {
      field.setCustomValidity(`Минимальная длина — ${minLength} символов, введите еще ${minLength - lengthValue} символов`);
    } else if (lengthValue > maxLength) {
      field.setCustomValidity(`Максимальная длина — ${maxLength} символов, удалите ${lengthValue - maxLength} символов`);
    } else {
      field.setCustomValidity('');
    }
    field.reportValidity();
  };

  const validateRangeField = (field, minimumPrice) => {
    const fieldValue = field.value;
    const minValue = minimumPrice;
    const maxValue = +field.max;
    if (fieldValue < minValue) {
      field.setCustomValidity(`Минимальное значение для этого поля: ${minValue} ₽/ночь`);
    } else if (fieldValue > maxValue) {
      field.setCustomValidity(`Максимальное значение для этого поля: ${maxValue} ₽/ночь`);
    } else {
      field.setCustomValidity('');
    }
    field.reportValidity();
  };

  const setFieldDependency = (field, minValue) => {
    field.min = minValue;
    field.placeholder = minValue;
  };

  const setDependencyCapacity = (field) => {
    const rooms = +roomNumber.value;
    const guests = +capacity.value;
    if (rooms < guests) {
      capacity.setCustomValidity(`Количество мест до: ${rooms} ${rooms === 1 ? 'гостя' : 'гостей'}`);
    } else if (rooms === 100 && guests !== 0) {
      capacity.setCustomValidity('Такое количество комнат не для гостей');
    } else {
      field.setCustomValidity('');
    }
    field.reportValidity();
  };

  title.addEventListener('input', () => validateFieldLength(title));
  type.addEventListener('change', () => setFieldDependency(price, minPrice[type.value]));
  price.addEventListener('input', () => validateRangeField(price, minPrice[type.value]));
  roomNumber.addEventListener('change', () => setDependencyCapacity(capacity));
  capacity.addEventListener('change', () => setDependencyCapacity(capacity));
};

validateForms(adForm);
