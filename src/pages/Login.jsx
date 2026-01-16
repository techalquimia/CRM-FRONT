import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <header className="login-header">
          <div>
            <p className="login-eyebrow">CRM seguro</p>
            <h1 className="login-title">Inicia sesión</h1>
            <p className="login-subtitle">
              Accede a tu panel y gestiona tus leads.
            </p>
          </div>
          <Link className="ghost-button" to="/">
            Volver
          </Link>
        </header>
        <form className="login-form">
          <label className="input-group">
            <span>Correo</span>
            <input type="email" placeholder="nombre@empresa.com" required />
          </label>
          <label className="input-group">
            <span>Contraseña</span>
            <input type="password" placeholder="••••••••" required />
          </label>
          <div className="login-footer">
            <label className="checkbox">
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
            <button className="primary-button" type="submit">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
