const getData = (onGetSuccess, onGetError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then((data) => {
      onGetSuccess(data);
    })
    .catch(() => {
      onGetError();
    });
};

const sendData = (onSendSuccess, onSendError, body) => {
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((res) => {
      if (res.ok) {
        onSendSuccess();
        return;
      }
      throw new Error();
    })
    .catch(() => {
      onSendError();
    });
};

export { getData, sendData };
