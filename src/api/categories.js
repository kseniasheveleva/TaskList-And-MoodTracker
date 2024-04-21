import { API_URLS } from "../constants/api-urls";
import { apiService } from "../services/Api";

export const createCategoryApi = (userId, data) => {
  return apiService.post(`${userId}/${API_URLS.categories}`, data);
};

export const getCategoryApi = (userId) => {
  return apiService.get(`${userId}/${API_URLS.categories}`);
};

export const deleteCategoryApi = (userId, categoryId) => {
  return apiService.delete(`${userId}/${API_URLS.categories}/${categoryId}`);
};