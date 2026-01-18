import PropTypes from "prop-types";
import styles from "./IconButton.module.css";

/**
 * Reusable icon button component
 * @param {Object} props
 * @param {React.ReactNode} props.icon - SVG icon element
 * @param {Function} props.onClick - Click handler
 * @param {string} props.ariaLabel - Accessibility label
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
const IconButton = ({ icon, onClick, ariaLabel, className = "", style = {} }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.iconButton} ${className}`}
      style={style}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default IconButton;

