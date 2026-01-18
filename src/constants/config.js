/**
 * Application configuration constants
 * Centralized configuration for better maintainability
 */
export const CONFIG = {
  GOOGLE_MAPS: {
    API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    DEFAULT_CENTER: {
      lat: 19.4530,
      lng: -99.1293,
    },
    DEFAULT_ZOOM: 12,
    DETAIL_ZOOM: 15,
    MAP_OPTIONS: {
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
    },
    DETAIL_MAP_OPTIONS: {
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: false,
      fullscreenControl: true,
    },
  },
  STORAGE: {
    AUTH_KEY: "isAuthenticated",
  },
  TRUCK_ICON: {
    SIZE: 48,
    ANCHOR_X: 24,
    ANCHOR_Y: 48,
  },
};

