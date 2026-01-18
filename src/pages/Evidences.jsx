import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import EvidenceCard from "../components/evidences/EvidenceCard.jsx";
import ImageViewer from "../components/evidences/ImageViewer.jsx";
import EvidenceErrorBoundary from "../components/errors/EvidenceErrorBoundary.jsx";
import PageErrorBoundary from "../components/errors/PageErrorBoundary.jsx";
import { MOCK_EVIDENCES } from "../data/mockEvidences.js";
import styles from "./Evidences.module.css";

const Evidences = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (evidence) => {
    const index = MOCK_EVIDENCES.findIndex((e) => e.id === evidence.id);
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
          subtitle={`${MOCK_EVIDENCES.length} evidencias registradas`}
        >
          <div className={styles.evidencesGrid}>
            {MOCK_EVIDENCES.map((evidence) => (
              <EvidenceCard
                key={evidence.id}
                evidence={evidence}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        </DashboardLayout>

        {selectedImageIndex !== null && (
          <ImageViewer
            images={MOCK_EVIDENCES}
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

