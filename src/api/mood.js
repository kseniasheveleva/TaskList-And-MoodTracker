import { API_URLS } from "../constants/api-urls";
import { apiService } from "../services/Api";

export const createMoodTrackerApi = ({ uid, data }) => {
  return apiService.post(`${uid}/${API_URLS.moodTracker}`, data);
};

export const getMoodTrackerApi = (uid) => {
  return apiService.get(`${uid}/${API_URLS.moodTracker}`);
};

export const deleteMoodTrackerApi = (uid, categoryId) => {
  return apiService.delete(`${uid}/${API_URLS.moodTracker}/${categoryId}`);
};