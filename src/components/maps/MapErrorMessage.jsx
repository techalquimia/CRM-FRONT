import PropTypes from "prop-types";
import styles from "./MapErrorMessage.module.css";

/**
 * Reusable error message component for maps
 */
const MapErrorMessage = ({ message, type = "error" }) => {
  const typeClass = type === "info" ? styles.info : styles.error;

  return (
    <div className={`${styles.container} ${typeClass}`}>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

MapErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["error", "info"]),
};

export default MapErrorMessage;

