/**
 * Logger Utility - Console logging conditionnel pour la production
 * N'affiche les logs que en mode développement
 */

const isDev = __DEV__;

export const logger = {
  log: (...args) => {
    if (isDev) console.log(...args);
  },

  warn: (...args) => {
    if (isDev) console.warn(...args);
  },

  error: (...args) => {
    // Les erreurs sont toujours loggées (utile pour le debugging en prod)
    console.error(...args);
  },

  info: (...args) => {
    if (isDev) console.info(...args);
  },

  debug: (...args) => {
    if (isDev) console.debug(...args);
  },
};

export default logger;
