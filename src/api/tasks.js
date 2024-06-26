import { API_URLS } from "../constants/api-urls";
import { apiService } from "../services/Api";

export const createTaskApi = (userId, data) => {
  return apiService.post(`${userId}/${API_URLS.tasks}`, data);
};

export const getTaskApi = (userId) => {
  return apiService.get(`${userId}/${API_URLS.tasks}`);
};

export const getTaskByIdApi = (userId, taskId) => {
  return apiService.get(`${userId}/${API_URLS.tasks}/${taskId}`);
};

export const deleteTaskApi = (userId, taskId) => {
  return apiService.delete(`${userId}/${API_URLS.tasks}/${taskId}`);
};

export const deleteAllTasksApi = (userId) => {
  return apiService.delete(`${userId}/${API_URLS.tasks}`);
};

export const updateTaskApi = (userId, taskId, data) => {
  return apiService.patch(`${userId}/${API_URLS.tasks}/${taskId}`, data);
}