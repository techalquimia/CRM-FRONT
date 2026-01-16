import Sidebar from "../navigation/Sidebar.jsx";
import Topbar from "../navigation/Topbar.jsx";

const DashboardLayout = ({ title, subtitle, children }) => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-body">
        <Topbar title={title} subtitle={subtitle} />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
