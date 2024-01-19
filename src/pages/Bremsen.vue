// Hauptersteller: Tom Bernauer
//Alle Segmente, die mit dem GlobalFetcher und dem Store zusammenarbeiten: Ilhan Bahadir

<template>
  <Navigation/>

  <div class="pagetitel">Bremstemperaturen</div>

<container class = "chart-flbremstemperaturen"><FLChartBremstemperaturen/></container>
<container class = "chart-frbremstemperaturen"><FRChartBremstemperaturen/></container>
<container class = "chart-rlbremstemperaturen"><RLChartBremstemperaturen/></container>
<container class = "chart-rrbremstemperaturen"><RRChartBremstemperaturen/></container>

<div  @click="goBack">
<div class="arrow"><i class='bx bx-left-arrow-alt'></i></div>
</div>


<img
  class="porsche-von-oben"
  alt=""
  src="/Chassis.png"
/>

<img class="dreieck-hr-icon" alt="" src="/dreieck-hr.svg" />
<img class="dreieck-hl-icon" alt="" src="/dreieck-hl.svg" />
<img class="dreieck-vr-icon" alt="" src="/dreieck-hr.svg" />
<img class="dreieck-vl-icon" alt="" src="/dreieck-hl.svg" />

<div class="reifen-hr-value">{{ Math.round(this.carData.brakeSurfaceTemperaturerr || 0 )}}°</div>
<div class="reifen-hl-value">{{ Math.round(this.carData.brakeSurfaceTemperaturerl || 0 ) }}°</div>
<div class="reifen-vr-value">{{ Math.round(this.carData.brakeSurfaceTemperaturefr || 0 ) }}°</div>
<div class="reifen-vl-value">{{ Math.round(this.carData.brakeSurfaceTemperaturefl || 0 ) }}°</div>

<div class="bremsen-header"></div>

</template>
<script>
import { defineComponent } from "vue";
import Navigation from '../components/Navigation.vue';
import FLChartBremstemperaturen from "../components/FLChartBremstemperaturen.vue";
import FRChartBremstemperaturen from "../components/FRChartBremstemperaturen.vue";
import RLChartBremstemperaturen from "../components/RLChartBremstemperaturen.vue";
import RRChartBremstemperaturen from "../components/RRChartBremstemperaturen.vue";
import { fetchCarData } from '../globals/GlobalFetcher.js';


export default defineComponent({
name: "Bremsen",
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

components: {FLChartBremstemperaturen,FRChartBremstemperaturen,RLChartBremstemperaturen, RRChartBremstemperaturen, Navigation },
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
} 
});
</script>




<style scoped>
.pagetitel {
  position: fixed;
  top: 13%;
  left: 44%;
  font-size: 18px;
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
.porsche-von-oben {
position: absolute;
top: 10rem;
left: 540px;
width: 435px;
height: 498px;
object-fit: cover;
}
.dreieck-hr-icon {
position: absolute;
top: 575px;
left: 880px;
border-radius: 20px;
width: 46.5px;
height: 15.9px;
}
.dreieck-hl-icon {
position: absolute;
top: 580px;
left: 590px;
border-radius: 20px;
width: 46.5px;
height: 15.9px;
}
.dreieck-vr-icon {
position: absolute;
top: 250px;
left: 880px;
border-radius: 20px;
width: 46.5px;
height: 15.9px;
}
.dreieck-vl-icon {
position: absolute;
top: 250px;
left: 590px;
border-radius: 20px;
width: 46.5px;
height: 15.9px;
}
.reifen-hr-value {
position: absolute;
top: 570px;
left: 930px;
font-weight: 300;
display: inline-block;
width: 99px;
height: 43px;
color:var(--text-color); 
}
.reifen-hl-value {
position: absolute;
top: 575px;
left: 550px;
font-weight: 300;
display: inline-block;
width: 99px;
height: 43px;
color: var(--text-color); 
}
.reifen-vr-value {
position: absolute;
top: 245px;
left: 930px;
font-weight: 300;
display: inline-block;
width: 99px;
height: 43px;
color:var(--text-color); 
}
.reifen-vl-value {
position: absolute;
top: 245px;
left: 550px;
font-weight: 300;
display: inline-block;
width: 99px;
height: 43px;
color:var(--text-color); 
}

.bremsen-header {
position: absolute;
top: 62px;
left: 174px;
width: 1064px;
height: 67px;
font-size: 21px;
font-family: 'Poppins';
}

.chart-flbremstemperaturen {
position: absolute;
top: 180px;
left: 50px;
max-width: 100%; 
max-height: 100%;
}
.chart-frbremstemperaturen {
position: absolute;
top: 180px;
left: 1000px;
max-width: 100%; 
max-height: 100%;
}
.chart-rlbremstemperaturen {
position: absolute;
top: 480px;
left: 50px;
max-width: 100%; 
max-height: 100%;
}
.chart-rrbremstemperaturen {
position: absolute;
top: 480px;
left: 1000px;
max-width: 100%; 
max-height: 100%;
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