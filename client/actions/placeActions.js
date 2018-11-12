import { createActions } from 'redux-actions';
import * as placeActionTypes from './placeActionTypes';

const actionTypes = createActions({
  fetching: () => ({ fetching: true }),
  setPlaces: places => ({ places }),
  setPlace: selectedPlace => ({ selectedPlace, fetching: false }),
}, ...Object.values(placeActionTypes));
export default actionTypes;
