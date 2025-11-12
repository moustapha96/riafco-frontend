/**
 * Utilitaires de sécurité pour l'application RIAFCO
 * Protection contre XSS, CSRF, et autres attaques
 */

/**
 * Nettoie et valide les entrées utilisateur pour prévenir les attaques XSS
 * @param {string} input - L'entrée à nettoyer
 * @returns {string} - L'entrée nettoyée
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input;
  }
  
  // Créer un élément DOM temporaire pour échapper le HTML
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Valide une URL pour s'assurer qu'elle est sûre
 * @param {string} url - L'URL à valider
 * @returns {boolean} - True si l'URL est sûre
 */
export const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url);
    // Autoriser uniquement HTTP/HTTPS
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

/**
 * Génère un token CSRF aléatoire
 * @returns {string} - Token CSRF
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Stocke un token CSRF de manière sécurisée
 * @param {string} token - Le token à stocker
 */
export const setCSRFToken = (token) => {
  try {
    // Utiliser sessionStorage pour le token CSRF (plus sécurisé que localStorage)
    sessionStorage.setItem('csrf_token', token);
  } catch (error) {
    console.error('Erreur lors du stockage du token CSRF:', error);
  }
};

/**
 * Récupère le token CSRF
 * @returns {string|null} - Le token CSRF ou null
 */
export const getCSRFToken = () => {
  try {
    return sessionStorage.getItem('csrf_token');
  } catch (error) {
    console.error('Erreur lors de la récupération du token CSRF:', error);
    return null;
  }
};

/**
 * Valide un token CSRF
 * @param {string} token - Le token à valider
 * @returns {boolean} - True si le token est valide
 */
export const validateCSRFToken = (token) => {
  const storedToken = getCSRFToken();
  return storedToken !== null && storedToken === token;
};

/**
 * Nettoie les données sensibles de l'objet avant l'envoi
 * @param {object} data - Les données à nettoyer
 * @returns {object} - Les données nettoyées
 */
export const sanitizeData = (data) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  
  const sanitized = Array.isArray(data) ? [] : {};
  
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      
      // Ignorer les clés sensibles
      if (key.toLowerCase().includes('password') || 
          key.toLowerCase().includes('secret') ||
          key.toLowerCase().includes('token') && key !== 'csrf_token') {
        continue;
      }
      
      if (typeof value === 'string') {
        sanitized[key] = sanitizeInput(value);
      } else if (typeof value === 'object') {
        sanitized[key] = sanitizeData(value);
      } else {
        sanitized[key] = value;
      }
    }
  }
  
  return sanitized;
};

/**
 * Valide un email
 * @param {string} email - L'email à valider
 * @returns {boolean} - True si l'email est valide
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Valide un mot de passe (force minimale)
 * @param {string} password - Le mot de passe à valider
 * @returns {object} - { valid: boolean, errors: string[] }
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password || password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Rate limiting simple côté client (pour compléter la protection serveur)
 */
const rateLimitStore = new Map();

/**
 * Vérifie si une action est autorisée selon le rate limiting
 * @param {string} key - Clé unique pour l'action
 * @param {number} maxAttempts - Nombre maximum de tentatives
 * @param {number} windowMs - Fenêtre de temps en millisecondes
 * @returns {boolean} - True si l'action est autorisée
 */
export const checkRateLimit = (key, maxAttempts = 5, windowMs = 60000) => {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxAttempts) {
    return false;
  }
  
  record.count++;
  return true;
};

/**
 * Nettoie le store de rate limiting (à appeler périodiquement)
 */
export const cleanRateLimitStore = () => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
};

// Nettoyer le store toutes les 5 minutes
setInterval(cleanRateLimitStore, 5 * 60 * 1000);

/**
 * Protection contre les attaques de timing
 * Utilise un délai constant pour éviter les attaques par analyse de timing
 * @param {Promise} promise - La promesse à exécuter
 * @param {number} minDelay - Délai minimum en ms
 * @returns {Promise} - La promesse avec délai constant
 */
export const constantTimeDelay = async (promise, minDelay = 100) => {
  const start = Date.now();
  const result = await promise;
  const elapsed = Date.now() - start;
  
  if (elapsed < minDelay) {
    await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
  }
  
  return result;
};

/**
 * Hash simple pour les données sensibles (ne pas utiliser pour les mots de passe)
 * @param {string} data - Les données à hasher
 * @returns {Promise<string>} - Le hash
 */
export const simpleHash = async (data) => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};


