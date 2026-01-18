/**
 * Test setup file
 * Configures testing environment for Vitest
 */
import "@testing-library/jest-dom";

// Mock window.google.maps for Google Maps components
global.window.google = {
  maps: {
    LatLngBounds: class {
      extend() {}
      getCenter() {
        return { lat: () => 0, lng: () => 0 };
      }
      getNorthEast() {
        return { lat: () => 0, lng: () => 0 };
      }
      getSouthWest() {
        return { lat: () => 0, lng: () => 0 };
      }
    },
    Map: class {},
    Marker: class {},
    InfoWindow: class {},
  },
};

