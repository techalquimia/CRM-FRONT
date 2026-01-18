import PropTypes from "prop-types";
import LoadingSpinner from "./LoadingSpinner.jsx";

/**
 * Loading overlay component for full-screen or container loading states
 */
const LoadingOverlay = ({ message, fullScreen = false }) => {
  const containerStyle = fullScreen
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(255, 255, 255, 0.9)",
        zIndex: 9999,
      }
    : {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(255, 255, 255, 0.9)",
        zIndex: 10,
      };

  return (
    <div
      style={{
        ...containerStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: fullScreen ? 0 : "16px",
      }}
    >
      <LoadingSpinner message={message} size="medium" />
    </div>
  );
};

LoadingOverlay.propTypes = {
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default LoadingOverlay;

