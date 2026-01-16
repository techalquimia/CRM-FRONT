import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import ActivityItem from "../components/ui/ActivityItem.jsx";

const stats = [
  { label: "Leads nuevos", value: "128", trend: "+12%" },
  { label: "Oportunidades", value: "34", trend: "+4%" },
  { label: "Tasa de cierre", value: "21%", trend: "-2%" },
  { label: "Ingreso mensual", value: "$48,300", trend: "+8%" },
];

const activity = [
  { title: "María López", detail: "Solicitó demo", time: "Hace 6 min" },
  { title: "TechNova", detail: "Cotización enviada", time: "Hace 18 min" },
  { title: "Carlos Ruiz", detail: "Reunión agendada", time: "Hace 1 h" },
  { title: "Norte Retail", detail: "Negociación abierta", time: "Hace 3 h" },
];

const Dashboard = () => {
  return (
    <DashboardLayout
      title="Panel de control"
      subtitle="Resumen de actividad y métricas clave"
    >
      <section className="grid stats-grid">
        {stats.map((item) => (
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
          <div className="chart-placeholder" aria-hidden="true" />
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
            {activity.map((item) => (
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
