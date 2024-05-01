import { API_URLS } from "../constants/api-urls";
import { apiService } from "../services/Api";

export const createMoodRecordApi = ({ uid, data }) => {
  return apiService.post(`${uid}/${API_URLS.moodTracker}`, data);
};

export const getMoodRecordsApi = (uid) => {
  return apiService.get(`${uid}/${API_URLS.moodTracker}`);
};

export const deleteMoodRecordApi = (uid, recordId) => {
  return apiService.delete(`${uid}/${API_URLS.moodTracker}/${recordId}`);
};