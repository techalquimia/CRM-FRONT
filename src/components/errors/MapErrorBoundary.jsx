import ErrorBoundary from "../ErrorBoundary.jsx";

/**
 * Specialized Error Boundary for map components
 * Provides map-specific error handling and recovery
 */
const MapErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      context="Map Component"
      title="Error al cargar el mapa"
      message="No se pudo cargar el mapa. Esto puede deberse a problemas de conexión o configuración de la API de Google Maps."
      allowRetry={true}
      showDetails={import.meta.env.DEV}
    >
      {children}
    </ErrorBoundary>
  );
};

export default MapErrorBoundary;
