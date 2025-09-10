import axiosInstance from "./api"

// Service pour la gestion organisationnelle
const aboutUsService = {
  // About Us
  getAboutUs: () => axiosInstance.get("/about-us"),
  updateAboutUs: (id, formData) =>
    axiosInstance.put(`/about-us/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

}

export default aboutUsService
