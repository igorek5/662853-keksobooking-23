import { setActivateFormState } from '../set-form-state.js';
import { validateForms } from './form-validation.js';
import { sendData } from '../api/api-service.js';
import { onSendSuccess } from '../api-callbacks/on-send-success.js';
import { onSendError } from '../api-callbacks/on-error-action.js';
import { setCoordinatesMap } from '../map/map.js';
import { setPriseDefault } from './form-validation.js';
import { clearImgBlocks, addChooserInputsListeners } from './load-photo.js';

const addForm = document.querySelector('.ad-form');

const onAddFormSubmit = (evt) => {
  evt.preventDefault();
  sendData(onSendSuccess, onSendError, new FormData(evt.target));
};

const resetAddForm = () => {
  setCoordinatesMap();
  setPriseDefault();
  clearImgBlocks();
};

const onAddFormReset = () => {
  setTimeout(() => {
    resetAddForm();
  });
};

const activateAdForm = () => {
  setActivateFormState(addForm);
  validateForms();
  addChooserInputsListeners();
  addForm.addEventListener('submit', onAddFormSubmit);
  addForm.addEventListener('reset', onAddFormReset);
};

export { activateAdForm, resetAddForm };
