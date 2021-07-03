import { enablePageForm, setAddressInputValue } from './form.js';
import { createSimilarAdvertPopup } from './popup.js';

const map = L.map('map-canvas');

const TOKYO_COORDINATES = {
  lat: '35.67500',
  lng: '139.75000',
};

const renderMap = () => {
  map
    .on('load', () => {
      setAddressInputValue(TOKYO_COORDINATES.lat, TOKYO_COORDINATES.lng);
      enablePageForm();
    })
    .setView(TOKYO_COORDINATES, 12);
};

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

const setCoordinatesMap = () => {
  mainPinMarker.setLatLng(TOKYO_COORDINATES);
  map.setView(TOKYO_COORDINATES, 12);
};

mainPinMarker.on('moveend', (evt) => {
  setAddressInputValue(evt.target.getLatLng().lat.toFixed(5), evt.target.getLatLng().lng.toFixed(5));
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

const createSimilarAdvert = (adverts) => {
  adverts.forEach((el) => createMarker(el));
};

export { createSimilarAdvert, renderMap, TOKYO_COORDINATES, setCoordinatesMap};
