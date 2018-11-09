import { handleActions } from 'redux-actions';
import * as actionTypes from 'actions/conditionActionTypes';

const initialState = {
  radius: 500,
  latitude: 0,
  longitude: 0,
  cuisines: [
    {
      label: 'American',
      selected: false,
    },
    {
      label: 'Japanese',
      selected: false,
    },
    {
      label: 'Chinese',
      selected: false,
    },
    {
      label: 'Mexican',
      selected: false,
    },
    {
      label: 'Italian',
      selected: false,
    },
    {
      label: 'Thai',
      selected: false,
    },
    {
      label: 'Filipino',
      selected: false,
    },
  ],
};

const actions = {};
actions[actionTypes.SET_RADIUS] = (state, action) => {
  return { ...state, radius: action.payload };
};

actions[actionTypes.SET_CUISINE] = (state, action) => {
  console.log('triggered');
  return { ...state, cuisines: action.payload };
};

actions[actionTypes.SET_LAT_LNG] = (state, action) => {
  const { latitude, longitude } = action.payload;
  return { ...state, latitude, longitude };
};

console.log('actions', actions);

const conditionReducer = handleActions(actions, initialState);

export default conditionReducer;
