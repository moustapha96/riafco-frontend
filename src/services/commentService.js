// import axiosInstance from "./api";

// // Service pour les commentaires
// export const commentService = {
//   getAll: (discussionId) => axiosInstance.get(`/discussions/${discussionId}/comments`),
//   create: (discussionId, data) => axiosInstance.post(`/discussions/${discussionId}/comments`, data),
//   update: (id, data) => axiosInstance.put(`/comments/${id}`, data),
//   delete: (id) => axiosInstance.delete(`/comments/${id}`),
// };

// export default commentService;

import axiosInstance from "./api"

const commentService = {
  // Get all comments for a discussion
  getAll: (discussionId, params = {}) => axiosInstance.get(`/discussions/${discussionId}/comments`, { params }),

  // Get comment by ID
  getById: (id) => axiosInstance.get(`/comments/${id}`),

  // Create new comment
  create: (discussionId, data) => axiosInstance.post(`/discussions/${discussionId}/comments`, data),

  // Update comment
  update: (id, data) => axiosInstance.put(`/comments/${id}`, data),

  // Delete comment
  delete: (id) => axiosInstance.delete(`/comments/${id}`),

  // Reply to comment
  reply: (parentId, data) => axiosInstance.post(`/comments/${parentId}/reply`, data),
}

export default commentService

