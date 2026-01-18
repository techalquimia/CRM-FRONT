import PropTypes from "prop-types";
import styles from "./LoadingSpinner.module.css";

/**
 * Reusable loading spinner component
 */
const LoadingSpinner = ({ size = "medium", message = "Cargando..." }) => {
  const spinnerClass = {
    small: styles.spinnerSmall,
    medium: styles.spinnerMedium,
    large: styles.spinnerLarge,
  }[size] || styles.spinnerMedium;

  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${spinnerClass}`} />
      {message && (
        <p className={styles.message}>
          {message}
        </p>
      )}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  message: PropTypes.string,
};

export default LoadingSpinner;

