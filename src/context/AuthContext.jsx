import { createContext, useContext, useState } from "react";
import { authStorage } from "../utils/storage.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("AuthContext");
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = authStorage.get() === true;
    logger.debug("Initializing auth state", { isAuthenticated: stored });
    return stored;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    // TODO: Replace with actual API call in production
    logger.info("Login attempt started", { email: email ? "provided" : "missing" });
    setIsLoading(true);
    
    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (email && password) {
        setIsAuthenticated(true);
        authStorage.set(true);
        setIsLoading(false);
        logger.info("Login successful");
        logger.event("user_login", { success: true });
        return true;
      }
      
      setIsLoading(false);
      logger.warn("Login failed: missing credentials");
      logger.event("user_login", { success: false, reason: "missing_credentials" });
      return false;
    } catch (error) {
      setIsLoading(false);
      logger.error("Login error", error);
      logger.event("user_login", { success: false, reason: "error" });
      return false;
    }
  };

  const logout = () => {
    logger.info("User logout");
    logger.event("user_logout", {});
    setIsAuthenticated(false);
    authStorage.remove();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

