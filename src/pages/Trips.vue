// Hauptersteller: Tom Bernauer
//Alle Segmente, die mit dem GlobalFetcher und dem Store zusammenarbeiten: Ilhan Bahadir

<template>
     <Navigation/> 

     <div class="pagetitel">Trips</div>

  <div  @click="goBack">
      <div class="arrow"><i class='bx bx-left-arrow-alt'></i></div>
      </div>

      <div class="lenkung-value">{{ Math.round(this.carData.trip || 0 ) + 'm'}}</div>

      <button @click="toggleLiveMode" class="toggle-button" v-show="show">
      {{ liveMode ? 'Live Modus' : 'Zeitraum' }}
    </button>
  
      <container v-if="liveMode" class = "chart-trips"><ChartTrips/></container>

      <container v-else class="timeframe-trips"><TimeframeTrips/></container>
      
      
      
      <img
    class="png-auto-dashboard"
    :src="getLatestCarPath"
    alt=""
    />
 
      
      <div class="auto-titel"></div>
     
  </template>
  
  <script>
    import { defineComponent } from "vue";
    import { fetchCarData } from '../globals/GlobalFetcher.js';
    import Navigation from '../components/Navigation.vue';
    import MesswerteDropdown from "../components/MesswerteDropdown.vue";
    import ChartTrips from "../components/ChartTrips.vue";
    import store from "../store/store";
    import TimeframeTrips from "../components/TimeframeTrips.vue";


    export default defineComponent({
      name: "Trips",
      data() {
      return {
        carData: {},
        show: true,
      liveMode: true,
      };
  },
      components: { MesswerteDropdown, ChartTrips, Navigation, TimeframeTrips },
      
      computed: {
      getLatestCarPath() {
      const carDataArray = store.getters.getCarInformation; // Anpassung hier

      if (carDataArray.length > 0) {
        const latestPath = carDataArray[carDataArray.length - 1].path;
        return latestPath;
      } else {
        return null;
      }
    },
  },

  async mounted() {
    // Daten bei der Initialisierung abrufen
    await this.fetchAndProcessData();

    // Die fetchAndProcessData-Methode alle 4 Sekunden aufrufen
    setInterval(this.fetchAndProcessData, 4000);
  },
    
    methods: {

      async fetchAndProcessData() {
      try {
        const newData = await fetchCarData();
        this.carData = newData;
        // Weitere Verarbeitung der Daten hier
      } catch (error) {
        console.error('Fehler beim Laden der Fahrzeugdaten:', error);
      }
    },


        goBack() {
        // Navigiere zur vorherigen Seite
        this.$router.go(-1); // Diese Zeile funktioniert in Vue Router
        // Alternativ: window.history.back();
      },
      toggleLiveMode() {
      console.log("Toggling live mode");
      this.liveMode = !this.liveMode;
    },
      },
   });
  </script>
  <style scoped>
  .pagetitel {
  position: fixed;
  top: 12%;
  left: 48%;
  font-size: 18px;
  color: var(--text-color);
}

.toggle-button {
  position: absolute;
  top: 250px;
  left: 1080px;
  cursor: pointer;
  z-index: 1000;
  padding: 10px;
  background-color: rgba(255, 99, 132, 1);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: rgba(255, 99, 132, 0.7);
}
  
  .png-auto-dashboard {
    position: absolute;
  top: 28%;
  left: 50%;
  width: 70%;
  height: 70%;
  transform: translate(-50%, -50%);
  height: auto;
  object-fit: contain;
  opacity: 0.7;
  }
  .auto-titel {
    position: absolute;
top: 15%; /* Zentrieren vertikal */
left: 50%; /* Zentrieren horizontal */
transform: translate(-50%, -50%);
font-weight: 600;
font-family: 'Poppins', sans-serif;
color: var(--text-color);
white-space: nowrap; /* Verhindert, dass der Text umbrochen wird */
  }
  .chart-trips {
    position: absolute;
  top: 42vh;
  left: 30vw;
  }

  .timeframe-trips {
    position: absolute;
  top: 40vh;
  left: 30vw;
  max-width: 28vw; 
  max-height: 18vh;
}

.lenkung-value {
  position: absolute;
  top: 22%;
  left: 13%;
  font-size: 100px;
  color: var(--text-color);
  font-family: 'Manrope';
}
  .arrow {
    position: absolute;
    top: 14%;
    left: 10%;
    font-size: 30px;
    font-weight: 600;
    font-family: 'Poppins';
    color: var(--text-color);
  }

  .arrow {
  position: absolute;
  top: 14%;
  left: 10%;
  font-size: 30px;
  font-weight: 600;
  font-family: 'Poppins';
  color: var(--text-color);
  cursor: pointer;
}
.arrow:hover{ 
  color:#426b1f;
  }
</style>