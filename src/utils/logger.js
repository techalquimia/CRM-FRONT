/**
 * Logger utility for conditional logging
 * Only logs in development mode
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  error: (message, ...args) => {
    if (isDevelopment) {
      console.error(`[ERROR] ${message}`, ...args);
    }
    // En producción, aquí podrías enviar a un servicio de logging
    // ej: Sentry, LogRocket, etc.
  },
  warn: (message, ...args) => {
    if (isDevelopment) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  info: (message, ...args) => {
    if (isDevelopment) {
      console.info(`[INFO] ${message}`, ...args);
    }
  },
  log: (message, ...args) => {
    if (isDevelopment) {
      console.log(`[LOG] ${message}`, ...args);
    }
  },
};

