import { Component } from "react";
import PropTypes from "prop-types";

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
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg)",
            padding: "20px",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              background: "var(--surface)",
              borderRadius: "var(--radius)",
              padding: "40px",
              boxShadow: "var(--shadow)",
              textAlign: "center",
            }}
          >
            <h1 style={{ margin: "0 0 16px 0", color: "var(--danger)" }}>
              Algo salió mal
            </h1>
            <p style={{ margin: "0 0 24px 0", color: "var(--muted)" }}>
              Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                className="primary-button"
                onClick={this.handleReset}
                type="button"
              >
                Volver al inicio
              </button>
              <button
                className="ghost-button"
                onClick={() => window.location.reload()}
                type="button"
              >
                Recargar página
              </button>
            </div>
            {this.props.showDetails && this.state.error && (
              <details
                style={{
                  marginTop: "24px",
                  padding: "16px",
                  background: "#f5f5f5",
                  borderRadius: "8px",
                  textAlign: "left",
                  fontSize: "0.85rem",
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>
                  Detalles del error
                </summary>
                <pre
                  style={{
                    marginTop: "12px",
                    overflow: "auto",
                    fontSize: "0.75rem",
                  }}
                >
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

