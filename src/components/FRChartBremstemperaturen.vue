//Hauptersteller: Tom Bernauer

<template>
    <div class="chartBox">
      <canvas id="myChartBrakeSurfaceTemperaturefr"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const data = {
        labels: [],
        datasets: [{
          label: 'Brake Surface Temperature (FR)',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
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
                  // Fetch data from API for Brake Surface Temperature (FR)
                  fetch('https://cartrackerapi.onrender.com/api/v1/fahrzeuge/67c012ef-39f7-48c1-8d7a-092fcad45c08/messwerte?type=brakeSurfaceTemperaturefr')
                    .then(response => response.json())
                    .then(apiData => {
                      // Add new data to the chart
                      chart.data.labels.push(new Date().toLocaleTimeString());
                      chart.data.datasets[0].data.push(apiData.messwerte[0].brakeSurfaceTemperaturefr);
                    });
                }
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      };
  
      const myChartBrakeSurfaceTemperaturefr = new Chart(
        document.getElementById('myChartBrakeSurfaceTemperaturefr'),
        config
      );
    }
  };
  </script>
  
  <style scoped>
 .chartBox {
    width: 450px;
  padding: 10px;
  border-radius: 20px;
  border: solid 3px rgba(75, 192, 192, 1);
  }
  </style>
  