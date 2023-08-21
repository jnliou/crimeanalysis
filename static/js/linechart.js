const crimeURL = "http://127.0.0.1:5000/line";

const crimeDropdown = document.getElementById("crimeDropdown");
const lineChartCanvas = document.getElementById("lineChart");

const ctx = lineChartCanvas.getContext("2d");
const xValues = [];
const datasets = {};

// Define an array of distinct colors
const colors = [
  "#FF5733",
  "#33FFA8",
  "#337CFF",
  "#FF33E1",
  "#723bd9",
  "#FFD700",
  "#00FF08",
  "#FFA500",
  "#090a0a",
  "#8da37e",
  "#008080",
  "#8B0001",
];

const lineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [],
  },
  options: {
    responsive: true,
    legend: { display: true },
    scales: {
      x: {
        type: "category",
        position: "bottom",
      },
      y: {
        type: "logarithmic",
        position: "left",
        min: 0,       // Set the minimum value for y-axis
        max: 30000,   // Set the maximum value for y-axis
        ticks: {
          callback: function (value, index, values) {
            if (value === 0) {
              return value.toLocaleString(); // Format y-axis value 0
            } else {
              return value.toLocaleString(undefined, {
                minimumFractionDigits: 0, // Display integer part only
                maximumFractionDigits: 2, // Display up to 2 decimal places
              });
            }
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Crime Rate Analysis by Category, 2019-2023",
      },
    },
  },
});



crimeDropdown.addEventListener("change", async function () {
  const selectedCrime = crimeDropdown.value;
  lineChart.data.datasets = datasets[selectedCrime];
  lineChart.update();
});

async function fetchData() {
  try {
    const response = await fetch(crimeURL);
    const data = await response.json();

    data.forEach((entry) => {
      const category = entry.category;
      const crimeAgainst = entry.crimeagainst;
      const year = entry.year;
      const totalOffense = entry.total_offense;

      if (!xValues.includes(year)) {
        xValues.push(year);
      }

      if (!datasets[crimeAgainst]) {
        datasets[crimeAgainst] = [];
      }

      const datasetIndex = datasets[crimeAgainst].findIndex(
        (dataset) => dataset.label === category
      );
      if (datasetIndex !== -1) {
        datasets[crimeAgainst][datasetIndex].data.push(totalOffense);
      } else {
        const colorIndex = datasets[crimeAgainst].length % colors.length;
        datasets[crimeAgainst].push({
          label: category,
          data: [totalOffense],
          backgroundColor: colors[colorIndex],
          borderColor: colors[colorIndex],
          fill: false,
          tension: 0.5
        });
      }
    });

    crimeDropdown.dispatchEvent(new Event("change"));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
