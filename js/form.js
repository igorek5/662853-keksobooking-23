const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

const traverseFormElements = (el, isActive) => {
  const elementsForm = ['input', 'textarea', 'select', 'button'];
  elementsForm.forEach((formItem) => {
    const fields = el.querySelectorAll(formItem);
    fields.length ? fields.forEach((item) => item.disabled = isActive) : false;
  });
};

const disableForm = (...formContainer) => {
  formContainer.forEach((form) => {
    form.classList.add('disabled');
    traverseFormElements(form, true);
  });
};

const enableForm = (...formContainer) => {
  formContainer.forEach((form) => {
    form.classList.remove('disabled');
    traverseFormElements(form, false);
  });
};

const disablePageForm = () => disableForm(adForm, mapForm);
const enablePageForm = () => enableForm(adForm, mapForm);

export {disablePageForm, enablePageForm};
