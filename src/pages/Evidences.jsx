import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import EvidenceCard from "../components/evidences/EvidenceCard.jsx";
import EvidenceCardSkeleton from "../components/ui/EvidenceCardSkeleton.jsx";
import ImageViewer from "../components/evidences/ImageViewer.jsx";
import EvidenceErrorBoundary from "../components/errors/EvidenceErrorBoundary.jsx";
import PageErrorBoundary from "../components/errors/PageErrorBoundary.jsx";
import { MOCK_EVIDENCES } from "../data/mockEvidences.js";
import styles from "./Evidences.module.css";

const Evidences = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [evidences, setEvidences] = useState([]);

  useEffect(() => {
    // Simular carga de evidencias
    const loadEvidences = async () => {
      setIsLoading(true);
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEvidences(MOCK_EVIDENCES);
      setIsLoading(false);
    };

    loadEvidences();
  }, []);

  const handleImageClick = (evidence) => {
    const index = evidences.findIndex((e) => e.id === evidence.id);
    setSelectedImageIndex(index);
  };

  const handleCloseViewer = () => {
    setSelectedImageIndex(null);
  };

  const handleNavigate = (newIndex) => {
    setSelectedImageIndex(newIndex);
  };

  return (
    <PageErrorBoundary pageName="Evidencias">
      <EvidenceErrorBoundary>
        <DashboardLayout
          title="Evidencias"
          subtitle={isLoading ? "Cargando..." : `${evidences.length} evidencias registradas`}
        >
          {isLoading ? (
            <div className={styles.evidencesGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <EvidenceCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className={styles.evidencesGrid}>
              {evidences.map((evidence) => (
                <EvidenceCard
                  key={evidence.id}
                  evidence={evidence}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          )}
        </DashboardLayout>

        {selectedImageIndex !== null && evidences.length > 0 && (
          <ImageViewer
            images={evidences}
            currentIndex={selectedImageIndex}
            onClose={handleCloseViewer}
            onNavigate={handleNavigate}
          />
        )}
      </EvidenceErrorBoundary>
    </PageErrorBoundary>
  );
};

export default Evidences;

