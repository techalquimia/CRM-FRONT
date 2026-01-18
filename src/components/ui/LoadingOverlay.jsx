import PropTypes from "prop-types";
import LoadingSpinner from "./LoadingSpinner.jsx";
import styles from "./LoadingOverlay.module.css";

/**
 * Loading overlay component for full-screen or container loading states
 */
const LoadingOverlay = ({ message, fullScreen = false }) => {
  const overlayClass = fullScreen 
    ? `${styles.overlay} ${styles.overlayFullScreen}`
    : `${styles.overlay} ${styles.overlayContainer}`;

  return (
    <div className={overlayClass}>
      <LoadingSpinner message={message} size="medium" />
    </div>
  );
};

LoadingOverlay.propTypes = {
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default LoadingOverlay;

