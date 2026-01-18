import { useState } from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";
import styles from "./EvidenceCard.module.css";

/**
 * Evidence card component displaying image thumbnail and metadata
 */
const EvidenceCard = ({ evidence, onImageClick }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <article className={styles.card} onClick={() => onImageClick(evidence)}>
      <div className={styles.imageContainer}>
        {imageLoading && (
          <div className={styles.imageLoading}>
            <LoadingSpinner size="small" message="" />
          </div>
        )}
        {imageError ? (
          <div className={styles.imageError}>
            Error al cargar imagen
          </div>
        ) : (
          <img
            src={evidence.url}
            alt={evidence.name}
            className={`${styles.image} ${!imageLoading ? styles.loaded : ""}`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        )}
      </div>
      <div>
        <h3 className={styles.title}>{evidence.name}</h3>
        <div className={styles.metadata}>
          <div className={styles.metadataItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.icon}>
              <path
                d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{formatDateTime(evidence.date, evidence.time)}</span>
          </div>
          <div className={styles.metadataItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.icon}>
              <path
                d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{evidence.location.address}</span>
          </div>
          <div className={styles.metadataItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.icon}>
              <path
                d="M9 17H7C5.89543 17 5 16.1046 5 15V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V15C19 16.1046 18.1046 17 17 17H15M9 17L12 14M9 17L12 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{evidence.unit}</span>
          </div>
          {evidence.description && (
            <p className={styles.description}>{evidence.description}</p>
          )}
        </div>
      </div>
    </article>
  );
};

EvidenceCard.propTypes = {
  evidence: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.shape({
      address: PropTypes.string.isRequired,
    }).isRequired,
    unit: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default EvidenceCard;

