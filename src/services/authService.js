import axiosInstance from './api.js';



export const authService = {
  register: (formData) => axiosInstance.post('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  getProfile: () => axiosInstance.get('/auth/profile'),
  updateProfile: (formData) => axiosInstance.put('/auth/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  changePassword: (data) => axiosInstance.put('/auth/change-password', data),
  forgotPassword: (email) => axiosInstance.post('/auth/forgot-password', { email }),
  resetPassword: (data) => axiosInstance.post('/auth/reset-password', data),
  logout: () => axiosInstance.post('/auth/logout'),
};

export default authService;