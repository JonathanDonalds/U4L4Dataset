var conEdSum = 0
var nationalGridSum = 0

async function fetchCSV() {
    try {
        const response = await fetch('Natural_Gas_Consumption_by_ZIP_Code_-_2010_20241223.csv')
        const data = await response.text()
        const rows = data.split("\n").slice(1)

        rows.forEach((elem) => {
            const row = elem.split(",")
            const consumption = parseInt(row[row.length - 2]);
            
            if (!isNaN(consumption)) {
                if (row.includes('ConEd')) {
                    conEdSum += consumption
                } else if (row.includes('National Grid')) {
                    nationalGridSum += consumption
                }
            }
        });

        setChart()
    }
    catch (error) {
        console.error("Error fetching or processing CSV:", error);
    }
}

async function setChart() {
    Chart.defaults.color = '#FFFFFF';
    const ctx = document.getElementById('myChart')
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["ConEd", "National Grid"],
            datasets: [{
                label: 'Natural Gas Consumption (GJ)',
                data: [conEdSum, nationalGridSum],
                borderWidth: 1
            }]
        },
        options: {
            layout: {
                padding: 100
            },
            plugins: {
                title: {
                    color: 'yellow',
                    display: true,
                    text: 'Natural Gas Consumption In GJ By Utility Company (2010)',
                    font: {
                        size: 40
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return value + ' GJ'
                        }
                    }
                }
            }
        }
    });
}

fetchCSV()