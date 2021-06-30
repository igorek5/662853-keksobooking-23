import { enablePageForm } from './form.js';
import { createSimilarAdvertPopup } from './popup.js';
import { createSimilarAdvert } from './data.js';

const inputAddress = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const TOKYO_COORDINATES = {
  lat: '35.67500',
  lng: '139.75000',
};

const setAddressInputValue = () => {
  inputAddress.value = `${TOKYO_COORDINATES.lat}, ${TOKYO_COORDINATES.lng}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    setAddressInputValue();
    enablePageForm();
  })
  .setView(TOKYO_COORDINATES, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  TOKYO_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setAddressInputValue();
  mainPinMarker.setLatLng(TOKYO_COORDINATES);

  map.setView(TOKYO_COORDINATES, 12);
});

mainPinMarker.on('moveend', (evt) => {
  inputAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = ({ author, location, offer }) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createSimilarAdvertPopup(author, offer), {
      keepInView: true,
    });
  return marker;
};

createSimilarAdvert().forEach((el) => createMarker(el));
