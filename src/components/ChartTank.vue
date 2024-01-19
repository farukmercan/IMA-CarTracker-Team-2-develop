//Hauptersteller: Tom Bernauer

<template>
    <div class="chartBox">
      <canvas id="myChartFuelVolume"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const data = {
        labels: [],
        datasets: [
          {
            label: 'Fuel Volume',
            data: [],
            backgroundColor: 'rgba(0, 100, 0, 0.2)',
            borderColor: 'rgba(0, 100, 0, 1)',
            borderWidth: 1,
          },
        ],
      };
  
      const config = {
        type: 'line',
        data,
        options: {
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                delay: 2000,
                onRefresh: chart => {
                  // Fetch data from API for Fuel Volume
                  fetch('https://cartrackerapi.onrender.com/api/v1/fahrzeuge/67c012ef-39f7-48c1-8d7a-092fcad45c08/messwerte?type=fuel_volume')
                    .then(response => response.json())
                    .then(apiData => {
                      const timestamp = new Date().toLocaleTimeString();
                      // Add new data to the chart for Fuel Volume
                      chart.data.labels.push(timestamp);
                      chart.data.datasets[0].data.push(apiData.messwerte[0].fuel_volume);
                    });
                },
              },
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'x',
              },
              pan: {
                enabled: true,
                mode: 'x',
              },
            },
          },
        },
      };
  
      const myChartFuelVolume = new Chart(
        document.getElementById('myChartFuelVolume'),
        config
      );
    },
  };
  </script>
  
  <style scoped>
  .chartBox {
  width: 700px;
  padding: 10px;
  border-radius: 20px;
  border: solid 3px rgba(0, 100, 0, 1);
}
  </style>
  