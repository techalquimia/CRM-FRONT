import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import UnitMapView from "../components/maps/UnitMapView.jsx";
import IconButton from "../components/ui/IconButton.jsx";
import BackIcon from "../components/icons/BackIcon.jsx";
import MapErrorBoundary from "../components/errors/MapErrorBoundary.jsx";
import PageErrorBoundary from "../components/errors/PageErrorBoundary.jsx";
import LoadingOverlay from "../components/ui/LoadingOverlay.jsx";
import LoadingSkeleton from "../components/ui/LoadingSkeleton.jsx";
import { MOCK_UNITS } from "../data/mockUnits.js";
import { ROUTES } from "../constants/routes.js";
import styles from "./UnitDetail.module.css";

const UnitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    // Simular carga de unidad
    const loadUnit = async () => {
      setIsLoading(true);
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 600));
      const foundUnit = MOCK_UNITS.find((u) => u.id === parseInt(id, 10));
      setUnit(foundUnit);
      setIsLoading(false);
    };

    loadUnit();
  }, [id]);

  if (isLoading) {
    return (
      <PageErrorBoundary pageName="Detalle de Unidad">
        <DashboardLayout title="Cargando unidad..." subtitle="">
          <div className={styles.container}>
            <article className={styles.card}>
              <header className={styles.cardHeader}>
                <LoadingSkeleton variant="text" width="60%" height="20px" />
              </header>
              <div className={styles.infoGrid}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={styles.infoItem}>
                    <LoadingSkeleton variant="text" width="50%" height="14px" />
                    <LoadingSkeleton variant="text" width="80%" height="18px" />
                  </div>
                ))}
              </div>
            </article>
            <article className={styles.card}>
              <div className={styles.mapContainer}>
                <LoadingOverlay message="Cargando mapa..." fullScreen={false} />
              </div>
            </article>
          </div>
        </DashboardLayout>
      </PageErrorBoundary>
    );
  }

  if (!unit) {
    return (
      <DashboardLayout title="Unidad no encontrada" subtitle="">
        <div className={styles.notFoundContainer}>
          <p>La unidad solicitada no existe.</p>
          <button
            className={styles.primaryButton}
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            Volver al Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <PageErrorBoundary pageName="Detalle de Unidad">
      <DashboardLayout
        title={`${unit.name} - Detalle`}
        subtitle={`Estado: ${unit.status}`}
      >
        <div className={styles.container}>
          {/* Información de la unidad */}
          <article className={styles.card}>
            <header className={styles.cardHeader}>
              <div>
                <p className={styles.cardTitle}>Información de la Unidad</p>
                <p className={styles.cardSubtitle}>Detalles de la ruta actual</p>
              </div>
              <IconButton
                icon={<BackIcon />}
                onClick={() => navigate(ROUTES.DASHBOARD)}
                ariaLabel="Volver al dashboard"
              />
            </header>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <p className={styles.infoLabel}>Conductor</p>
                <p className={styles.infoValue}>{unit.driver}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.infoLabel}>Destino</p>
                <p className={styles.infoValue}>{unit.destination}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.infoLabel}>Llegada estimada</p>
                <p className={styles.infoValue}>{unit.estimatedArrival}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.infoLabel}>Estado</p>
                <p className={styles.statusBadge}>{unit.status}</p>
              </div>
            </div>
          </article>

          {/* Mapa de la unidad */}
          <article className={styles.card}>
            <header className={styles.cardHeader}>
              <div>
                <p className={styles.cardTitle}>Ubicación en tiempo real</p>
                <p className={styles.cardSubtitle}>Posición actual de {unit.name}</p>
              </div>
            </header>
            <div className={styles.mapContainer}>
              <MapErrorBoundary>
                <UnitMapView unit={unit} />
              </MapErrorBoundary>
            </div>
          </article>
        </div>
      </DashboardLayout>
    </PageErrorBoundary>
  );
};

export default UnitDetail;

