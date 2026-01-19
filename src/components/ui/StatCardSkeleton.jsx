import LoadingSkeleton from "./LoadingSkeleton.jsx";
import styles from "./StatCardSkeleton.module.css";

/**
 * Skeleton loader for StatCard component
 */
const StatCardSkeleton = () => {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <LoadingSkeleton variant="text" width="60%" height="14px" />
        <LoadingSkeleton variant="text" width="40%" height="24px" />
      </div>
      <LoadingSkeleton variant="circle" width="50px" height="50px" />
    </article>
  );
};

export default StatCardSkeleton;
