//Hauptersteller: Tom Bernauer

<template>
  <div class="chartBox">
    <canvas id="myChartWaterTemperature"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const data = {
      labels: [],
      datasets: [{
        label: 'Water Temperature',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
                // Fetch data from API for Water Temperature
                fetch('https://cartrackerapi.onrender.com/api/v1/fahrzeuge/67c012ef-39f7-48c1-8d7a-092fcad45c08/messwerte?type=water_temperature')
                  .then(response => response.json())
                  .then(apiData => {
                    // Add new data to the chart
                    chart.data.labels.push(new Date().toLocaleTimeString());
                    chart.data.datasets[0].data.push(apiData.messwerte[0].water_temperature);
                  });
              }
            }
          },
          y: {
            beginAtZero: true
          }
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
      }
    };

    const myChartWaterTemperature = new Chart(
      document.getElementById('myChartWaterTemperature'),
      config
    );
  }
};
</script>

<style scoped>
.chartBox {
  width: 700px;
  padding: 10px;
  border-radius: 20px;
  border: solid 3px rgba(54, 162, 235, 1);
}
</style>
