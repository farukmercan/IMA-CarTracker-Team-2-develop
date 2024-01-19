// Hauptersteller: Tom Bernauer
//Alle Segmente, die mit dem GlobalFetcher und dem Store zusammenarbeiten: Ilhan Bahadir
<template>
     <Navigation/> 

     <div class="pagetitel">Öl/Wassertemperaturen Temperatur</div>

  <div  @click="goBack">
      <div class="arrow"><i class='bx bx-left-arrow-alt'></i></div>
      </div>
  
      <button @click="toggleLiveModeoil" class="toggle-button-oil" v-show="show">
      {{ liveModeoil ? 'Zeitraum' : 'Live Modus' }}
    </button>
    <button @click="toggleLiveModewater" class="toggle-button-water" v-show="show">
      {{ liveModewater ? 'Zeitraum' : 'Live Modus' }}
    </button>

      <container  v-if="liveModeoil" class = "chart-oel" v-show="show"><ChartOel/></container>
      <container  v-if="liveModewater" class = "chart-wasser" v-show="show"><ChartWater/></container>

      <container v-if="!liveModeoil" class="timeframe-oel" v-show="show1"><TimeframeOel/></container>
      <container v-if="!liveModewater"  class="timeframe-wasser" v-show="show1"><TimeframeWasser/></container>
  
      <img
    class="png-auto-dashboard"
    :src="getLatestCarPath"
    alt=""
    />
 
      
      
      <div class="wasser-value">{{Math.round (this.carData.water_temperature || 0 )+ ' °' }}</div>
      <div class="oel-value">{{Math.round (this.carData.oil_temperature || 0 )+ ' °' }}</div>
      <i class='bx bx-droplet wasser-icon'></i>
      <i class='bx bxs-droplet oel-icon'></i>
      
      
      <div class="auto-titel"></div>
  </template>
  
  
  
  <script>
    import { defineComponent } from "vue";
    import Navigation from '../components/Navigation.vue';
 
    import ChartOel from "../components/ChartOel.vue";
    import ChartWater from "../components/ChartWater.vue";
    import store from '../store/store';
    import { fetchCarData } from '../globals/GlobalFetcher.js';
    import TimeframeOel from "../components/TimeframeOel.vue";
    import TimeframeWasser from "../components/TimeframeWasser.vue";
  
    export default defineComponent({
      name: "Temperaturen",
      data() {
      return {
        carData: {},
        show: true,
        show1: true,
      liveModeoil: true,
      liveModewater: true,
      };
    },
    async mounted() {
    // Daten bei der Initialisierung abrufen
    await this.fetchAndProcessData();

    // Die fetchAndProcessData-Methode alle 4 Sekunden aufrufen
    setInterval(this.fetchAndProcessData, 4000);
  },
      components: { ChartOel, ChartWater, Navigation, TimeframeOel, TimeframeWasser },
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
      toggleLiveModeoil() {
      console.log("Toggling live mode");
      this.liveModeoil = !this.liveModeoil;
    },
    toggleLiveModewater() {
      console.log("Toggling live mode");
      this.liveModewater = !this.liveModewater;
    },
      },
   });
  </script>

<style scoped>
.pagetitel {
  position: fixed;
  top: 12%;
  left: 40%;
  font-size: 18px;
  color:var(--text-color);
}

.toggle-button-oil {
  position: absolute;
  top: 277px;
  left: 47px;
  cursor: pointer;
  z-index: 1000;
  padding: 10px;
  background-color: rgba(255, 159, 64, 0.9);
  color: var(--text-color); 
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-button-oil:hover {
  background-color: rgba(255, 159, 64, 0.9);
}
.toggle-button-water {
  position: absolute;
  top: 277px;
  left: 1390px;
  cursor: pointer;
  z-index: 1000;
  padding: 10px;
  background-color: rgba(54, 162, 235, 1);
  color: var(--text-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-button-water:hover {
  background-color: rgba(54, 162, 235, 0.9);
}

.timeframe-oel {
  position: absolute;
  top: 43vh;
  left: 3vw;
  max-width: 30vw; 
  max-height: 20vh;
}

.timeframe-wasser {
  position: absolute;
  top: 43vh;
  left: 51vw;
  max-width: 30vw; 
  max-height: 20vh;
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
    .wasser-icon {
      position: absolute;
      top: 27%;
      left: 82%;
      width: 50px;
      height: 37px;
      font-size: 30px;
      object-fit: cover;
      color:var(--text-color);
    }
    .wasser-value {
      position: absolute;
      top: 25%;
      left: 75%;
      font-size: 50px;
      font-weight: 300;
      display: inline-block;
      width: 100px;
      height: 42px;
      color:var(--text-color);
    }
    .oel-value {
      position: absolute;
      top: 25%;
      left: 15%;
      font-size: 50px;
      font-weight: 300;
      display: inline-block;
      width: 100px;
      height: 42px;
      color:var(--text-color);
    }
    .oel-icon {
      position: absolute;
      top: 27%;
      left: 22%;
      width: 50px;
      height: 42px;
      font-size: 30px;
      object-fit: cover;
      color:var(--text-color);
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
   
    .chart-oel {
      position: absolute;
      top: 45vh;
      left: 3vw;
    }
    .chart-wasser {
      position: absolute;
      top: 45vh;
      left: 50vw;
    }

    .arrow {
    position: absolute;
  top: 14%;
  left: 10%;
  font-size: 30px;
  font-weight: 600;
  font-family: 'Poppins';
  color: #fff;
  cursor: pointer;
  }
  .arrow:hover{ 
  color:#426b1f;
  }
  </style>