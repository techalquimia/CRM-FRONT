const ActivityItem = ({ title, detail, time }) => {
  return (
    <div className="activity-item">
      <div className="activity-avatar" aria-hidden="true" />
      <div className="activity-body">
        <p className="activity-title">{title}</p>
        <p className="activity-detail">{detail}</p>
      </div>
      <span className="activity-time">{time}</span>
    </div>
  );
};

export default ActivityItem;
