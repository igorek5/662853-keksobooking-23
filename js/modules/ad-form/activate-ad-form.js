import { setActivateFormState } from '../set-form-state.js';
import { validateForms } from './form-validation.js';
import { sendData } from '../api/api-service.js';
import { onSendSuccess } from '../api-callbacks/on-send-success.js';
import { onSendError } from '../api-callbacks/on-error-action.js';
import { setCoordinatesMap } from '../map/map.js';
import { setPriceDefault, setRoomsDefault } from './form-validation.js';
import { clearImgBlocks, addChooserInputsListeners } from './load-photo.js';

const addForm = document.querySelector('.ad-form');
const filter = document.querySelector('.map__filters');

const addFormSubmitHandler = (evt) => {
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
  setPriceDefault();
  setRoomsDefault();
  clearImgBlocks();
};

const addFormResetHandler = () => {
  setTimeout(() => {
    resetAddForm();
    resetFilter();
  });
};

const activateAdForm = () => {
  setActivateFormState(addForm);
  validateForms();
  addChooserInputsListeners();
  addForm.addEventListener('submit', addFormSubmitHandler);
  addForm.addEventListener('reset', addFormResetHandler);
};

export { activateAdForm, resetAddForm, resetFilter };
