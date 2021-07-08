const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const BASE_AVATAR_SRC = 'img/muffin-grey.svg';
const avatarChooserInput = document.querySelector('.ad-form-header__input');
const photoChooserInput = document.querySelector('.ad-form__input');
const photoContainer = document.querySelector('.ad-form__photo');
const previewImg = document.querySelector('.ad-form-header__upload img');
let imgElement;

const loadChangeHandler = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const result = reader.result;
      switch (evt.target) {
        case avatarChooserInput:
          previewImg.src = result;
          break;
        case photoChooserInput:
          photoContainer.innerHTML = '';
          imgElement = document.createElement('img');
          imgElement.src = result;
          photoContainer.appendChild(imgElement);
          break;
        default:
          break;
      }
    });
    reader.readAsDataURL(file);
  }
};

const clearImgBlocks = () => {
  previewImg.src = BASE_AVATAR_SRC;
  photoContainer.innerHTML = '';
};

const addChooserInputsListeners = () => {
  avatarChooserInput.addEventListener('change', loadChangeHandler);
  photoChooserInput.addEventListener('change', loadChangeHandler);
};

export { clearImgBlocks, addChooserInputsListeners };
