
let URL = "http://127.0.0.1:5000/neighborhood";

// Obtain the API using d3
d3.json(URL)
.then(data => {
  let topNeighborhoods = data.slice(0, 5); // Obtains the top 5 neighborhoods

  // Create the table
  let tableContainer = d3.select("#neighborhood-table");
  let table = tableContainer.append("table");
  let thead = table.append("thead");
  let tbody = table.append("tbody");

  // Create table header
  thead.append("tr")
    .selectAll("th")
    .data(["Neighborhood", "Total Offense"])
    .enter()
    .append("th")
    .text(d => d);

  // Populate table rows
  let rows = tbody.selectAll("tr")
    .data(topNeighborhoods)
    .enter()
    .append("tr");

  // Populate table cells
  rows.append("td").text(d => d.neighborhood);
  rows.append("td").text(d => d.total_offense);
})
.catch(error => console.error("Error fetching data:", error));