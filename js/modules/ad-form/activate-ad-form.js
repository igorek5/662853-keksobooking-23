import { setActivateFormState } from '../set-form-state.js';
import { validateForms } from './form-validation.js';
import { sendData } from '../api/api-service.js';
import { onSendSuccess } from '../api-callbacks/on-send-success.js';
import { onSendError } from '../api-callbacks/on-error-action.js';
import { setCoordinatesMap } from '../map/map.js';
import { setPriseDefault } from './form-validation.js';
import { clearImgBlocks, addChooserInputsListeners } from './load-photo.js';

const addForm = document.querySelector('.ad-form');
const filter = document.querySelector('.map__filters');

const onAddFormSubmit = (evt) => {
  evt.preventDefault();
  sendData(onSendSuccess, onSendError, new FormData(evt.target));
};

const resetFilter = () => {
  filter.reset();
  const changeEvent = new Event('change');
  filter.dispatchEvent(changeEvent);
};

const resetAddForm = () => {
  setCoordinatesMap();
  setPriseDefault();
  clearImgBlocks();
};

const onAddFormReset = () => {
  setTimeout(() => {
    resetAddForm();
    resetFilter();
  });
};

const activateAdForm = () => {
  setActivateFormState(addForm);
  validateForms();
  addChooserInputsListeners();
  addForm.addEventListener('submit', onAddFormSubmit);
  addForm.addEventListener('reset', onAddFormReset);
};

export { activateAdForm, resetAddForm, resetFilter };
