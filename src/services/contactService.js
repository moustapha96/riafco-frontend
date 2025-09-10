import axiosInstance from "./api";



// Service pour les contacts
 const contactService = {
  getAll: () => axiosInstance.get('/contacts'),
  create: (data) => axiosInstance.post('/contacts', data),
  update: (id, data) => axiosInstance.put(`/contacts/${id}`, data),
  delete: (id) => axiosInstance.delete(`/contacts/${id}`),
};

export default contactService;
