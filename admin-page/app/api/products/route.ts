import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_APP_PROJECTALPHA_CATALOG_API}`;
const API_BASE_URL_RESTAURANT = `${process.env.NEXT_PUBLIC_APP_PROJECTALPHA_RESTAURANT_API}`;
const Restaurant_ID = `3fa85f64-5717-4562-b3fc-2c963f66afa6`;
const ID = `f2b86c70-6cde-4f0f-9f96-5206f4d8f1a9`;

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchGetCatalog = async () => {
    const response = await apiService.get(`/api/${Restaurant_ID}/catalog/${ID}`);
    console.log(API_BASE_URL_RESTAURANT);
    return response.data;
};

export const fetchChangeCatalog = async () => {
  const response = await apiService.get(`/api/${Restaurant_ID}/catalog/${ID}`);
  return response.data;
};

export const addDishOrItem = async (payload: any) => {
  const response = await apiService.patch(`/api/${Restaurant_ID}/catalog/${ID}`, payload, {
    headers: {
      'Content-Type': 'application/json-patch+json'
    }
  });
  return response.data;
};

export const deleteDishOrItem = async (payload: any) => {
  const response = await apiService.patch(`/api/${Restaurant_ID}/catalog/${ID}`, payload, {
    headers: {
      'Content-Type': 'application/json-patch+json'
    }
  });
  return response.data;
};