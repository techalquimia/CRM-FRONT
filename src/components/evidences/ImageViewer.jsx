import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IconButton from "../ui/IconButton.jsx";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";
import styles from "./ImageViewer.module.css";

/**
 * Image viewer component with navigation and metadata
 */
const ImageViewer = ({ images, currentIndex, onClose, onNavigate }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const currentImage = images[currentIndex];

  // Reset loading state when image changes
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [currentIndex]);

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.viewer}
      >
        {currentIndex > 0 && (
          <IconButton
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            onClick={handlePrevious}
            ariaLabel="Imagen anterior"
            className={styles.navButton}
          />
        )}

        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            {imageLoading && (
              <div className={styles.imageLoading}>
                <LoadingSpinner size="medium" message="Cargando imagen..." />
              </div>
            )}
            {imageError ? (
              <div className={styles.imageError}>
                Error al cargar la imagen
              </div>
            ) : (
              <img
                src={currentImage.url}
                alt={currentImage.name}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
                className={`${styles.image} ${!imageLoading ? styles.loaded : ""}`}
              />
            )}
            <div className={styles.counter}>
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Panel de metadatos */}
          <div className={styles.metadataPanel}>
            <h3 className={styles.metadataTitle}>Metadatos</h3>
            <div className={styles.metadataList}>
              <div className={styles.metadataItem}>
                <p className={styles.metadataLabel}>Nombre</p>
                <p className={styles.metadataValue}>{currentImage.name}</p>
              </div>
              <div className={styles.metadataItem}>
                <p className={styles.metadataLabel}>Fecha y Hora</p>
                <p className={styles.metadataValue}>
                  {formatDateTime(currentImage.date, currentImage.time)}
                </p>
              </div>
              <div className={styles.metadataItem}>
                <p className={styles.metadataLabel}>Ubicación</p>
                <p className={styles.metadataValue}>{currentImage.location.address}</p>
                <p className={styles.metadataSubValue}>
                  {currentImage.location.lat.toFixed(6)}, {currentImage.location.lng.toFixed(6)}
                </p>
              </div>
              <div className={styles.metadataItem}>
                <p className={styles.metadataLabel}>Unidad</p>
                <p className={styles.metadataValue}>{currentImage.unit}</p>
              </div>
              {currentImage.description && (
                <div className={styles.metadataItem}>
                  <p className={styles.metadataLabel}>Descripción</p>
                  <p className={styles.metadataValue} style={{ fontSize: "0.9rem" }}>
                    {currentImage.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {currentIndex < images.length - 1 && (
          <IconButton
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            onClick={handleNext}
            ariaLabel="Siguiente imagen"
            className={styles.navButton}
          />
        )}

        <IconButton
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          onClick={onClose}
          ariaLabel="Cerrar visor"
          className={`${styles.navButton} ${styles.closeButton}`}
        />
      </div>
    </div>
  );
};

ImageViewer.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        address: PropTypes.string.isRequired,
      }).isRequired,
      unit: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default ImageViewer;
