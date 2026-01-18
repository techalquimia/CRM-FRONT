import { useMemo, useCallback, useState } from "react";
import { CONFIG } from "../constants/config.js";
import { createTruckIcon } from "../utils/mapUtils.js";

/**
 * Custom hook for Google Maps configuration and state management
 * Centralizes all Google Maps related logic
 */
export const useGoogleMaps = (options = {}) => {
  const { mapType = "default" } = options;
  const apiKey = CONFIG.GOOGLE_MAPS.API_KEY;
  const [mapError, setMapError] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const isApiKeyValid = useMemo(() => {
    return apiKey && apiKey !== "" && apiKey !== "YOUR_API_KEY_HERE";
  }, [apiKey]);

  const getApiKeyErrorMessage = useCallback(() => {
    if (!isApiKeyValid) {
      return "Configura tu API Key de Google Maps. Crea un archivo .env con: VITE_GOOGLE_MAPS_API_KEY=tu_api_key";
    }
    return null;
  }, [isApiKeyValid]);

  const mapOptions = useMemo(() => {
    return mapType === "detail"
      ? CONFIG.GOOGLE_MAPS.DETAIL_MAP_OPTIONS
      : CONFIG.GOOGLE_MAPS.MAP_OPTIONS;
  }, [mapType]);

  const truckIcon = useMemo(
    () =>
      createTruckIcon({
        size: CONFIG.TRUCK_ICON.SIZE,
        anchorX: CONFIG.TRUCK_ICON.ANCHOR_X,
        anchorY: CONFIG.TRUCK_ICON.ANCHOR_Y,
      }),
    []
  );

  const handleLoadError = useCallback(() => {
    setMapError("Error al cargar Google Maps. Verifica la configuración de tu API key.");
    setIsMapLoading(false);
  }, []);

  const handleScriptLoad = useCallback(() => {
    setIsMapLoading(false);
  }, []);

  const handleMapLoad = useCallback((map, config = {}) => {
    const { center, zoom, fitBounds } = config;

    if (fitBounds && fitBounds.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      fitBounds.forEach((position) => {
        bounds.extend(position);
      });
      map.fitBounds(bounds);
    } else if (center) {
      map.setCenter(center);
    }

    if (zoom) {
      map.setZoom(zoom);
    }

    setIsMapLoading(false);
  }, []);

  const resetError = useCallback(() => {
    setMapError(null);
  }, []);

  return {
    // Configuration
    apiKey,
    isApiKeyValid,
    mapOptions,
    truckIcon,

    // State
    mapError,
    isMapLoading,
    setIsMapLoading,

    // Handlers
    handleLoadError,
    handleScriptLoad,
    handleMapLoad,
    resetError,

    // Utilities
    getApiKeyErrorMessage,
  };
};

