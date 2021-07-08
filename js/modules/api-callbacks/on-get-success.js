import {setActivateFormState} from '../set-form-state.js';
import {addMarkersGroup} from '../map/map.js';
import {filterAdverts} from '../filter/filter.js';

const filtersForm = document.querySelector('.map__filters');

const onGetSuccess = (res) => {
  addMarkersGroup(filterAdverts(res));
  setActivateFormState(filtersForm);
};

export {onGetSuccess};
