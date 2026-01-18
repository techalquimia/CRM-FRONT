import PropTypes from "prop-types";
import styles from "./Logo.module.css";

/**
 * QUANI logo component
 * Displays the QUANI brand logo with symbol and text
 */
const Logo = ({ variant = "default", showTagline = true }) => {
  return (
    <div className={`${styles.logo} ${styles[variant]}`}>
      <div className={styles.logoIcon}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.iconSvg}
        >
          {/* Símbolo abstracto: líneas curvas paralelas que forman una forma en V/hojas */}
          {/* Líneas del lado izquierdo */}
          <path
            d="M50 20 Q35 40 25 60 Q20 70 15 80"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M50 18 Q38 38 30 58 Q26 68 22 78"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M50 16 Q41 36 35 56 Q32 66 29 76"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M50 14 Q44 34 40 54 Q38 64 36 74"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Líneas del lado derecho */}
          <path
            d="M50 20 Q65 40 75 60 Q80 70 85 80"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M50 18 Q62 38 70 58 Q74 68 78 78"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M50 16 Q59 36 65 56 Q68 66 71 76"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M50 14 Q56 34 60 54 Q62 64 64 74"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      <div className={styles.logoText}>
        <span className={styles.brandName}>QUANI</span>
        {showTagline && (
          <span className={styles.tagline}>nutrición de calidad</span>
        )}
      </div>
    </div>
  );
};

Logo.propTypes = {
  variant: PropTypes.oneOf(["default", "compact", "minimal"]),
  showTagline: PropTypes.bool,
};

export default Logo;
