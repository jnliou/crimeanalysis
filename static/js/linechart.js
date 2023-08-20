// chart.js

let crimeURL = "http://127.0.0.1:5000/line"; 

const crimeDropdown = document.getElementById("crimeDropdown");
const lineChartCanvas = document.getElementById("lineChart");

const ctx = lineChartCanvas.getContext("2d");
const xValues = [];
const datasets = {};

const lineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: []
  },
  options: {
    responsive: true, 
    legend: { display: false },
    scales: {
      yAxes: [{ ticks: { min: 0, max: 20000 } }],
    },
    plugins: {

    title: {
      display: true,
      text: "Crime Rate Analysis by Category, 2019-2023"
    }
  } }
});

crimeDropdown.addEventListener("change", async function() {
  const selectedCrime = crimeDropdown.value;
  lineChart.data.datasets = datasets[selectedCrime];
  console.log(datasets[selectedCrime])
  lineChart.update();
});

async function fetchData() {
  try {
    const response = await fetch(crimeURL);
    const data = await response.json();

    data.forEach(entry => {
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
      

      datasets[crimeAgainst]
      const datasetIndex = datasets[crimeAgainst].findIndex(dataset => dataset.label === category);
      if (datasetIndex !== -1) {
        datasets[crimeAgainst][datasetIndex].data.push(totalOffense);
      } else {
        datasets[crimeAgainst].push({
          label: category,
          data: [totalOffense],
          fill: false,
          // lineTension: 0.5,
          // backgroundColor: "white",
          // borderColor: "black"
        });
      }
    });
console.log(datasets)

    crimeDropdown.dispatchEvent(new Event("change")); // Trigger initial chart update
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
