// import axiosInstance from "./api"

// // Service pour les discussions
// export const discussionService = {
//   getAll: () => axiosInstance.get("/discussions"),
//   getById: (id) => axiosInstance.get(`/discussions/${id}`),
//     getByTheme: (themeId) => axiosInstance.get(`/discussions/theme/${themeId}`),
//     //   /theme/:id/with-comments
//     getByThemeWithComments: (themeId) => axiosInstance.get(`/discussions/theme/${themeId}/with-comments`),
//   create: (data) => axiosInstance.post("/discussions", data),
//   update: (id, data) => axiosInstance.put(`/discussions/${id}`, data),
//   delete: (id) => axiosInstance.delete(`/discussions/${id}`),

//   // Commentaires
//   getComments: (discussionId) => axiosInstance.get(`/discussions/${discussionId}/comments`),
//   addComment: (discussionId, data) => axiosInstance.post(`/discussions/${discussionId}/comments`, data),
//   updateComment: (discussionId, commentId, data) =>
//     axiosInstance.put(`/discussions/${discussionId}/comments/${commentId}`, data),
//   deleteComment: (discussionId, commentId) =>
//     axiosInstance.delete(`/discussions/${discussionId}/comments/${commentId}`),
// }

// export default discussionService

import axiosInstance from "./api"

const discussionService = {
  // Get all discussions with optional filters
  getAll: (params = {}) => axiosInstance.get("/discussions", { params }),

  // Get discussion by ID
  getById: (id) => axiosInstance.get(`/discussions/${id}`),

  // Create new discussion
  create: (data) => axiosInstance.post("/discussions", data),

  // Update discussion
  update: (id, data) => axiosInstance.put(`/discussions/${id}`, data),

  // Delete discussion
  delete: (id) => axiosInstance.delete(`/discussions/${id}`),

  // Toggle sticky status
  toggleSticky: (id) => axiosInstance.patch(`/discussions/${id}/sticky`),

  // Toggle lock status
  toggleLock: (id) => axiosInstance.patch(`/discussions/${id}/lock`),

  // Get comments for a discussion
  getComments: (id, params = {}) => axiosInstance.get(`/discussions/${id}/comments`, { params }),

  // Add comment to discussion
  addComment: (id, data) => axiosInstance.post(`/discussions/${id}/comments`, data),

  getByTheme: (themeId) => axiosInstance.get(`/discussions/theme/${themeId}`),
  
  getByThemeWithComments: (themeId) => axiosInstance.get(`/discussions/theme/${themeId}/with-comments`),

}

export default discussionService

