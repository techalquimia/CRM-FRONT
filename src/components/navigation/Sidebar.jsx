import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES, ROUTE_NAMES } from "../../constants/routes.js";

const items = [
  { name: ROUTE_NAMES.HOME, path: ROUTES.DASHBOARD },
  { name: ROUTE_NAMES.EVIDENCES, path: ROUTES.EVIDENCES },
  { name: ROUTE_NAMES.SETTINGS, path: null },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-dot" aria-hidden="true" />
        <span>CRM</span>
      </div>
      <nav className="sidebar-nav">
        {items.map((item, index) => (
          <button
            key={item.name}
            className={`nav-item ${
              location.pathname === item.path ? "active" : ""
            }`}
            type="button"
            onClick={() => handleItemClick(item)}
            disabled={!item.path}
            style={{
              cursor: item.path ? "pointer" : "not-allowed",
              opacity: item.path ? 1 : 0.6,
            }}
          >
            {item.name}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-pill">
          <span className="avatar" aria-hidden="true" />
          <div>
            <p className="user-name">Camila Vega</p>
            <p className="user-role">Gerente comercial</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
