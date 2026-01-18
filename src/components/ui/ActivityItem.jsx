import styles from "./ActivityItem.module.css";

const ActivityItem = ({ title, detail, time }) => {
  return (
    <div className={styles.activityItem}>
      <div className={styles.activityAvatar} aria-hidden="true" />
      <div>
        <p className={styles.activityTitle}>{title}</p>
        <p className={styles.activityDetail}>{detail}</p>
      </div>
      <span className={styles.activityTime}>{time}</span>
    </div>
  );
};

export default ActivityItem;
