// Hauptersteller: Tom Bernauer
//Alle Segmente, die mit dem GlobalFetcher und dem Store zusammenarbeiten: Ilhan Bahadir

<template>
    <Navigation/>

    <div class="pagetitel">Lenkung</div>

  <container class = "chart-lenkung"><ChartLenkung/></container>
  <div  @click="goBack">
  <div class="arrow"><i class='bx bx-left-arrow-alt'></i></div>
  </div>
  <div class="lenkung-value">{{ Math.round(this.carData.steering || 0 ) + '°'}}</div>
  <img
    class="png-auto"
    :src="getLatestCarPath"
    alt=""
    />
 
  <div class="auto-titel"></div>
    


</template>
<script>
import { defineComponent } from "vue";
import Navigation from '../components/Navigation.vue';
import { fetchCarData } from '../globals/GlobalFetcher.js';
import ChartLenkung from "../components/ChartLenkung.vue";
import store from "../store/store";


export default defineComponent({
  name: "Lenkung",
  data() {
      return {
        carData: {},
      };
  },
  async mounted() {
    // Daten bei der Initialisierung abrufen
    await this.fetchAndProcessData();

    // Die fetchAndProcessData-Methode alle 4 Sekunden aufrufen
    setInterval(this.fetchAndProcessData, 4000);
  },

  components: {  ChartLenkung, Navigation },
  
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
  },
});
</script>

<style scoped>
.pagetitel {
  position: fixed;
  top: 12%;
  left: 48%;
  font-size: 18px;
  color:var(--text-color); 
}

.lenkung-value {
  position: absolute;
  top: 22%;
  left: 13%;
  font-size: 100px;
  color:var(--text-color); 
  font-family: 'Manrope';
}

.png-auto {
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
  color:var(--text-color); 
  white-space: nowrap; /* Verhindert, dass der Text umbrochen wird */
}

.chart-lenkung {
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
    color:var(--text-color); 
    cursor: pointer;
  }
  .arrow:hover{ 
  color:#426b1f;
  }
</style>