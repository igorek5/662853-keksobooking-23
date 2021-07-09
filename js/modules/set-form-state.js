const forms = document.querySelectorAll('form');
const formsElements = document.querySelectorAll('form input, select, button, textarea');

const setElementDisableState = () => {
  formsElements.forEach((item) => {
    item.disabled = true;
  });
};

const setElementEnableState = (form) => {
  form.querySelectorAll('form input, select, button, textarea').forEach((item) => {
    item.disabled = false;
  });
};

const setDeactivatePageState = () => {
  forms.forEach((form) => {
    form.classList.add('disabled');
  });
  setElementDisableState();
};

const setActivateFormState = (form) => {
  form.classList.remove('disabled');
  setElementEnableState(form);
};

export {setDeactivatePageState, setActivateFormState};
