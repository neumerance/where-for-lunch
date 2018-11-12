import axios from 'axios';

const YELP_API_URL = 'https://api.yelp.com/v3';

export const authedAxios = axios.create({
  baseURL: YELP_API_URL,
  headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
});

export async function searchPlaces(params) {
  try {
    const { data } = await authedAxios.get('/businesses/search', { params });
    return data.businesses;
  } catch (e) {
    console.log('search failed!', e);
  }
}

export async function getPlaceDetails(params) {
  try {
    const { data } = await authedAxios.get(`/businesses/${params.id}`, {});
    return data;
  } catch (e) {
    console.log('get business datail failed!', e);
  }
}