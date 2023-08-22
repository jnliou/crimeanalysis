// Function to fetch data from a URL using XMLHttpRequest
function fetchTotalData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            callback(data);
        }
    };
    xhr.send();
}

// Function to create the line chart
function createTotalChart(data) {
    // Extract years from data
    const years = data.map(function(record) {
        return record.year;
    });

    // Extract total offenses from data
    const totalOffenses = data.map(function(record) {
        return record.total_offense;
    });

    // Get the canvas context
    const ctx = document.getElementById('totalChart').getContext('2d');

    // Create the line chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Total Offense',
                data: totalOffenses,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                borderWidth: 2,
                tension: 0.5
                
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Total Offense'
                    }
                }
            }
        }
    });
}

// Set the URL for fetching crime data
const totalURL = "http://127.0.0.1:5000/total";

// Call the function to fetch data and create the chart
fetchTotalData(totalURL, createTotalChart);
