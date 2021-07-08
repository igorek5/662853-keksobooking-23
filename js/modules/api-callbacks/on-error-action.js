import { isEscEvent, renderElement } from '../utils.js';

const createErrorMarkup = (text, btnState) => `<div class="error">
                                                <p class="error__message">${text}</p>
                                                ${btnState ? '<button type="button" class="error__button">Попробовать снова</button>' : ''}
                                              </div>`;

const onErrorBlockClick = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.error')) {
    closeErrorBlock();
  }
};

const onDocumentKeydown = (evt) => {
  evt.preventDefault();
  if (isEscEvent(evt)) {
    closeErrorBlock();
  }
};

const addListeners = () => {
  document.addEventListener('click', onErrorBlockClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeErrorBlock() {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onErrorBlockClick);
}

const onGetError = () => {
  renderElement(createErrorMarkup('При загрузке данных произошла ошибка!'), document.body);
  addListeners();
};

const onSendError = () => {
  renderElement(createErrorMarkup('Ошибка размещения объявления', true), document.body);
  addListeners();
};

export { onGetError, onSendError };
