import { isEscEvent } from './utils.js';

const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const errorAdverts = document.querySelector('#adverts_error').content.querySelector('.adverts_error').cloneNode(true);

const closeSuccess = () => {
  successMessage.remove();
  successMessage.addEventListener('click', closeSuccess);
};

const closeSuccessEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccess();
  }
};

const openSuccessPopup = () => {
  document.body.append(successMessage);
  successMessage.addEventListener('click', closeSuccess);
  document.addEventListener('keydown', closeSuccessEscKeydown);
};

const closeError = () => {
  errorMessage.remove();
};

const closeErrorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeError();
  }
};

const openErrorPopup = () => {
  document.body.append(errorMessage);
  errorMessage.addEventListener('click', closeError);
  document.addEventListener('keydown', closeErrorEscKeydown);
  errorButton.focus();
  errorButton.addEventListener('click', closeError);
};

const setErrorAdverts = () => {
  document.body.append(errorAdverts);
  setTimeout(() => {
    errorAdverts.remove();
  }, 2500);
};


export { openSuccessPopup, openErrorPopup, setErrorAdverts };
