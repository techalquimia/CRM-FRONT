/**
 * Mock data for units
 * In production, this would come from an API
 */

export const MOCK_UNITS = [
  {
    id: 1,
    name: "Unidad 1",
    position: { lat: 19.4326, lng: -99.1332 },
    status: "En ruta",
    driver: "Juan Pérez",
    destination: "Ciudad de México",
    estimatedArrival: "14:30",
  },
  {
    id: 2,
    name: "Unidad 2",
    position: { lat: 19.4978, lng: -99.1269 },
    status: "En ruta",
    driver: "María González",
    destination: "Naucalpan",
    estimatedArrival: "15:15",
  },
  {
    id: 3,
    name: "Unidad 3",
    position: { lat: 19.4285, lng: -99.1277 },
    status: "En ruta",
    driver: "Carlos Rodríguez",
    destination: "Polanco",
    estimatedArrival: "16:00",
  },
];

export const MOCK_STATS = [
  { label: "Leads nuevos", value: "128", trend: "+12%" },
  { label: "Oportunidades", value: "34", trend: "+4%" },
  { label: "Tasa de cierre", value: "21%", trend: "-2%" },
  { label: "Ingreso mensual", value: "$48,300", trend: "+8%" },
];

export const MOCK_ACTIVITY = [
  { title: "María López", detail: "Solicitó demo", time: "Hace 6 min" },
  { title: "TechNova", detail: "Cotización enviada", time: "Hace 18 min" },
  { title: "Carlos Ruiz", detail: "Reunión agendada", time: "Hace 1 h" },
  { title: "Norte Retail", detail: "Negociación abierta", time: "Hace 3 h" },
];

