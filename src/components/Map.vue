//Hauptersteller: Faruk Mercan

<template>
  <div>
    <div class="datepicker">
      <label for="datetimePickerStart">Start</label>
      <input type="datetime-local" id="datetimePickerStart" v-model="selectedStartDateTime" @input="debouncedLoadGPSData" step="1">
      <label for="datetimePickerEnd">Ende</label>
      <input type="datetime-local" id="datetimePickerEnd" v-model="selectedEndDateTime" @input="debouncedLoadGPSData" step="1">
      <button class="button" @click="loadGPSData">Daten laden</button>
    </div>
    <div class="map" ref="map" style="height: 600px;"></div>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce';

export default {
  data() {
    return {
      map: null,
      selectedStartDateTime: '2024-01-09T16:48:50',
      selectedEndDateTime: '2024-01-11T16:48:50',
      polyline: null,  // Referenz zur Linie für die Route
    };
  },
  mounted() {
    // Rufe die Methode zum Initialisieren der Karte auf
    this.initMap();

    // Lade die GPS-Daten beim ersten Rendern
    this.loadGPSData();
  },
  methods: {
    initMap() {
      // Initialisiere die Google Map
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: 48.4047, lng: 9.9885 },
        zoom: 10,
      });
    },
    async loadGPSData() {
      try {
        // Baue die URL basierend auf der API und dem ausgewählten Datum
        const apiEndpoint = 'https://cartrackerapi.onrender.com/api/v1/fahrzeuge/67c012ef-39f7-48c1-8d7a-092fcad45c08/gps';
        const queryParams = `von=${encodeURIComponent(this.selectedStartDateTime)}&bis=${encodeURIComponent(this.selectedEndDateTime)}`;
        const url = `${apiEndpoint}?${queryParams}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch GPS data. Status: ${response.status}`);
        }

        const data = await response.json();

        // Lösche vorhandene Marker und Route auf der Karte
        this.clearMarkers();
        this.clearRoute();

        // Setze Marker auf der Karte
        data.Koordinaten.forEach(coord => {
          const marker = new google.maps.Marker({
            position: { lat: coord.lat, lng: coord.lon },
            map: this.map,
            title: `Zeit: ${coord.time}`,
          });
        });

        // Zeichne die Route auf der Karte
        this.drawRoute(data.Koordinaten);
      } catch (error) {
        console.error('Fehler beim Laden der GPS-Daten:', error);
        console.log(URL)
      }
    },
    clearMarkers() {
      // Implementiere die Logik zum Löschen von Markern auf der Karte
      // ...
    },
    clearRoute() {
      // Lösche die bestehende Route (falls vorhanden)
      if (this.polyline) {
        this.polyline.setMap(null);
        this.polyline = null;
      }
    },
    drawRoute(coordinates) {
      // Konvertiere Koordinaten-Array in ein Array von LatLng-Objekten
      const path = coordinates.map(coord => new google.maps.LatLng(coord.lat, coord.lon));

      // Erstelle eine Polylinie für die Route
      this.polyline = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      // Zeige die Polylinie auf der Karte an
      this.polyline.setMap(this.map);
    },
  },
  computed: {
    debouncedLoadGPSData: _debounce(function () {
      this.loadGPSData();
    }, 500),
  },
};
</script>

<style scoped>

.button{
  background-color: rgb(63, 63, 63); 
  border: none;
  color: #fff;
  padding: 6px;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  cursor: pointer;
  border-radius: 8px;
  margin-left: 50px;
}

.button:hover{
  background-color: rgba(63, 63, 63, 0.2);  
}
input {
  color-scheme: dark;
  background-color: rgba(63, 63, 63);  
  border: none;
  color: #fff;
  padding: 6px;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  cursor: pointer;
  border-radius: 8px;
  margin-left: 10px; /* Reduziere den Abstand, um ihn dem Button anzupassen */
}

input:hover {
  background-color: rgba(63, 63, 63, 0.2); 
}

.datepicker {
  margin-top: 300px;
}

.map {
  margin-top: 350px;
  height: 600px;
}
</style>
