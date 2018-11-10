import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions/placeActionTypes';

const initialState = {
  places: [],
  fetching: false,
  selectedPlace: {},
};
const placeReducer = handleActions(
  {
    [actionTypes.SET_DETAILS](state, action) {
      return { ...state, ...action.payload };
    },
    [actionTypes.FETCHING](state) {
      return { ...state, fetching: true };
    },
    [actionTypes.SET_PLACES](state, action) {
      return { ...state, fetching: false, ...action.payload };
    },
    [actionTypes.SET_PLACE](state, action) {
      return { ...state, fetching: false, ...action.payload };
    },
  },
  initialState,
);

export default placeReducer;
