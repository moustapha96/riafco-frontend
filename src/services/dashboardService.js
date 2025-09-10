import axiosInstance from "./api";

// Service pour le tableau de bord
export const dashboardService = {
  getStats: () => axiosInstance.get('/dashboard/stats'),
  getRecentActivities: () => axiosInstance.get('/dashboard/recent-activities'),
  getNotifications: () => axiosInstance.get('/dashboard/notifications'),
  getAuditLogs: () => axiosInstance.get('/dashboard/audit-logs'),
};

export default dashboardService;