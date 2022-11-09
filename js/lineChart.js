// Graph CSV data using chart.js


async function getData(){
    const response = await fetch('../data/data.csv');
    const data = await response.text() // CSV in TEXT format
    const table = data.split('\n').slice(1); // split by line and remove the 0th row
    
    const xDays = []; //x-axis labels = year values
    const yConeflowerPre  = []; //y-axis labels = diameter of bacteria zone 
    const yConeflowerHome= [];
    const yOreganoPre = [];
    const yOreganoHome = [];
    const ySoap = [];

    table.forEach(row => {              // operate on each row
        const columns = row.split(','); // split each row into col.
        const day = columns[0];        // assign year value
        xDays.push(day);              // Push year value into array xYears

        const cpdiameter = parseFloat(columns[1]);        // diameter of anitbacterial zones
        yConeflowerPre.push(cpdiameter);              //push diameter value into array ConeflowerPre

        const chdiameter = parseFloat(columns[2]);      // Coneflower Homemade
        yConeflowerHome.push(chdiameter);

        const opdiameter = parseFloat(columns[3]);      // Oregano Premade
        yOreganoPre.push(opdiameter);

        const ohdiameter = parseFloat(columns[4]);      // Oregano Homemade
        yOreganoHome.push(ohdiameter);

        const sdiameter = parseFloat(columns[5]);       // Soap 
        ySoap.push(sdiameter);
    })
    return {xDays, yConeflowerPre, yConeflowerHome, yOreganoPre, yOreganoHome, ySoap};
}

async function createChart(){
   const data = await getData();                    // createChart() will wait until getData() processes

    // Configured for chart.JS 3.x and above

const ctx = document.getElementById('myChart');

const degSymbol = String.fromCharCode(176);

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.xDays,
        datasets: [{
            label: 'Diameter of Antibacterial Zone in cm for Coneflower Premade',
            data: data.yConeflowerPre,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Diameter of Antibacterial Zone in cm for Coneflower Homemade',
            data: data.yConeflowerHome,
            backgroundColor: 'rgba(0, 102, 255, 0.2)',
            borderColor: 'rgba(0, 102, 255, 0.2)',
            borderWidth: 1
        },
        {
            label: 'Diameter of Antibacterial Zone in cm for Oregano Premade',
            data: data.yOreganoPre,
            backgroundColor: 'rgba(0, 222, 195, 0.2)',
            borderColor: 'rgba(0, 222, 195, 0.2)',
            borderWidth: 1
        },
        {
            label: 'Diameter of Antibacterial Zone in cm for Oregano Homemade',
            data: data.yOreganoHome,
            backgroundColor: 'rgba(10, 222, 255, 0.2)',
            borderColor: 'rgba(10, 222, 255, 0.2)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,                   // Re-size based on screen size
        scales: {                           // x & y axes display options
            x: {
                title: {
                    display: true,
                    text: 'Day',
                    font: {
                        size: 20
                    },
                },
                ticks: {
                    callback: function(val, index){
                        return index % 5 === 0 ? this.getLabelForValue(val) : '';
                    }
                },
                font: {
                    size: 16
                },
            },
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Diameter of Antibacterial Zone in cm',
                    font: {
                        size: 20
                    },
                },
                ticks: {
                    maxTicksLimit: data.yTemps.length/10,
                    font: {
                        size: 16
                    }
                }
            }
        },
        plugins: {                          // title and legend display options
            title: {
                display: true,
                text: 'Diameter of Antibacterial Zones per Day After Application',
                font: {
                    size: 24
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                position: 'top'
            }
        }
    }
});
}
 
createChart()