import LoadingSkeleton from "./LoadingSkeleton.jsx";
import styles from "./EvidenceCardSkeleton.module.css";

/**
 * Skeleton loader for EvidenceCard component
 */
const EvidenceCardSkeleton = () => {
  return (
    <article className={styles.card}>
      <LoadingSkeleton variant="image" height="200px" />
      <div className={styles.content}>
        <LoadingSkeleton variant="text" width="70%" height="18px" />
        <div className={styles.metadata}>
          <LoadingSkeleton variant="text" width="80%" height="14px" />
          <LoadingSkeleton variant="text" width="90%" height="14px" />
          <LoadingSkeleton variant="text" width="60%" height="14px" />
        </div>
      </div>
    </article>
  );
};

export default EvidenceCardSkeleton;
