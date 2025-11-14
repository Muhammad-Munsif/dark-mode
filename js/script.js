function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Views",
        data: [12, 19, 3, 5, 2],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
