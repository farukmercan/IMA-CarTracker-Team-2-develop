//Hauptersteller: Tom Bernauer

<template>
  <div class="chartBox">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import { fetchCarData } from '../globals/GlobalFetcher.js';

export default {
  data() {
    return {
      chart: null,
      liveMode: true,
    };
  },
  mounted() {
    this.setupChart();
  },
  methods: {
    async fetchRpmData() {
      try {
        const carData = await fetchCarData();
        return carData.rpm;
      } catch (error) {
        console.error('Fehler beim Abrufen der RPM-Daten:', error);
        throw error;
      }
    },
    async fetchDataAndRefresh(chart) {
      if (this.liveMode) {
        try {
          const rpmData = await this.fetchRpmData();
          const timestamp = new Date().toLocaleTimeString();

          // Add new data to the chart
          chart.data.labels.push(timestamp);
          chart.data.datasets[0].data.push(rpmData);

          // Limit the number of data points to prevent the chart from becoming too large
          const maxDataPoints = 20;
          if (chart.data.labels.length > maxDataPoints) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
          }

          // Update the chart
          chart.update();
        } catch (error) {
          // Handle error if needed
          console.error('Fehler beim Aktualisieren der RPM-Daten:', error);
        }
      }
    },
    setupChart() {
      const data = {
        labels: [],
        datasets: [{
          label: 'RPM - Live Mode',
          data: [],
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderColor: 'rgba(255, 255, 255, 1)',
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
                delay: 4000,
                duration: 25000,
                onRefresh: chart => this.fetchDataAndRefresh(chart)
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

      this.chart = new Chart(
        document.getElementById('myChart'),
        config
      );
    },
    toggleLiveMode() {
      this.liveMode = !this.liveMode;
      if (this.liveMode) {
        // Resume real-time mode
        this.chart.options.scales.x.realtime.onRefresh(this.chart);
      }
    },
  },
};
</script>

<style scoped>
.chartBox {
  width: 700px;
  padding: 20px;
  border-radius: 20px;
  border: solid 3px rgba(255, 255, 255, 1);
}
</style>
