import ErrorBoundary from "../ErrorBoundary.jsx";

/**
 * Specialized Error Boundary for evidence components
 * Provides evidence-specific error handling
 */
const EvidenceErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      context="Evidence Component"
      title="Error al cargar evidencias"
      message="No se pudieron cargar las evidencias. Por favor, intenta recargar la página o vuelve más tarde."
      allowRetry={true}
      showDetails={import.meta.env.DEV}
    >
      {children}
    </ErrorBoundary>
  );
};

export default EvidenceErrorBoundary;
