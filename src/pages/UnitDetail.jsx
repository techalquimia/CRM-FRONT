import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import UnitMapView from "../components/maps/UnitMapView.jsx";
import IconButton from "../components/ui/IconButton.jsx";
import BackIcon from "../components/icons/BackIcon.jsx";
import { MOCK_UNITS } from "../data/mockUnits.js";
import { ROUTES } from "../constants/routes.js";

const UnitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const unit = MOCK_UNITS.find((u) => u.id === parseInt(id, 10));

  if (!unit) {
    return (
      <DashboardLayout title="Unidad no encontrada" subtitle="">
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>La unidad solicitada no existe.</p>
          <button
            className="primary-button"
            onClick={() => navigate(ROUTES.DASHBOARD)}
            style={{ marginTop: "20px" }}
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
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Información de la unidad */}
        <article className="card">
          <header className="card-header">
            <div>
              <p className="card-title">Información de la Unidad</p>
              <p className="card-subtitle">Detalles de la ruta actual</p>
            </div>
            <IconButton
              icon={<BackIcon />}
              onClick={() => navigate(ROUTES.DASHBOARD)}
              ariaLabel="Volver al dashboard"
            />
          </header>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div>
              <p style={{ color: "var(--muted)", fontSize: "0.85rem", margin: "0 0 8px 0" }}>
                Conductor
              </p>
              <p style={{ fontWeight: 600, margin: 0 }}>{unit.driver}</p>
            </div>
            <div>
              <p style={{ color: "var(--muted)", fontSize: "0.85rem", margin: "0 0 8px 0" }}>
                Destino
              </p>
              <p style={{ fontWeight: 600, margin: 0 }}>{unit.destination}</p>
            </div>
            <div>
              <p style={{ color: "var(--muted)", fontSize: "0.85rem", margin: "0 0 8px 0" }}>
                Llegada estimada
              </p>
              <p style={{ fontWeight: 600, margin: 0 }}>{unit.estimatedArrival}</p>
            </div>
            <div>
              <p style={{ color: "var(--muted)", fontSize: "0.85rem", margin: "0 0 8px 0" }}>
                Estado
              </p>
              <p
                style={{
                  fontWeight: 600,
                  margin: 0,
                  color: "var(--primary)",
                  padding: "4px 12px",
                  background: "var(--primary-soft)",
                  borderRadius: "999px",
                  display: "inline-block",
                }}
              >
                {unit.status}
              </p>
            </div>
          </div>
        </article>

        {/* Mapa de la unidad */}
        <article className="card">
          <header className="card-header">
            <div>
              <p className="card-title">Ubicación en tiempo real</p>
              <p className="card-subtitle">Posición actual de {unit.name}</p>
            </div>
          </header>
          <div className="map-container" style={{ height: "500px" }}>
            <UnitMapView unit={unit} />
          </div>
        </article>
      </div>
    </DashboardLayout>
  );
};

export default UnitDetail;

