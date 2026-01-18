import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import ActivityItem from "../components/ui/ActivityItem.jsx";
import GoogleMapView from "../components/maps/GoogleMapView.jsx";
import { MOCK_STATS, MOCK_ACTIVITY } from "../data/mockUnits.js";

const Dashboard = () => {
  return (
    <DashboardLayout
      title="Panel de control"
      subtitle="Resumen de actividad y métricas clave"
    >
      <section className="grid stats-grid">
        {MOCK_STATS.map((item) => (
          <StatCard
            key={item.label}
            label={item.label}
            value={item.value}
            trend={item.trend}
          />
        ))}
      </section>
      <section className="grid content-grid">
        <article className="card">
          <header className="card-header">
            <div>
              <p className="card-title">Pipeline semanal</p>
              <p className="card-subtitle">Actualizado hoy</p>
            </div>
            <button className="ghost-button" type="button">
              Ver detalles
            </button>
          </header>
          <div className="map-container">
            <GoogleMapView />
          </div>
        </article>
        <article className="card">
          <header className="card-header">
            <div>
              <p className="card-title">Actividad reciente</p>
              <p className="card-subtitle">Últimas interacciones</p>
            </div>
            <button className="ghost-button" type="button">
              Filtrar
            </button>
          </header>
          <div className="activity-list">
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
  );
};

export default Dashboard;
