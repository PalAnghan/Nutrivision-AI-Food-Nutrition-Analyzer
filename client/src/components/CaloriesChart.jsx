import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function CaloriesChart({ history = [], dailyGoal = 2000 }) {
  if (!Array.isArray(history) || history.length === 0) {
    return <p className="text-gray-500 text-sm">No chart data available</p>;
  }

  const caloriesByDate = {};

  history.forEach((item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    caloriesByDate[date] =
      (caloriesByDate[date] || 0) + (item.calories || 0);
  });

  const labels = Object.keys(caloriesByDate);
  const caloriesData = Object.values(caloriesByDate);

  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Calories per day",
        data: caloriesData,
        backgroundColor: "#4ade80",
      },
      {
        type: "line",
        label: "Daily Goal",
        data: labels.map(() => dailyGoal),
        borderColor: "red",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };
  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

  return <Bar data={data} options={options} />;

}

export default CaloriesChart;
