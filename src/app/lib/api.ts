import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://event-tracker-v2.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export const fetchProfile = () => api.get('/users/me/profile');
export const fetchEvents = () => api.get('/events/');
export const fetchAllInterests = () => api.get('/interests/');
export const saveUserInterests = (interestIds: string[]) => api.put('/interests/me', { interest_ids: interestIds });
export const createCustomInterest = (name: string) => api.post('/interests/me/custom', { name });
export const syncInterests = () => api.post('/interests/sync');

export const logoutUser = () => api.post(
  '/auth/logout', 
  null,
  { params: { revoke: 'True' } }
);

export default api;