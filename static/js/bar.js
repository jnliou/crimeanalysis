
const barURL = "http://127.0.0.1:5000/bar"; // Replace with your Flask API endpoint URL

// Fetch data from Flask API
fetch(barURL)
    .then(response => response.json())
    .then(data => {
        const years = data.year;
        const categories = data.category;
        const totalOffenses = data.total_offense;
        const uniqueCategories = [...new Set(categories)];

        const crimeSelect = document.getElementById('crimeSelect');
        uniqueCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            crimeSelect.appendChild(option);
        });

        let selectedCategory = uniqueCategories[0];

        crimeSelect.addEventListener('change', function(event) {
            selectedCategory = event.target.value;
            updateChart(selectedCategory);
        });

        function updateChart(category) {
            const filteredData = years.map((year, index) => {
                if (categories[index] === category) {
                    return {
                        year: year,
                        total_offense: totalOffenses[index]
                    };
                } else {
                    return null;
                }
            }).filter(item => item !== null);

            const trace = {
                x: filteredData.map(d => d.year),
                y: filteredData.map(d => d.total_offense),
                type: 'bar'
            };

            const layout = {
                title: `Bar Chart of Total Offenses by Year for ${category}`,
                xaxis: { title: 'Year' },
                yaxis: { title: 'Total Offense' }
            };

            Plotly.newPlot('bar', [trace], layout);
        }

        updateChart(selectedCategory);
    })
    .catch(error => console.error("Error fetching data:", error));