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
  const caloriesByDate = {};

  history.forEach((item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    caloriesByDate[date] =
      (caloriesByDate[date] || 0) + item.calories;
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
        borderDash: [6, 6],
        pointRadius: 0,
      },
    ],
  };

const options = {
  responsive: true,
  maintainAspectRatio: false, // ⭐ THIS FIXES SIZE
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: dailyGoal + 200,
    },
  },
};


return (
  <div className="relative h-[260px] sm:h-[320px]">
    <Bar
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { boxRadius: 6 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#eee" }
          },
          x: {
            grid: { display: false }
          }
        }
      }}
    />
  </div>
);


}

export default CaloriesChart;
