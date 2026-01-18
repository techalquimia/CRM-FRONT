import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ROUTES } from "../constants/routes.js";
import Logo from "../components/ui/Logo.jsx";
import styles from "./Login.module.css";

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
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <header className={styles.loginHeader}>
          <Logo variant="minimal" showTagline={true} />
          <div>
            <p className={styles.loginEyebrow}>CRM seguro</p>
            <h1 className={styles.loginTitle}>Inicia sesión</h1>
            <p className={styles.loginSubtitle}>
              Accede a tu panel y gestiona tus leads.
            </p>
          </div>
        </header>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          <label className={styles.inputGroup}>
            <span>Correo</span>
            <input
              type="email"
              placeholder="nombre@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className={styles.inputGroup}>
            <span>Contraseña</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className={styles.loginFooter}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Recordarme</span>
            </label>
            <button
              className={styles.primaryButton}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className={styles.loadingSpinner} />
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
