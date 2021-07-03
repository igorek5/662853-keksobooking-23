import { sendData } from './api.js';
import { setPriseDefault } from './form-validation.js';
import { TOKYO_COORDINATES, setCoordinatesMap } from './map.js';

const forms = document.querySelectorAll('form');
const adForm = document.querySelector('.ad-form');
const inputAddress = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const traverseFormElements = (form, isActive) => {
  const formElements = form.querySelectorAll('input, textarea, select, button');
  formElements.forEach((formElement) => {
    formElement.disabled = isActive;
  });
};

const disablePageForm = () => {
  forms.forEach((form) => {
    form.classList.add('disabled');
    traverseFormElements(form, true);
  });
};

const enablePageForm = () => {
  forms.forEach((form) => {
    form.classList.remove('disabled');
    traverseFormElements(form, false);
  });
};

const setUserFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(onSuccess, onFail, new FormData(evt.target));
  });
};

const setAddressInputValue = (lat, lng) => {
  inputAddress.value = `${lat}, ${lng}`;
};

const setFormsReset = () => {
  forms.forEach((el) => {
    el.reset();
  });
  setAddressInputValue(TOKYO_COORDINATES.lat, TOKYO_COORDINATES.lng);
  setPriseDefault();
  setCoordinatesMap();
};
const setResetButton = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    setFormsReset();
  });
};

export { disablePageForm, enablePageForm, setUserFormSubmit, setFormsReset, setAddressInputValue, setResetButton };
