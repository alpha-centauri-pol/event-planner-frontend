import axios from "axios";
import { API_BASE_URL } from "../config/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("user_id");
      if (userId) {
        config.headers["Authorization"] = `Bearer ${userId}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const fetchProfile = () =>
  api.get("/users/me/profile", { withCredentials: true });
export const fetchEvents = () => api.get("/events/", { withCredentials: true });
export const fetchAllInterests = () =>
  api.get("/interests/", { withCredentials: true });
export const fetchUserInterests = () =>
  api.get("/interests/me", { withCredentials: true });
export const saveUserInterests = (interestIds: string[]) =>
  api.put("/interests/me", { interest_ids: interestIds });
export const createCustomInterest = (name: string) =>
  api.post("/interests/me/custom", { name });
export const deleteCustomInterest = (customId: string) =>
  api.delete(`/interests/me/custom/${customId}`);
export const syncInterests = () => api.post("/interests/sync");
export const logoutUser = () =>
  api.post("/auth/google/logout", null, { params: { revoke: "True" } });

export default api;
