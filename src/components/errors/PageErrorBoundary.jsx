import ErrorBoundary from "../ErrorBoundary.jsx";
import PropTypes from "prop-types";

/**
 * Specialized Error Boundary for page-level components
 * Provides page-specific error handling with navigation options
 */
const PageErrorBoundary = ({ children, pageName = "página" }) => {
  const handleReset = () => {
    window.location.href = "/dashboard";
  };

  return (
    <ErrorBoundary
      context={`Page: ${pageName}`}
      title={`Error en ${pageName}`}
      message={`Ha ocurrido un error al cargar ${pageName}. Puedes intentar recargar la página o volver al dashboard.`}
      resetLabel="Volver al Dashboard"
      onReset={handleReset}
      allowRetry={true}
      showDetails={import.meta.env.DEV}
    >
      {children}
    </ErrorBoundary>
  );
};

PageErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  pageName: PropTypes.string,
};

export default PageErrorBoundary;
