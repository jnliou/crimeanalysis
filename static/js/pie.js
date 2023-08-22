let dataURL = "http://127.0.0.1:5000/pie";

// Pie Chart 
// Fetch JSON data from the file
d3.json(dataURL).then(function(jsonData) {
    var neighborhoodSelect = d3.select("#neighborhood");
    var timePeriodSelect = d3.select("#timePeriod");
  
    // Populate neighborhood and time period dropdowns
    var neighborhoods = Array.from(new Set(jsonData.map(d => d.neighbourhood)));
    neighborhoods.forEach(neighborhood => {
      neighborhoodSelect.append("option").attr("value", neighborhood).text(neighborhood);
    });
  
    var timePeriods = Array.from(new Set(jsonData.map(d => d.period)));
    timePeriods.forEach(timePeriod => {
      timePeriodSelect.append("option").attr("value", timePeriod).text(timePeriod);
    });
  
    // Initialize chart data
    var initialNeighborhood = neighborhoods[0];
    var initialTimePeriod = timePeriods[0];
    var initialFilteredData = jsonData.filter(d => d.neighourhood === initialNeighborhood && d.period === initialTimePeriod);
  
    // Update chart when filters change
    function updateChart() {
      var selectedNeighborhood = neighborhoodSelect.property("value");
      var selectedTimePeriod = timePeriodSelect.property("value");
  
      var filteredData = jsonData.filter(d => d.neighbourhood === selectedNeighborhood && d.period === selectedTimePeriod);
  
      var labels = filteredData.map(d => d.category);
      var values = filteredData.map(d => d.count);
  
      var trace = {
        labels: labels,
        values: values,
        type: "pie",
        textinfo: "percent+label",
      };
  
      //Adjust layout to get pie chart and pivot table together.
      var layout = {
        title: {
          text: "Pie Chart of Top 8 Offense Categories with Top 3 Neighbourhoods with Crime and Time Period of Offense",
          font: { size: 10 }, 
        },
        width: 800, 
        height: 470, 
        margin: { l: 40, r: 40, t: 40, b: 40 }, // Adjust margins as needed
      };
  
      Plotly.newPlot("pie", [trace], layout);
    }
  
    neighborhoodSelect.on("change", updateChart);
    timePeriodSelect.on("change", updateChart);
  
    // Initial chart rendering
    updateChart();
  });

// Pivot table
d3.json(dataURL).then(function(jsonData) {
  const neighborhoods = [...new Set(jsonData.map(d => d.neighbourhood))];
  const timePeriods = ["Morning", "Afternoon", "Evening", "Night"];
  const timePeriodDescriptions = {
    "Morning": "Morning (0500-1200)",
    "Afternoon": "Afternoon (1200-1700)",
    "Evening": "Evening (1700-2100)",
    "Night": "Night (2100-0500)"
  };

  const neighborhoodSelect = d3
      .select("#neighborhood2")
      .on("change", updatePivotTable);

  neighborhoodSelect.selectAll("option")
      .data(neighborhoods)
      .enter()
      .append("option")
      .text(d => d);

  const pivotTable = d3.select("#pivot-table")
      .append("table")
      .attr("class", "pivot-table");

  function updatePivotTable() {
      const selectedNeighborhood = neighborhoodSelect.node().value;
      const filteredData = jsonData.filter(d => d.neighbourhood === selectedNeighborhood);

      const pivotData = {};

      // Initialize pivot data
      timePeriods.forEach(timePeriod => {
          pivotData[timePeriod] = { count: 0, percentage: 0 };
      });

      // Calculate total offenses and percentage for each time period
      filteredData.forEach(d => {
          pivotData[d.period].count += d.count;
      });

      const totalCrimeCount = filteredData.reduce((sum, d) => sum + d.count, 0);

      timePeriods.forEach(timePeriod => {
          pivotData[timePeriod].percentage = ((pivotData[timePeriod].count / totalCrimeCount) * 100).toFixed(2) + "%";
      });

      // Remove existing table content
      pivotTable.selectAll("*").remove();

      // Create table header row
      const tableHeader = pivotTable.append("tr");
      tableHeader.append("th").text("Time Period");
      tableHeader.append("th").text("Total Offenses");
      tableHeader.append("th").text("Percentage");

      // Create table rows
      timePeriods.forEach(timePeriod => {
          const tableRow = pivotTable.append("tr");
          tableRow.append("td").text(timePeriodDescriptions[timePeriod]);
          tableRow.append("td").text(pivotData[timePeriod].count);
          tableRow.append("td").text(pivotData[timePeriod].percentage);
      });
  }

  // Call the update function to initialize the pivot table
  updatePivotTable();
})
.catch(error => console.error("Error fetching data:", error));
