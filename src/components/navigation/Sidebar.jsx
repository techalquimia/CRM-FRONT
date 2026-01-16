const items = [
  "Inicio",
  "Clientes",
  "Pipeline",
  "Tareas",
  "Reportes",
  "Configuración",
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-dot" aria-hidden="true" />
        <span>Nova CRM</span>
      </div>
      <nav className="sidebar-nav">
        {items.map((item, index) => (
          <button
            key={item}
            className={`nav-item ${index === 0 ? "active" : ""}`}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-pill">
          <span className="avatar" aria-hidden="true" />
          <div>
            <p className="user-name">Camila Vega</p>
            <p className="user-role">Gerente comercial</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
