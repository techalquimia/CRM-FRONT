import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IconButton from "../ui/IconButton.jsx";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";

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
      className="image-viewer-overlay"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        cursor: "pointer",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "95vw",
          maxHeight: "95vh",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          background: "rgba(20, 20, 20, 0.95)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        {currentIndex > 0 && (
          <IconButton
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
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
            style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.3)" }}
          />
        )}

        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          <div style={{ position: "relative", flex: 1, minHeight: "400px" }}>
            {imageLoading && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#333",
                  borderRadius: "8px",
                }}
              >
                <LoadingSpinner size="medium" message="Cargando imagen..." />
              </div>
            )}
            {imageError ? (
              <div
                style={{
                  width: "800px",
                  height: "600px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#333",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
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
                style={{
                  maxWidth: "70vw",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                  cursor: "default",
                  opacity: imageLoading ? 0 : 1,
                  transition: "opacity 0.3s",
                }}
              />
            )}
            <div
              style={{
                position: "absolute",
                bottom: "-40px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Panel de metadatos */}
          <div
            style={{
              width: "300px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              padding: "20px",
              color: "white",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3 style={{ margin: "0 0 20px 0", fontSize: "1.2rem", fontWeight: 600 }}>
              Metadatos
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", opacity: 0.8 }}>Nombre</p>
                <p style={{ margin: 0, fontWeight: 500 }}>{currentImage.name}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", opacity: 0.8 }}>Fecha y Hora</p>
                <p style={{ margin: 0, fontWeight: 500 }}>
                  {formatDateTime(currentImage.date, currentImage.time)}
                </p>
              </div>
              <div>
                <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", opacity: 0.8 }}>Ubicación</p>
                <p style={{ margin: 0, fontWeight: 500 }}>{currentImage.location.address}</p>
                <p style={{ margin: "4px 0 0 0", fontSize: "0.75rem", opacity: 0.7 }}>
                  {currentImage.location.lat.toFixed(6)}, {currentImage.location.lng.toFixed(6)}
                </p>
              </div>
              <div>
                <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", opacity: 0.8 }}>Unidad</p>
                <p style={{ margin: 0, fontWeight: 500 }}>{currentImage.unit}</p>
              </div>
              {currentImage.description && (
                <div>
                  <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", opacity: 0.8 }}>Descripción</p>
                  <p style={{ margin: 0, fontWeight: 500, fontSize: "0.9rem" }}>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
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
            style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.3)" }}
          />
        )}

        <IconButton
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "white" }}>
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
          style={{
            position: "absolute",
            top: "-50px",
            right: 0,
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
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

