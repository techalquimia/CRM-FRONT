import styles from "./StatCard.module.css";

const StatCard = ({ label, value, trend }) => {
  const isPositive = trend.startsWith("+");

  return (
    <article className={`${styles.card} ${styles.statCard}`}>
      <div>
        <p className={styles.statLabel}>{label}</p>
        <p className={styles.statValue}>{value}</p>
      </div>
      <span className={`${styles.statTrend} ${!isPositive ? styles.down : ""}`}>
        {trend}
      </span>
    </article>
  );
};

export default StatCard;
