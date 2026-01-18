import PropTypes from "prop-types";

/**
 * Reusable loading spinner component
 */
const LoadingSpinner = ({ size = "medium", message = "Cargando..." }) => {
  const sizes = {
    small: "24px",
    medium: "40px",
    large: "64px",
  };

  const spinnerSize = sizes[size] || sizes.medium;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: `4px solid var(--border)`,
          borderTop: `4px solid var(--primary)`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      {message && (
        <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>
          {message}
        </p>
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  message: PropTypes.string,
};

export default LoadingSpinner;

