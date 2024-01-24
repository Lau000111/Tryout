import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_APP_PROJECTALPHA_CATALOG_API}`;

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchGetCatalog = async () => {
    const response = await apiService.get('/api/catalog/beace156-eceb-4b4a-9aa3-79f872eaa27d');
    return response.data;
};

export const fetchChangeCatalog = async () => {
  const response = await apiService.get('/api/catalog/beace156-eceb-4b4a-9aa3-79f872eaa27d');
  return response.data;
};

export const AddItem = async () => {
  const response = await apiService.get('/api/catalog/beace156-eceb-4b4a-9aa3-79f872eaa27d');
  return response.data;
};