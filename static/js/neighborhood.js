
let URL = "http://127.0.0.1:5000/neighborhood";

d3.json(URL)
.then(data => {
  const topNeighborhoods = data.slice(0, 5); // Get the top 5 neighborhoods

  // Create the table
  const tableContainer = d3.select("#neighborhood-table");
  const table = tableContainer.append("table");
  const thead = table.append("thead");
  const tbody = table.append("tbody");

  // Create table header
  thead.append("tr")
    .selectAll("th")
    .data(["Neighborhood", "Total Offense"])
    .enter()
    .append("th")
    .text(d => d);

  // Populate table rows
  const rows = tbody.selectAll("tr")
    .data(topNeighborhoods)
    .enter()
    .append("tr");

  // Populate table cells
  rows.append("td").text(d => d.neighborhood);
  rows.append("td").text(d => d.total_offense);
})
.catch(error => console.error("Error fetching data:", error));