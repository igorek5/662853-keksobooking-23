import { createSimilarAdvertPopup } from './popup.js';
import { getData } from '../api/api-service.js';
import { onGetSuccess } from '../api-callbacks/on-get-success.js';
import { onGetError } from '../api-callbacks/on-error-action.js';
import { activateAdForm } from '../ad-form/activate-ad-form.js';
import { filterAdverts } from '../filter/filter.js';

const ADVERT_COUNTER = 10;
const CITY_CENTER = {
  lat: '35.67500',
  lng: '139.75000',
};

const map = L.map('map-canvas');
const addressInput = document.querySelector('#address');
let mainPinMarker;
let markerGroup;

const setAddressInputValue = (lat, lng) => {
  addressInput.value = `${lat}, ${lng}`;
};

const setCoordinatesMap = () => {
  mainPinMarker.setLatLng(CITY_CENTER);
  map.setView(CITY_CENTER, 12);
};

const removeMarkerGroup = () => {
  markerGroup.clearLayers();
};

const addMarkersGroup = (adverts) => {
  markerGroup = L.layerGroup().addTo(map);
  adverts
    .slice()
    .filter(filterAdverts)
    .slice(0, ADVERT_COUNTER)
    .forEach((el) => {
      const { author, location, offer } = el;
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
    });
};

const initMap = () => {
  map
    .on('load', () => {
      activateAdForm();
      getData(onGetSuccess, onGetError);
    })
    .setView(CITY_CENTER, 12);

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
  mainPinMarker = L.marker(
    CITY_CENTER,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  setAddressInputValue(CITY_CENTER.lat, CITY_CENTER.lng);

  mainPinMarker.on('move', (evt) => {
    setAddressInputValue(evt.target.getLatLng().lat.toFixed(5), evt.target.getLatLng().lng.toFixed(5));
  });
};

export { setCoordinatesMap, initMap, addMarkersGroup, removeMarkerGroup };

