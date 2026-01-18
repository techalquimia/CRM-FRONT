import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { ROUTES } from "../../constants/routes.js";
import IconButton from "../ui/IconButton.jsx";
import LogoutIcon from "../icons/LogoutIcon.jsx";
import styles from "./Topbar.module.css";

const Topbar = ({ title, subtitle }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <header className={styles.topbar}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageSubtitle}>{subtitle}</p>
      </div>
      <div className={styles.topbarActions}>
        <IconButton
          icon={<LogoutIcon />}
          onClick={handleLogout}
          ariaLabel="Cerrar sesión"
        />
      </div>
    </header>
  );
};

export default Topbar;
