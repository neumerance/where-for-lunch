import { createActions } from 'redux-actions';
import * as placeActionTypes from './placeActionTypes';

const actionTypes = createActions({
  fetching: () => ({ fetching: true }),
  setPlaces: places => ({ places }),
}, ...Object.values(placeActionTypes));
export default actionTypes;
