import axiosInstance from "./api";

/**
 * Service pour les paramètres de pages (images d'en-tête par page)
 * Utilisé par le frontend public pour afficher l'image de bannière selon la page.
 */
export const pageSettingsService = {
  getAll: () => axiosInstance.get("/page-settings"),
  getBySlug: (slug) => axiosInstance.get(`/page-settings/${slug}`),
};

export default pageSettingsService;
