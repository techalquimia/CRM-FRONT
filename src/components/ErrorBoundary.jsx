import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ErrorBoundary.module.css";

/**
 * Error Boundary component to catch React errors
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.errorCard}>
            <h1 className={styles.title}>
              Algo salió mal
            </h1>
            <p className={styles.message}>
              Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
            </p>
            <div className={styles.actions}>
              <button
                className={styles.primaryButton}
                onClick={this.handleReset}
                type="button"
              >
                Volver al inicio
              </button>
              <button
                className={styles.ghostButton}
                onClick={() => window.location.reload()}
                type="button"
              >
                Recargar página
              </button>
            </div>
            {this.props.showDetails && this.state.error && (
              <details className={styles.details}>
                <summary className={styles.summary}>
                  Detalles del error
                </summary>
                <pre className={styles.pre}>
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  showDetails: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
  showDetails: false,
};

export default ErrorBoundary;

