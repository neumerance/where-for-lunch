import { createActions } from 'redux-actions';
import * as conditionActionTypes from './conditionActionTypes';

export const actionTypes = createActions({
  setCuisines: cuisines => ({ cuisines }),
  setRadius: radius => ({ radius }),
  setLatLang: latLang => ({ ...latLang }),
}, ...Object.values(conditionActionTypes));
export default actionTypes;
