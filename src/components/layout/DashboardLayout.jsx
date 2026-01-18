import Sidebar from "../navigation/Sidebar.jsx";
import Topbar from "../navigation/Topbar.jsx";
import styles from "./DashboardLayout.module.css";

const DashboardLayout = ({ title, subtitle, children }) => {
  return (
    <div className={styles.appShell}>
      <Sidebar />
      <div className={styles.appBody}>
        <Topbar title={title} subtitle={subtitle} />
        <main className={styles.appContent}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
