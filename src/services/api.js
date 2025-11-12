import axios from "axios";
import { getCSRFToken, setCSRFToken, sanitizeData } from "../utils/security";

const urlApi = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: urlApi,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Protection CSRF basique
  },
  timeout: 10000, 
});

const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/news',
  '/notre-équipe',
  '/partners',
];

axiosInstance.interceptors.request.use(
  (config) => {
    // Vérifie si la route est publique
    const isPublicRoute = publicRoutes.some((route) =>
      config.url?.startsWith(route)
    );
    
    // Si ce n'est pas une route publique, ajoute le token
    if (!isPublicRoute) {
      // Essayer d'abord les cookies (plus sécurisé)
      // Si pas disponible, utiliser sessionStorage comme fallback
      let token = null;
      
      try {
        // Les cookies sont gérés automatiquement par le navigateur avec withCredentials: true
        // Pour localStorage, on garde comme fallback mais ce n'est pas recommandé
        token = localStorage.getItem('token');
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
      }
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    // Ajouter le token CSRF pour les requêtes non-GET
    if (config.method && config.method.toLowerCase() !== 'get') {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
    }
    
    // Nettoyer les données sensibles avant l'envoi
    if (config.data && typeof config.data === 'object') {
      config.data = sanitizeData(config.data);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Extraire le token CSRF de la réponse si présent
    const csrfToken = response.headers['x-csrf-token'];
    if (csrfToken) {
      setCSRFToken(csrfToken);
    }
    
    return response.data;
  },
  (error) => {
    // Gestion des erreurs de sécurité
    if (error.response?.status === 401) {
      const isPublicRoute = publicRoutes.some((route) =>
        error.config?.url?.startsWith(route)
      );

      if (!isPublicRoute) {
        // Nettoyer toutes les données d'authentification
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          sessionStorage.clear();
          
          // Rediriger vers la page de connexion
          if (window.location.pathname !== '/auth-login') {
            window.location.href = '/auth-login';
          }
        } catch (cleanupError) {
          console.error('Erreur lors du nettoyage:', cleanupError);
        }
      }
    }
    
    // Protection contre les attaques CSRF
    if (error.response?.status === 403 && error.response?.data?.message?.includes('CSRF')) {
      console.error('Erreur CSRF détectée. Veuillez rafraîchir la page.');
      // Optionnel: recharger la page pour obtenir un nouveau token CSRF
      // window.location.reload();
    }
    
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosInstance;
