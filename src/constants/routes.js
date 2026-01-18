/**
 * Application routes configuration
 * Centralized route definitions for better maintainability
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  EVIDENCES: "/evidences",
  UNIT_DETAIL: (id) => `/unit/${id}`,
};

export const ROUTE_NAMES = {
  HOME: "Inicio",
  EVIDENCES: "Evidencias",
  SETTINGS: "Configuración",
};

