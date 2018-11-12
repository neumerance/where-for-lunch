import axios from 'axios';
import { PLACES_API_PATH } from '../constants/apiPaths';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common = {
  Accept: 'application/json, application/xml, text/play, text/html, *.*',
  'Content-Type': 'application/json',
};

export const searchPlaces = (conditions) => {
  const params = {};
  params.latitude = conditions.latitude;
  params.longitude = conditions.longitude;
  params.radius = conditions.radius;
  const categories = [];
  conditions.cuisines.forEach((cuisine) => {
    if (cuisine.selected) {
      categories.push(cuisine.label.toLowerCase());
    }
  });
  if (categories.length) { params.categories = categories.join(', '); }
  return axios.get(`${PLACES_API_PATH}/`, {
    params,
  }).then(({ data }) => data);
};

export const getPlaceIds = (params) => {
  return axios.get(`${PLACES_API_PATH}/`, {
    params,
  }).then(({ data }) => data);
};

export const getPlaceDetails = (id) => {
  return axios.get(`${PLACES_API_PATH}/${id}`).then(({ data }) => data);
};
