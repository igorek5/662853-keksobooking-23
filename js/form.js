const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

const formFields = (el, isActive) => {
  const elementsForm = ['input', 'textarea', 'select', 'button'];
  elementsForm.forEach((formItem) => {
    const fields = el.querySelectorAll(formItem);
    fields.length ? fields.forEach((item) => item.disabled = isActive) : false;
  });
};

const formDisabled = (...formContainer) => {
  formContainer.forEach((form) => {
    form.classList.add(`${form.classList[0]}--disabled`);
    formFields(form, true);
  });
};

const formEnabled = (...formContainer) => {
  formContainer.forEach((form) => {
    form.classList.remove(`${form.classList[0]}--disabled`);
    formFields(form, false);
  });
};

const formDisabledPage = () => formDisabled(adForm, mapForm);
const formEnabledPage = () => formEnabled(adForm, mapForm);

export {formDisabledPage, formEnabledPage};
