function HistoryList({ history }) {
  if (history.length === 0) return null;

  return (
    <div style={{ marginTop: 30 }}>
      <h3>📊 Calorie History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.food} — {item.nutrition?.calories} kcal
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;
