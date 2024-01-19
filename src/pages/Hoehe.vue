// Hauptersteller: Tom Bernauer
//Alle Segmente, die mit dem GlobalFetcher und dem Store zusammenarbeiten: Ilhan Bahadir

<template>
   <Navigation/>
   <div class="pagetitel">Höhe</div>

   <button @click="toggleLiveMode" class="toggle-button" v-show="show">
      {{ liveMode ? 'Live Modus' : 'Zeitraum' }}
    </button>

  <container v-if="liveMode" class = "chart-hoehe"><ChartHoehe/></container>
  
  <container v-else class = "timeframe-hoehe"><TimeframeHoehe/></container>
 

  <div  @click="goBack">
  <div class="arrow"><i class='bx bx-left-arrow-alt'></i></div>
  </div>
  <div class="hoehe-value">{{ Math.round(this.carData.altitude || 0 ) + 'm' }}</div>

  <div class="auto-titel"></div>
  
  <img
    class="png-auto-dashboard"
    :src="getLatestCarPath"
    alt=""
    />

</template>


<script>
import { defineComponent } from "vue";
import Navigation from '../components/Navigation.vue';
import ChartHoehe from "../components/ChartHoehe.vue";
import TimeframeHoehe from "../components/TimeframeHoehe.vue";
import { fetchCarData } from '../globals/GlobalFetcher.js';
import store from "../store/store";



export default defineComponent({
  name: "Hoehe",
  data() {
      return {
        carData: {},
        show: true,
      liveMode: true,
      };
  },
  async mounted() {
    // Daten bei der Initialisierung abrufen
    await this.fetchAndProcessData();

    // Die fetchAndProcessData-Methode alle 4 Sekunden aufrufen
    setInterval(this.fetchAndProcessData, 4000);
  },
  
  components: {ChartHoehe, Navigation, TimeframeHoehe },
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
  color: #fff;
}
.toggle-button {
  position: absolute;
  top: 250px;
  left: 1080px;
  cursor: pointer;
  z-index: 1000;
  padding: 10px;
  background-color: rgba(255, 206, 86, 1);
  color: var(--text-color); 
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: rgba(255, 206, 86, 0.7);
}

.timeframe-hoehe {
  position: absolute;
  top: 40vh;
  left: 30vw;
  max-width: 28vw; 
  max-height: 18vh;
}


.hoehe-value {
  position: absolute;
  top: 22%;
  left: 13%;
  font-size: 100px;
  color: var(--text-color); 
  font-family: 'Manrope';
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

.chart-hoehe {
  position: absolute;
  top: 42vh;
  left: 30vw;
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