import { disablePageForm } from './form.js';
import { validateForms } from './form-validation.js';
import { createSimilarAdvert, renderMap } from './map.js';
import { setUserFormSubmit, setResetButton } from './form.js';
import { openSuccessPopup, openErrorPopup, setErrorAdverts } from './popup-massage.js';
import { getData } from './api.js';

disablePageForm();
validateForms();
renderMap();

getData((adverts) => {
  createSimilarAdvert(adverts.slice(0, 10));
}, setErrorAdverts);
setUserFormSubmit(openSuccessPopup, openErrorPopup);
setResetButton();
