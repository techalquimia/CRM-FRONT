import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import ActivityItem from "../components/ui/ActivityItem.jsx";
import GoogleMapView from "../components/maps/GoogleMapView.jsx";
import MapErrorBoundary from "../components/errors/MapErrorBoundary.jsx";
import PageErrorBoundary from "../components/errors/PageErrorBoundary.jsx";
import { MOCK_STATS, MOCK_ACTIVITY } from "../data/mockUnits.js";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <PageErrorBoundary pageName="Dashboard">
      <DashboardLayout
        title="Panel de control"
        subtitle="Resumen de actividad y métricas clave"
      >
        <section className={`${styles.grid} ${styles.statsGrid}`}>
          {MOCK_STATS.map((item) => (
            <StatCard
              key={item.label}
              label={item.label}
              value={item.value}
              trend={item.trend}
            />
          ))}
        </section>
        <section className={`${styles.grid} ${styles.contentGrid}`}>
          <article className={styles.card}>
            <header className={styles.cardHeader}>
              <div>
                <p className={styles.cardTitle}>Pipeline semanal</p>
                <p className={styles.cardSubtitle}>Actualizado hoy</p>
              </div>
              <button className={styles.ghostButton} type="button">
                Ver detalles
              </button>
            </header>
            <div className={styles.mapContainer}>
              <MapErrorBoundary>
                <GoogleMapView />
              </MapErrorBoundary>
            </div>
          </article>
          <article className={styles.card}>
            <header className={styles.cardHeader}>
              <div>
                <p className={styles.cardTitle}>Actividad reciente</p>
                <p className={styles.cardSubtitle}>Últimas interacciones</p>
              </div>
              <button className={styles.ghostButton} type="button">
                Filtrar
              </button>
            </header>
            <div className={styles.activityList}>
              {MOCK_ACTIVITY.map((item) => (
                <ActivityItem
                  key={item.title}
                  title={item.title}
                  detail={item.detail}
                  time={item.time}
                />
              ))}
            </div>
          </article>
        </section>
      </DashboardLayout>
    </PageErrorBoundary>
  );
};

export default Dashboard;
