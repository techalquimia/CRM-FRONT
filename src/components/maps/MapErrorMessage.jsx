import PropTypes from "prop-types";

/**
 * Reusable error message component for maps
 */
const MapErrorMessage = ({ message, type = "error" }) => {
  const styles = {
    error: {
      background: "linear-gradient(135deg, #fff4f0, #ffffff)",
      border: "1px solid #ff6b6b",
      color: "#d63031",
    },
    info: {
      background: "linear-gradient(135deg, #f0f4ff, #ffffff)",
      border: "1px dashed #ccc",
      color: "#666",
    },
  };

  const currentStyle = styles[type] || styles.error;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "16px",
        flexDirection: "column",
        gap: "12px",
        padding: "20px",
        ...currentStyle,
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>{message}</p>
    </div>
  );
};

MapErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["error", "info"]),
};

export default MapErrorMessage;

