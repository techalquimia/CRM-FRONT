import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import UnitMapView from "../components/maps/UnitMapView.jsx";
import IconButton from "../components/ui/IconButton.jsx";
import BackIcon from "../components/icons/BackIcon.jsx";
import { MOCK_UNITS } from "../data/mockUnits.js";
import { ROUTES } from "../constants/routes.js";
import styles from "./UnitDetail.module.css";

const UnitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const unit = MOCK_UNITS.find((u) => u.id === parseInt(id, 10));

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
            <UnitMapView unit={unit} />
          </div>
        </article>
      </div>
    </DashboardLayout>
  );
};

export default UnitDetail;

