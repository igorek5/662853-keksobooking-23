import { setFormsReset } from './form.js';

const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((adverts) => onSuccess(adverts))
    .catch(() => onFail());
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        setFormsReset();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
