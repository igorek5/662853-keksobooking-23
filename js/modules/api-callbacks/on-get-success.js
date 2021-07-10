import { setActivateFormState } from '../set-form-state.js';
import { addMarkersGroup } from '../map/map.js';
import { setFilterFormChange, setResRanking } from '../filter/filter.js';

const filtersForm = document.querySelector('.map__filters');

const onGetSuccess = (res) => {
  const rankingRes = setResRanking(res);
  addMarkersGroup(rankingRes);
  setActivateFormState(filtersForm);
  setFilterFormChange(() => addMarkersGroup(rankingRes));
};

export { onGetSuccess };
