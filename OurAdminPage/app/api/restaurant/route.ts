import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_APP_PROJECTALPHA_CATALOG_API}`;
const API_BASE_URL_RESTAURANT = `${process.env.NEXT_PUBLIC_APP_PROJECTALPHA_RESTAURANT_API}`;
const Restaurant_ID = `86581ee2-ffa9-4b56-b904-2980f5a9668c`;
const ID = `f2b86c70-6cde-4f0f-9f96-5206f4d8f1a9`;

const apiService = axios.create({
  baseURL: API_BASE_URL_RESTAURANT,
});

export const getRestaurantById = async () => {
    const response = await apiService.get(`/api/restaurant/${Restaurant_ID}`);
    return response.data;
};


export const addRestaurant = async (payload: any) => {
  const response = await apiService.post(`/api/restaurant`, payload);
  return response.data;
};