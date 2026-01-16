import { Link } from "react-router-dom";

const Topbar = ({ title, subtitle }) => {
  return (
    <header className="topbar">
      <div>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      <div className="topbar-actions">
        <Link className="ghost-button" to="/login">
          Iniciar sesión
        </Link>
        <button className="ghost-button" type="button">
          Exportar
        </button>
        <button className="primary-button" type="button">
          Nuevo lead
        </button>
      </div>
    </header>
  );
};

export default Topbar;
