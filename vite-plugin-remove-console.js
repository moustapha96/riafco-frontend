/**
 * Plugin Vite personnalisé pour supprimer les console
 * Complémentaire à la configuration Terser
 */

export default function removeConsole() {
  return {
    name: 'remove-console',
    enforce: 'post',
    transform(code, id) {
      // Ne traiter que les fichiers JavaScript/TypeScript
      if (!id.match(/\.(js|jsx|ts|tsx)$/)) {
        return null;
      }

      // Ne pas traiter les node_modules
      if (id.includes('node_modules')) {
        return null;
      }

      // En production uniquement
      if (process.env.NODE_ENV !== 'production') {
        return null;
      }

      // Supprimer tous les types de console
      const consolePatterns = [
        /console\.log\([^)]*\);?/g,
        /console\.info\([^)]*\);?/g,
        /console\.warn\([^)]*\);?/g,
        /console\.error\([^)]*\);?/g,
        /console\.debug\([^)]*\);?/g,
        /console\.trace\([^)]*\);?/g,
        /console\.table\([^)]*\);?/g,
        /console\.group\([^)]*\);?/g,
        /console\.groupCollapsed\([^)]*\);?/g,
        /console\.groupEnd\([^)]*\);?/g,
        /console\.time\([^)]*\);?/g,
        /console\.timeEnd\([^)]*\);?/g,
        /console\.timeLog\([^)]*\);?/g,
        /console\.count\([^)]*\);?/g,
        /console\.countReset\([^)]*\);?/g,
        /console\.assert\([^)]*\);?/g,
        /console\.clear\([^)]*\);?/g,
        /console\.dir\([^)]*\);?/g,
        /console\.dirxml\([^)]*\);?/g,
        /console\.profile\([^)]*\);?/g,
        /console\.profileEnd\([^)]*\);?/g,
      ];

      let modifiedCode = code;
      consolePatterns.forEach((pattern) => {
        modifiedCode = modifiedCode.replace(pattern, '');
      });

      // Supprimer les lignes vides multiples
      modifiedCode = modifiedCode.replace(/\n\s*\n\s*\n/g, '\n\n');

      return modifiedCode !== code ? { code: modifiedCode, map: null } : null;
    },
  };
}

