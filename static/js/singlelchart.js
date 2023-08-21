// URL for fetching line chart data
const lineURL = "http://127.0.0.1:5000/single";

// Get necessary DOM elements
const options = document.getElementById("optionsContainer");
const singleChartCanvas = document.getElementById("singleChart");
const ctx2 = singleChartCanvas.getContext("3d");

// Arrays and objects for storing data and configurations
const xValues2 = [];
const datasets2 = {};
const colors = ["#FF5733", "#33FFA8", "#337CFF", "#FF33E1", "#B833FF"];

// Initialize Chart.js line chart
const singleChart = new Chart(ctx2, {
  type: "line",
  data: {
    labels: xValues2,
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
        type: "linear",
        position: "left",
        min: 0,
        max: 30000,
        ticks: {
          callback: function (value, index, values) {
            if (value % 30000 === 0 || value === 0 || value === 30000) {
              return value.toLocaleString();
            } else {
              return "";
            }
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Overall Crime Rate Analysis by Category, 2019-2023",
      },
    },
  },
});

// Event listener for crime category selection
Dropdown.addEventListener("change", async function () {
  const selectedCrime = Dropdown.value;
  lineChart2.data.datasets = datasets2[selectedCrime];
  lineChart2.update();
});

// Function to fetch data and populate the line chart
async function fetchData2() {
  try {
    const response = await fetch(lineURL);
    const data = await response.json();

    // Log the fetched data for debugging
    console.log("Fetched data:", data);

    data.forEach((entry) => {
      const crimeAgainst = entry.crimeagainst;
      const year = entry.year;
      const totalOffense = entry.total_offense;

      // Log the processed data for each entry for debugging
      console.log("Processing entry:", entry);

      if (!xValues2.includes(year)) {
        xValues2.push(year);
      }

      if (!datasets2[crimeAgainst]) {
        datasets2[crimeAgainst] = [];
      }

      const datasetIndex = datasets2[crimeAgainst].findIndex(
        (dataset) => dataset.label === crimeAgainst
      );
      if (datasetIndex !== -1) {
        datasets2[crimeAgainst][datasetIndex].data.push(totalOffense);
      } else {
        const colorIndex = datasets2[crimeAgainst].length % colors.length;
        datasets2[crimeAgainst].push({
          label: crimeAgainst,
          data: [totalOffense],
          backgroundColor: colors[colorIndex],
          borderColor: colors[colorIndex],
          fill: false,
        });
      }
    });

    Dropdown.dispatchEvent(new Event("change"));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Fetch data
fetchData2();
