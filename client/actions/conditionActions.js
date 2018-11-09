import { createActions } from 'redux-actions';
import * as conditionActionTypes from './conditionActionTypes';

export const actionTypes = createActions({
  setCuisines: cuisines => ({ cuisines }),
  setRadius: radius => ({ radius }),
}, ...Object.values(conditionActionTypes));
export default actionTypes;
