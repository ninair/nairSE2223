// Graph CSV data using chart.js


async function getData(){
    const response = await fetch('data/data.csv');
    const data = await response.text() // CSV in TEXT format
    
    const xDays = []; //x-axis labels = year values
    const yControl = []; //y-axis labels = diameter of bacteria zone 
    const yConeflowerPre  = []; 
    const yConeflowerHome= [];
    const yOreganoPre = [];
    const yOreganoHome = [];
    const ySoap = [];

    const table = data.split('\n').slice(1);

    table.forEach(row => {              // operate on each row
        const columns = row.split(','); // split each row into col.
        const day = columns[0];        // assign year value
        xDays.push(day);              // Push year value into array xYears


        const controldiameter = parseFloat(columns[1]); //Control
        yControl.push(controldiameter);

        const cpdiameter = parseFloat(columns[2]);        // diameter of anitbacterial zones
        yConeflowerPre.push(cpdiameter);              //push diameter value into array ConeflowerPre

        const chdiameter = parseFloat(columns[3]);      // Coneflower Homemade
        yConeflowerHome.push(chdiameter);

        const opdiameter = parseFloat(columns[4]);      // Oregano Premade
        yOreganoPre.push(opdiameter);

        const ohdiameter = parseFloat(columns[5]);      // Oregano Homemade
        yOreganoHome.push(ohdiameter);

        const sdiameter = parseFloat(columns[6]);       // Soap 
        ySoap.push(sdiameter);
    })
    return {xDays, yConeflowerPre, yConeflowerHome, yOreganoPre, yOreganoHome, ySoap};
}

async function createChart(){
   const data = await getData();                    // createChart() will wait until getData() processes

    // Configured for chart.JS 3.x and above

const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.xDays,
        datasets: [{
            label: 'Diameter of Antibacterial Zone in cm for Coneflower Premade',
            data: data.yConeflowerPre,
            backgroundColor: '#1E566C',
            borderColor: '#1E566C',
            borderWidth: 1
        },
        {
            label: 'Diameter of Antibacterial Zone in cm for Coneflower Homemade',
            data: data.yConeflowerHome,
            backgroundColor: '#367589',
            borderColor: '#367589',
            borderWidth: 1
        },
        {
            label: 'Diameter of Antibacterial Zone in cm for Oregano Premade',
            data: data.yOreganoPre,
            backgroundColor: '#5795A7',
            borderColor: '#5795A7',
            borderWidth: 1
        },
        {
            label: 'Diameter of Antibacterial Zone in cm for Oregano Homemade',
            data: data.yOreganoHome,
            backgroundColor: '#89BBCA',
            borderColor: '#89BBCA',
            borderWidth: 1
        },
        {
            label: 'Diameter of Antibacterial Zone in cm for Soap',
            data: data.ySoap,
            backgroundColor: '#1F7DAD',
            borderColor: '#1F7DAD',
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
                    //maxTicksLimit: data.yTemps.length/10,
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
 
createChart();