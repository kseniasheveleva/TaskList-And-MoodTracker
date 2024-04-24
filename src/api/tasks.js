import { API_URLS } from "../constants/api-urls";
import { apiService } from "../services/Api";

export const createTaskApi = (userId, categoryId, data) => {
  return apiService.post(`${userId}/${API_URLS.categories}/${categoryId}/${API_URLS.tasks}`, data);
};

export const getTaskApi = (userId, categoryId) => {
  return apiService.get(`${userId}/${API_URLS.categories}/${categoryId}/${API_URLS.tasks}`);
};

export const deleteTaskApi = (userId, categoryId, taskId) => {
  return apiService.delete(`${userId}/${API_URLS.categories}/${categoryId}/${API_URLS.tasks}/${taskId}`);
};