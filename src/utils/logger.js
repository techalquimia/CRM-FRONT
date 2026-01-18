/**
 * Advanced logging utility with conditional logging, levels, and context
 * Only logs in development mode by default
 * Supports integration with external logging services (Sentry, LogRocket, etc.)
 */

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Log levels
export const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4,
};

// Current log level (can be configured via env)
const currentLogLevel = isDevelopment ? LOG_LEVELS.DEBUG : LOG_LEVELS.ERROR;

/**
 * Sanitizes sensitive data from logs
 * @param {*} data - Data to sanitize
 * @returns {*} Sanitized data
 */
const sanitizeData = (data) => {
  if (!data || typeof data !== "object") {
    return data;
  }

  const sensitiveKeys = [
    "password",
    "token",
    "apiKey",
    "api_key",
    "secret",
    "authorization",
    "auth",
    "creditCard",
    "credit_card",
    "ssn",
  ];

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item));
  }

  const sanitized = { ...data };
  for (const key in sanitized) {
    const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some((sensitive) => lowerKey.includes(sensitive))) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof sanitized[key] === "object" && sanitized[key] !== null) {
      sanitized[key] = sanitizeData(sanitized[key]);
    }
  }

  return sanitized;
};

/**
 * Formats log message with timestamp and context
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {string} context - Optional context
 * @returns {string} Formatted message
 */
const formatMessage = (level, message, context = null) => {
  const timestamp = new Date().toISOString();
  const contextStr = context ? `[${context}]` : "";
  return `[${timestamp}] [${level}] ${contextStr} ${message}`;
};

/**
 * Sends log to external service (Sentry, LogRocket, etc.)
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {*} data - Additional data
 * @param {string} context - Context
 */
const sendToExternalService = (level, message, data, context) => {
  // In production, integrate with external logging service
  // Example:
  // if (isProduction && window.Sentry) {
  //   if (level === 'ERROR') {
  //     window.Sentry.captureException(new Error(message), {
  //       extra: { data, context }
  //     });
  //   } else {
  //     window.Sentry.captureMessage(message, {
  //       level: level.toLowerCase(),
  //       extra: { data, context }
  //     });
  //   }
  // }
};

/**
 * Core logging function
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {*} data - Additional data to log
 * @param {string} context - Optional context
 */
const log = (level, levelValue, message, data = null, context = null) => {
  // Check if we should log at this level
  if (levelValue < currentLogLevel) {
    return;
  }

  // Sanitize sensitive data
  const sanitizedData = data ? sanitizeData(data) : null;

  // Format message
  const formattedMessage = formatMessage(level, message, context);

  // Log to console in development
  if (isDevelopment) {
    const consoleMethod = {
      DEBUG: console.debug,
      INFO: console.info,
      WARN: console.warn,
      ERROR: console.error,
    }[level] || console.log;

    if (sanitizedData) {
      consoleMethod(formattedMessage, sanitizedData);
    } else {
      consoleMethod(formattedMessage);
    }
  }

  // Send to external service in production (for errors and warnings)
  if (isProduction && (levelValue >= LOG_LEVELS.WARN)) {
    sendToExternalService(level, message, sanitizedData, context);
  }
};

/**
 * Logger object with different log levels
 */
export const logger = {
  /**
   * Debug level - detailed information for debugging
   * @param {string} message - Log message
   * @param {*} data - Additional data
   * @param {string} context - Optional context
   */
  debug: (message, data = null, context = null) => {
    log("DEBUG", LOG_LEVELS.DEBUG, message, data, context);
  },

  /**
   * Info level - general information
   * @param {string} message - Log message
   * @param {*} data - Additional data
   * @param {string} context - Optional context
   */
  info: (message, data = null, context = null) => {
    log("INFO", LOG_LEVELS.INFO, message, data, context);
  },

  /**
   * Warn level - warnings that don't break functionality
   * @param {string} message - Log message
   * @param {*} data - Additional data
   * @param {string} context - Optional context
   */
  warn: (message, data = null, context = null) => {
    log("WARN", LOG_LEVELS.WARN, message, data, context);
  },

  /**
   * Error level - errors that need attention
   * @param {string} message - Log message
   * @param {*} data - Additional data (usually error object)
   * @param {string} context - Optional context
   */
  error: (message, data = null, context = null) => {
    log("ERROR", LOG_LEVELS.ERROR, message, data, context);
  },

  /**
   * Log level - general logging (alias for info)
   * @param {string} message - Log message
   * @param {*} data - Additional data
   * @param {string} context - Optional context
   */
  log: (message, data = null, context = null) => {
    log("INFO", LOG_LEVELS.INFO, message, data, context);
  },

  /**
   * Performance logging - measures execution time
   * @param {string} label - Performance label
   * @param {Function} fn - Function to measure
   * @param {string} context - Optional context
   * @returns {*} Function result
   */
  performance: async (label, fn, context = null) => {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      logger.debug(`Performance: ${label} took ${duration.toFixed(2)}ms`, { duration }, context);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      logger.error(`Performance error: ${label} failed after ${duration.toFixed(2)}ms`, error, context);
      throw error;
    }
  },

  /**
   * Group logs together
   * @param {string} label - Group label
   * @param {Function} fn - Function to execute within group
   */
  group: (label, fn) => {
    if (isDevelopment && console.group) {
      console.group(label);
      try {
        fn();
      } finally {
        console.groupEnd();
      }
    } else {
      fn();
    }
  },

  /**
   * Log user action/event (for analytics)
   * @param {string} action - Action name
   * @param {*} properties - Action properties
   * @param {string} context - Optional context
   */
  event: (action, properties = {}, context = null) => {
    logger.info(`Event: ${action}`, sanitizeData(properties), context || "Analytics");
  },
};

/**
 * Create a logger instance with a specific context
 * @param {string} context - Context name
 * @returns {Object} Logger instance with context
 */
export const createLogger = (context) => {
  return {
    debug: (message, data) => logger.debug(message, data, context),
    info: (message, data) => logger.info(message, data, context),
    warn: (message, data) => logger.warn(message, data, context),
    error: (message, data) => logger.error(message, data, context),
    log: (message, data) => logger.log(message, data, context),
    performance: (label, fn) => logger.performance(label, fn, context),
    event: (action, properties) => logger.event(action, properties, context),
  };
};

export default logger;
