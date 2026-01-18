import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES, ROUTE_NAMES } from "../../constants/routes.js";
import Logo from "../ui/Logo.jsx";
import styles from "./Sidebar.module.css";

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
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <Logo variant="compact" showTagline={false} />
      </div>
      <nav className={styles.sidebarNav}>
        {items.map((item, index) => (
          <button
            key={item.name}
            className={`${styles.navItem} ${
              location.pathname === item.path ? styles.active : ""
            }`}
            type="button"
            onClick={() => handleItemClick(item)}
            disabled={!item.path}
          >
            {item.name}
          </button>
        ))}
      </nav>
      <div className={styles.sidebarFooter}>
        <div className={styles.userPill}>
          <span className={styles.avatar} aria-hidden="true" />
          <div>
            <p className={styles.userName}>Camila Vega</p>
            <p className={styles.userRole}>Gerente comercial</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
