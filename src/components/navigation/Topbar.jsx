import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { ROUTES } from "../../constants/routes.js";
import IconButton from "../ui/IconButton.jsx";
import LogoutIcon from "../icons/LogoutIcon.jsx";

const Topbar = ({ title, subtitle }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <header className="topbar">
      <div>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      <div className="topbar-actions">
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
