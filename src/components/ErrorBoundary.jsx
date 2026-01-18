import { Component } from "react";
import PropTypes from "prop-types";
import { logger } from "../utils/logger.js";
import styles from "./ErrorBoundary.module.css";

/**
 * Error Boundary component to catch React errors
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @param {boolean} props.showDetails - Show error details in development
 * @param {Function} props.onError - Optional callback when error occurs
 * @param {string} props.fallback - Optional custom fallback component
 * @param {string} props.context - Optional context name for better error tracking
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Generate unique error ID for tracking
    const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return { 
      hasError: true, 
      error,
      errorId
    };
  }

  componentDidCatch(error, errorInfo) {
    // Store error info for display
    this.setState({ errorInfo });

    // Log error with context
    const context = this.props.context || "Application";
    logger.error(
      "Error capturado por ErrorBoundary",
      {
        error: error.toString(),
        errorId: this.state.errorId,
        componentStack: errorInfo.componentStack,
        errorStack: error.stack,
        timestamp: new Date().toISOString(),
      },
      context
    );

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo, this.state.errorId);
    }

    // In production, you could send to error tracking service here
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorId: null
    });
    
    // Navigate to home or use provided reset handler
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.href = "/";
    }
  };

  handleRetry = () => {
    // Reset state to allow retry
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      // Default error UI
      const isDevelopment = import.meta.env.DEV;
      const showDetails = this.props.showDetails || isDevelopment;

      return (
        <div className={styles.container}>
          <div className={styles.errorCard}>
            <h1 className={styles.title}>
              {this.props.title || "Algo salió mal"}
            </h1>
            <p className={styles.message}>
              {this.props.message || "Ha ocurrido un error inesperado. Por favor, intenta recargar la página."}
            </p>
            
            {this.state.errorId && (
              <p className={styles.errorId}>
                ID de error: <code>{this.state.errorId}</code>
              </p>
            )}

            <div className={styles.actions}>
              {this.props.onReset !== undefined ? (
                <button
                  className={styles.primaryButton}
                  onClick={this.handleReset}
                  type="button"
                >
                  {this.props.resetLabel || "Volver al inicio"}
                </button>
              ) : (
                <button
                  className={styles.primaryButton}
                  onClick={this.handleReset}
                  type="button"
                >
                  Volver al inicio
                </button>
              )}
              
              {this.props.allowRetry && (
                <button
                  className={styles.ghostButton}
                  onClick={this.handleRetry}
                  type="button"
                >
                  Intentar de nuevo
                </button>
              )}
              
              <button
                className={styles.ghostButton}
                onClick={() => window.location.reload()}
                type="button"
              >
                Recargar página
              </button>
            </div>

            {showDetails && this.state.error && (
              <details className={styles.details}>
                <summary className={styles.summary}>
                  Detalles del error
                </summary>
                <div className={styles.errorContent}>
                  <div className={styles.errorSection}>
                    <strong>Error:</strong>
                    <pre className={styles.pre}>
                      {this.state.error.toString()}
                    </pre>
                  </div>
                  {this.state.error.stack && (
                    <div className={styles.errorSection}>
                      <strong>Stack Trace:</strong>
                      <pre className={styles.pre}>
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}
                  {this.state.errorInfo?.componentStack && (
                    <div className={styles.errorSection}>
                      <strong>Component Stack:</strong>
                      <pre className={styles.pre}>
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
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
  onError: PropTypes.func,
  onReset: PropTypes.func,
  fallback: PropTypes.func,
  context: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  resetLabel: PropTypes.string,
  allowRetry: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
  showDetails: false,
  allowRetry: false,
};

export default ErrorBoundary;

