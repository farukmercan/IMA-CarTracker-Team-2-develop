// Hauptersteller: Tom Bernauer
//Alle Segmente, die mit dem GlobalFetcher und dem Store zusammenarbeiten: Ilhan Bahadir


<template>
<Navigation />
<div class="pagetitel">Drehzahl</div>
    
    
    <button @click="toggleLiveMode" class="toggle-button" v-show="show">
      {{ liveMode ? 'Live Modus' : 'Zeitraum' }}
    </button>
    <div v-if="liveMode" class="chart-drehzahl" v-show="show">
      <ChartDrehzahl />
    </div>
    <div v-else class="timeframe-drehzahl" v-show="show">
      <TimeframeDrehzahl />
    </div>

    <div class="rpm-text">RPM</div>
    <div class="rpm-value">{{ Math.round(this.carData.rpm || 0) }}</div>

    <div @click="goBack" class="arrow">
      <i class="bx bx-left-arrow-alt"></i>
    </div>

    <div class="auto-titel"></div>

    <img
      class="auto-bild"
      :src="getLatestCarPath"
      alt=""
    />
</template>

<script>
import { defineComponent } from "vue";
import Navigation from "../components/Navigation.vue";
import ChartDrehzahl from "../components/ChartDrehzahl.vue";
import TimeframeDrehzahl from "../components/TimeframeDrehzahl.vue";
import store from "../store/store";
import { fetchCarData } from "../globals/GlobalFetcher.js";

export default defineComponent({
  name: "Drehzahl",
  data() {
    return {
      carData: {},
      show: true,
      liveMode: true,
    };
  },
  components: { ChartDrehzahl, Navigation, TimeframeDrehzahl },
  
  async mounted() {
    // Daten bei der Initialisierung abrufen
    await this.fetchAndProcessData();

    // Die fetchAndProcessData-Methode alle 4 Sekunden aufrufen
    setInterval(this.fetchAndProcessData, 4000);
  },
  
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
      this.$router.go(-1);
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
  position: absolute;
  top: 12vh;
  left: 84vh;
  font-size: 18px;
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

.toggle-button {
  position: absolute;
  top: 250px;
  left: 1080px;
  cursor: pointer;
  z-index: 1000;
  padding: 10px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: #cacaca;
}

.auto-bild {
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

.rpm-text {
  position: absolute;
  top: 25%;
  left: 25%;
  font-weight: 100;
  color: var(--text-color);
}
.rpm-value {
  position: absolute;
  top: 25%;
  left: 10%;
  font-size: 100px;
  color: var(--text-color);
  font-family: 'Manrope';
}

.chart-drehzahl {
  position: absolute;
  top: 46vh;
  left: 30vw;
}
.timeframe-drehzahl {
  position: absolute;
  top: 40vh;
  left: 30vw;
  max-width: 28vw; 
  max-height: 18vh;
}


</style>