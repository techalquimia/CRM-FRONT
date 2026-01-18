import { useMemo, useCallback, useState } from "react";
import { CONFIG } from "../constants/config.js";
import { createTruckIcon } from "../utils/mapUtils.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("useGoogleMaps");

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
    const valid = apiKey && apiKey !== "" && apiKey !== "YOUR_API_KEY_HERE";
    if (!valid) {
      logger.warn("Google Maps API key is invalid or missing");
    } else {
      logger.debug("Google Maps API key validated");
    }
    return valid;
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
    const errorMessage = "Error al cargar Google Maps. Verifica la configuración de tu API key.";
    logger.error("Google Maps script load error", { mapType });
    logger.event("map_load_error", { mapType, error: "script_load_failed" });
    setMapError(errorMessage);
    setIsMapLoading(false);
  }, [mapType]);

  const handleScriptLoad = useCallback(() => {
    logger.debug("Google Maps script loaded successfully", { mapType });
    setIsMapLoading(false);
  }, [mapType]);

  const handleMapLoad = useCallback((map, config = {}) => {
    const { center, zoom, fitBounds } = config;

    logger.debug("Google Maps instance loaded", { 
      mapType, 
      hasCenter: !!center, 
      hasZoom: !!zoom, 
      fitBoundsCount: fitBounds?.length || 0 
    });

    try {
      if (fitBounds && fitBounds.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        fitBounds.forEach((position) => {
          bounds.extend(position);
        });
        map.fitBounds(bounds);
        logger.debug("Map bounds fitted", { positionsCount: fitBounds.length });
      } else if (center) {
        map.setCenter(center);
        logger.debug("Map center set", { center });
      }

      if (zoom) {
        map.setZoom(zoom);
        logger.debug("Map zoom set", { zoom });
      }

      logger.info("Google Maps initialized successfully", { mapType });
      logger.event("map_loaded", { mapType, success: true });
      setIsMapLoading(false);
    } catch (error) {
      logger.error("Error configuring Google Maps", error);
      logger.event("map_load_error", { mapType, error: "configuration_failed" });
      setIsMapLoading(false);
    }
  }, [mapType]);

  const resetError = useCallback(() => {
    logger.debug("Map error reset", { mapType });
    setMapError(null);
  }, [mapType]);

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

