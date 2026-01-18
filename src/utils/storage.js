/**
 * Storage utility functions
 * Abstraction layer for localStorage operations
 */
import { logger } from "./logger.js";

const STORAGE_KEYS = {
  AUTH: "isAuthenticated",
};

/**
 * Gets a value from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Stored value or default
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    logger.error(`Error reading from localStorage: ${error.message}`, error);
    return defaultValue;
  }
};

/**
 * Sets a value in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logger.error(`Error writing to localStorage: ${error.message}`, error);
  }
};

/**
 * Removes a value from localStorage
 * @param {string} key - Storage key
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    logger.error(`Error removing from localStorage: ${error.message}`, error);
  }
};

/**
 * Auth-specific storage helpers
 */
export const authStorage = {
  get: () => getStorageItem(STORAGE_KEYS.AUTH, false),
  set: (value) => setStorageItem(STORAGE_KEYS.AUTH, value),
  remove: () => removeStorageItem(STORAGE_KEYS.AUTH),
};

