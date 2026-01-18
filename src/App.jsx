import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import { ROUTES } from "./constants/routes.js";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import UnitDetail from "./pages/UnitDetail.jsx";
import Evidences from "./pages/Evidences.jsx";

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Componente para redirigir si ya está autenticado
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/unit/:id"
        element={
          <PrivateRoute>
            <UnitDetail />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.EVIDENCES}
        element={
          <PrivateRoute>
            <Evidences />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
