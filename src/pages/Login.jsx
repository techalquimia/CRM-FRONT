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
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Por favor, ingresa tu correo electrónico");
      return;
    }

    // Si solo hay email, mostrar campo de contraseña
    if (!password) {
      setShowPassword(true);
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
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <header className={styles.loginHeader}>
            <Logo variant="minimal" showTagline={false} />
            <h1 className={styles.loginTitle}>Iniciar sesión</h1>
          </header>
          
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}
            
            <div className={styles.inputWrapper}>
              <input
                type="email"
                className={styles.emailInput}
                placeholder="nombre@correoelectronico-trabajo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {showPassword && (
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  className={styles.passwordInput}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            )}

            <button
              className={styles.continueButton}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className={styles.loadingSpinner} />
                  <span>Iniciando...</span>
                </>
              ) : (
                <>
                  Continuar <span className={styles.arrow}>→</span>
                </>
              )}
            </button>
          </form>

          <div className={styles.loginLinks}>
            <a href="#" className={styles.link}>Regístrate</a>
            <a href="#" className={styles.link}>Restablecer contraseña</a>
          </div>

          <div className={styles.announcementBox}>
            <h3 className={styles.announcementTitle}>
              Ve lo nuevo de nuestro equipo de producto
            </h3>
            <p className={styles.announcementText}>
              Únete a nosotros el jueves 29 de enero para el Webinar Trimestral de Producto de Invierno. Haz preguntas, conoce a tus compañeros y aprende sobre nuestros últimos lanzamientos y consejos estacionales.
            </p>
            <button className={styles.announcementButton}>
              Regístrate ahora
            </button>
          </div>
        </div>

        <footer className={styles.footer}>
          <Logo variant="compact" showTagline={false} />
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Mesa de ayuda</a>
            <a href="#" className={styles.footerLink}>Recomendar un amigo</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
