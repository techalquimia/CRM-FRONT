const StatCard = ({ label, value, trend }) => {
  const isPositive = trend.startsWith("+");

  return (
    <article className="card stat-card">
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
      <span className={`stat-trend ${isPositive ? "up" : "down"}`}>
        {trend}
      </span>
    </article>
  );
};

export default StatCard;
