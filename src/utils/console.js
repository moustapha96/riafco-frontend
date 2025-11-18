/**
 * Utilitaire pour désactiver les console en production
 * Remplace tous les méthodes console par des fonctions vides en production
 */

const isProduction = import.meta.env.MODE === 'production' || import.meta.env.PROD;

if (isProduction) {
  // Sauvegarder les méthodes originales (optionnel, pour debugging avancé)
  const noop = () => {};
  
  // Liste de toutes les méthodes console à désactiver
  const consoleMethods = [
    'log',
    'info',
    'warn',
    'error',
    'debug',
    'trace',
    'table',
    'group',
    'groupCollapsed',
    'groupEnd',
    'time',
    'timeEnd',
    'timeLog',
    'count',
    'countReset',
    'assert',
    'clear',
    'dir',
    'dirxml',
    'profile',
    'profileEnd',
  ];

  // Désactiver toutes les méthodes console
  consoleMethods.forEach((method) => {
    try {
      console[method] = noop;
    } catch (e) {
      // Ignorer les erreurs si la méthode n'existe pas
    }
  });

  // Désactiver console lui-même (pour les accès directs)
  // Note: Cela ne fonctionne pas dans tous les navigateurs, mais c'est une couche supplémentaire
  try {
    Object.defineProperty(window, 'console', {
      value: new Proxy(console, {
        get: () => noop,
        set: () => true,
      }),
      writable: false,
      configurable: false,
    });
  } catch (e) {
    // Si la redéfinition échoue, on continue avec les méthodes individuelles
  }
}

// Export pour utilisation dans d'autres fichiers si nécessaire
export default {
  isProduction,
  // Fonction helper pour logger conditionnellement
  log: (...args) => {
    if (!isProduction) {
      console.log(...args);
    }
  },
  error: (...args) => {
    if (!isProduction) {
      console.error(...args);
    }
  },
  warn: (...args) => {
    if (!isProduction) {
      console.warn(...args);
    }
  },
};

