import axios from "axios";
const urlApi = import.meta.env.VITE_API_URL;


const axiosInstance = axios.create({
  baseURL: urlApi,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, 
});

// Routes qui nécessitent une authentification (seulement pour les fonctionnalités admin)
// Toutes les autres routes sont publiques par défaut
const protectedRoutes = [
  '/admin',
  '/auth/me',
  '/auth/profile',
];

axiosInstance.interceptors.request.use(
  (config) => {
    // Ajoute le token s'il existe (pour les fonctionnalités optionnelles)
    // Mais ne bloque pas les requêtes si le token n'existe pas
    // Toutes les pages sont accessibles sans authentification
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
  
    if (error.response?.status === 401) {
      const isProtectedRoute = protectedRoutes.some((route) =>
        error.config.url?.startsWith(route)
      );

      // Seulement rediriger si c'est une route protégée
      // Toutes les autres routes sont publiques et accessibles sans authentification
      if (isProtectedRoute) {
        localStorage.removeItem('token');
        window.location.href = '/auth-login';
      }
      // Pour les autres routes (publiques), on laisse passer l'erreur sans redirection
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosInstance;