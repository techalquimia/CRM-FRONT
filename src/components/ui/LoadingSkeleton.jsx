import PropTypes from "prop-types";
import styles from "./LoadingSkeleton.module.css";

/**
 * Loading skeleton component for placeholder content
 * Provides visual feedback while content is loading
 */
const LoadingSkeleton = ({ 
  variant = "text", 
  width, 
  height, 
  lines = 1,
  className = "" 
}) => {
  if (variant === "card") {
    return (
      <div className={`${styles.skeletonCard} ${className}`}>
        <div className={styles.skeletonHeader}>
          <div className={styles.skeletonLine} style={{ width: "60%" }} />
          <div className={styles.skeletonLine} style={{ width: "40%" }} />
        </div>
        <div className={styles.skeletonContent}>
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className={styles.skeletonLine} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "image") {
    return (
      <div 
        className={`${styles.skeletonImage} ${className}`}
        style={{ width: width || "100%", height: height || "200px" }}
      />
    );
  }

  if (variant === "circle") {
    return (
      <div 
        className={`${styles.skeletonCircle} ${className}`}
        style={{ width: width || "40px", height: height || "40px" }}
      />
    );
  }

  // Default: text lines
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={styles.skeletonLine}
          style={{
            width: width || (i === lines - 1 ? "80%" : "100%"),
            height: height || "16px",
            marginBottom: i < lines - 1 ? "8px" : "0",
          }}
        />
      ))}
    </div>
  );
};

LoadingSkeleton.propTypes = {
  variant: PropTypes.oneOf(["text", "card", "image", "circle"]),
  width: PropTypes.string,
  height: PropTypes.string,
  lines: PropTypes.number,
  className: PropTypes.string,
};

export default LoadingSkeleton;
