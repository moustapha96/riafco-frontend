//


import axiosInstance from "./api"

const themeService = {
  // Get all themes with optional pagination
  getAll: (params = {}) => axiosInstance.get("/themes", { params }),

  // Get theme by ID
  getById: (id) => axiosInstance.get(`/themes/${id}`),


  
  // Create new theme
  create: (data) => axiosInstance.post("/themes", data),

  // Update theme
  update: (id, data) => axiosInstance.put(`/themes/${id}`, data),

  // Delete theme
  delete: (id) => axiosInstance.delete(`/themes/${id}`),

  // Get discussions for a theme
  getDiscussions: (id, params = {}) => axiosInstance.get(`/themes/${id}/discussions`, { params }),
}

export default themeService
