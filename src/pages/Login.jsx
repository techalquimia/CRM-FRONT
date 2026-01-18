import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ROUTES } from "../constants/routes.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate(ROUTES.DASHBOARD);
    } else {
      setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
  };

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
        </header>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
              {error}
            </div>
          )}
          <label className="input-group">
            <span>Correo</span>
            <input
              type="email"
              placeholder="nombre@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="input-group">
            <span>Contraseña</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="login-footer">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Recordarme</span>
            </label>
            <button
              className="primary-button"
              type="submit"
              disabled={isLoading}
              style={{
                position: "relative",
                minWidth: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {isLoading ? (
                <>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <span>Iniciando...</span>
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
