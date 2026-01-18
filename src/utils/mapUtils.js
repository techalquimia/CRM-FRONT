/**
 * Utility functions for Google Maps
 */

/**
 * Creates a truck icon SVG for map markers
 * @returns {string} SVG string
 */
export const createTruckIconSVG = () => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <!-- Cabina del tráiler -->
      <rect x="8" y="20" width="16" height="16" fill="#2F6FED" rx="2"/>
      <!-- Ventana -->
      <rect x="10" y="22" width="12" height="8" fill="#87CEEB" rx="1"/>
      <!-- Remolque -->
      <rect x="24" y="22" width="16" height="14" fill="#4169E1" rx="2"/>
      <!-- Ruedas -->
      <circle cx="14" cy="38" r="4" fill="#333"/>
      <circle cx="14" cy="38" r="2" fill="#666"/>
      <circle cx="32" cy="38" r="4" fill="#333"/>
      <circle cx="32" cy="38" r="2" fill="#666"/>
      <circle cx="40" cy="38" r="4" fill="#333"/>
      <circle cx="40" cy="38" r="2" fill="#666"/>
      <!-- Conexión entre cabina y remolque -->
      <rect x="22" y="26" width="2" height="6" fill="#2F6FED"/>
    </svg>
  `;
};

/**
 * Creates a Google Maps icon object from SVG
 * @param {Object} config - Icon configuration
 * @param {number} config.size - Icon size
 * @param {number} config.anchorX - Anchor X position
 * @param {number} config.anchorY - Anchor Y position
 * @returns {Object} Google Maps icon object
 */
export const createTruckIcon = ({ size = 48, anchorX = 24, anchorY = 48 } = {}) => {
  const svgIcon = createTruckIconSVG();
  const iconUrl = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgIcon);

  if (typeof window !== "undefined" && window.google?.maps) {
    return {
      url: iconUrl,
      scaledSize: new window.google.maps.Size(size, size),
      anchor: new window.google.maps.Point(anchorX, anchorY),
    };
  }

  return {
    url: iconUrl,
    scaledSize: { width: size, height: size },
    anchor: { x: anchorX, y: anchorY },
  };
};

/**
 * Calculates the center point from an array of positions
 * @param {Array} positions - Array of {lat, lng} objects
 * @returns {{lat: number, lng: number}} Center position
 */
export const calculateMapCenter = (positions) => {
  if (!positions || positions.length === 0) {
    return { lat: 0, lng: 0 };
  }

  const sum = positions.reduce(
    (acc, pos) => ({
      lat: acc.lat + pos.lat,
      lng: acc.lng + pos.lng,
    }),
    { lat: 0, lng: 0 }
  );

  return {
    lat: sum.lat / positions.length,
    lng: sum.lng / positions.length,
  };
};

