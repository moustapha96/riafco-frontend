import axiosInstance from "./api";



const campaignsService = {
  getAll: () => axiosInstance.get('/campaigns'),
  getById: (id) => axiosInstance.get(`/campaigns/${id}`),
  create: (formData) => axiosInstance.post('/campaigns', formData),
  update: (id, formData) => axiosInstance.put(`/campaigns/${id}`, formData),
  delete: (id) => axiosInstance.delete(`/campaigns/${id}`),
};

export default campaignsService;