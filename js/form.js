const forms = document.querySelectorAll('form');

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

export {disablePageForm, enablePageForm};
