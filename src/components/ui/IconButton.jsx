import PropTypes from "prop-types";

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
  const defaultStyle = {
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    cursor: "pointer",
    transition: "all 0.2s",
    ...style,
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.background = "var(--primary-soft)";
    e.currentTarget.style.borderColor = "var(--primary)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = "var(--surface)";
    e.currentTarget.style.borderColor = "var(--border)";
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={defaultStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

