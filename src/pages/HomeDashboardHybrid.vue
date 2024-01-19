// Hauptersteller: Faruk Mercan
//Nebenersteller: Can Taylan Sentürk, Adrian Skeja 


<template>
  <Navigation/>

  <div class="home-dashboard-hybrid">
    
    
    <div class="home-otto-elemente">
      <div><Map/></div>
      
      <div class="gang">
    <div class="element-background" @click="onGangContainerClick"></div>
    <b class="gang-value">{{ this.carData.gear_index || 0  }}</b>
    <div class="element-titel">Gang</div>
    <div @click="onGangClick" class="arrow"><i class='bx bxs-right-arrow-circle'></i></div>
  </div>
      
      <div class="bremse">
          <div class="element-background" @click=" onBremseContainerClick"></div>
          <b class="bremse-value">{{ Math.round (this.carData.brake_input || 0  )+'%'  }}</b>
          <div class="element-titel">Bremsdruck</div>
          <div @click="onBremseClick" class="arrow"><i class='bx bxs-right-arrow-circle'></i></div>
      </div>
      
      <div class="speed">
        <div class="element-background" @click="onSpeedContainerClick"></div>
        <b class="speed-value">{{ Math.round(this.carData.airflowspeed || 0 )+'  ' + 'Km/h' }}</b>
        <div class="element-titel">Geschwindigkeit</div>
        <div @click="onGeschwindigkeitClick" class="arrow"><i class='bx bxs-right-arrow-circle'></i></div>
      </div>
      
      <div class="oel-wasser">
        <div class="element-background" @click="onLWasserContainerClick"></div>
        <i class='bx bx-droplet png-wasser-icon'></i>
        <i class='bx bxs-droplet png-oel-icon'></i>
        <b class="wasser-value">{{Math.round (this.carData.water_temperature || 0 )+ '°' }}</b>
        <b class="oel-value">{{ Math.round (this.carData.oil_temperature || 0 ) + '°' }}</b>
        <div @click="onWasserClick" class="arrow"><i class='bx bxs-right-arrow-circle'></i></div>
      </div>
      <div class="drehzahl">
        <div class="element-background" @click="onDrehzahlContainerClick"></div>
        <b class="drehzahl-value"> {{Math.round(this.carData.rpm || 0 ) + ' U/min' }}</b>
        <div class="element-titel">Drehzahl</div>
        <div @click="onDrehzahlClick" class="arrow"><i class='bx bxs-right-arrow-circle'></i></div>
      </div>
   
    </div>
    

  
    <div class="spoiler-text">Spoiler</div>
    <div class="spoiler-closed">{{ carData.spoilerF === 1.0 ? 'AUSGEFAHREN' : 'EINGEFAHREN' || 0  }}</div>
    <div class="hupe-text">Hupe</div>
    <div class="hupe-aktiv">{{ carData.horn === 1.0 ? 'AKTIV' : 'INAKTIV' || 0 }}</div>
    <div class="abs-aktiv">{{ carData.isABSBrakeActive === 1.0 ? 'AKTIV' : 'INAKTIV' || 0 }}</div>
    <div class="abs-text">ABS</div>
    <div class="bremse-text">Bremse</div>
    <div class="bremse-aktiv">{{ carData.brakelight_signal_R === 1.0 ? 'AKTIV' : 'INAKTIV' || 0 }}</div>
  


    <div class="batterie-Wert-Hybrid">85%</div>
    
    <img
      class="png-batterie-icon"
      alt=""
      src="/png-batterie-icon-elektrisch@2x.png"
    />
    
    <img
      class="batterie-balken-hintergrund-hybrid"
      alt=""
      src="/batterie-balken-hintergrund-hybrid.svg"
    />
    <img
      class="batterie-balken-aktuell-hybrid"
      alt=""
      src="/batterie-balken-aktuell-hybrid.svg"
    />
    
    
    
    
    <div class="tank-volumen">/{{ this.carData.fuel_capacity !== null ? ` ${this.carData.fuel_capacity || 0 }L` : '/'+' '+'0L' }}</div>
    
    <div class="png-tank-icon-hybrid"><i class='bx bxs-gas-pump'></i></div>
    
    <div class="tank-prozent-wert">{{ Math.round(this.carData.fuel_volume || 0 ) +'%' }}</div>

  
    
    <img
      class="tank-balken-hintergrund-hybrid"
      alt=""
      src="/batterie-balken-hintergrund-elektrisch.svg"
    />
    
    <img
      class="tank-balken-aktuell-hybrid"
      alt=""
      :src="'/tankbalken-aktuell.svg'"
      :style="{ transform: `scaleX(${this.carData.fuel_volume / 100 || 0})` }"
    />
    
    
    <img
    class="png-auto-dashboard"
    :src="getLatestCarPath"
    alt=""
    />


    
    <div class="auto-titel">{{latestCarModel}}</div>

    </div>

    
  
  
</template>







<script>
  import { defineComponent } from "vue";
  import { fetchCarData } from '../globals/GlobalFetcher.js';
  import store from '../store/store';
  import Navigation from '../components/Navigation.vue';
  import Map from '../components/Map.vue';
  

export default defineComponent({
    name: "HomeDashboardHybrid",
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

    components: { Navigation, Map,},
    
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

    latestCarModel() {
      const carDataArray = store.getters.getCarInformation;

      if (carDataArray.length > 0) {
        return carDataArray[carDataArray.length - 1].modell;
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
        console.log("Jetzt ändern sich die Daten")
        // Weitere Verarbeitung der Daten hier
      } catch (error) {
        console.error('Fehler beim Laden der Fahrzeugdaten:', error);
      }
    },

      onGangClick() {
        this.$router.push("gang");
      },
      onBremseClick() {
        this.$router.push("bremsen");
      },
      onGeschwindigkeitClick() {
        this.$router.push("geschwindigkeit");
      },
      onWasserClick() {
        this.$router.push("temperaturen");
      },
      onDrehzahlClick() {
        this.$router.push("drehzahl");
      },
      
    },
  });
</script>







<style scoped>
.arrow{
  position: absolute;
  top: 82px;
  left: 150px;
}
.arrow:hover{
  color: var(--secondary-color); 
}


  .element-titel {
    position: absolute;
    top: 20.3px;
    left: 25.7px;
    font-size: 16px;
    font-weight: 800;
    display: inline-block;
    width: 136px;
    height: 15.4px;
    color: var(--text-color); 
    cursor: pointer;
    user-select: none;
  }
  .gang {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 880px;
  color: var(--text-color); 
  cursor: pointer;
  user-select: none;
  } 

  .gang-value {
    position: absolute;
    top: 81px;
    left: 15px;
    display: inline-block;
    width: 43.6px;
    height: 37.5px;
    color: var(--text-color); 
    cursor: pointer;
    user-select: none;
  }
  
  
.element-background {
  width: 187.3px;
  height: 122.6px;
  border-radius: 20px;
  background-color: var(--secondary-color); 
  opacity: 0.1;
  cursor:pointer;
  user-select: none;
}


  .bremse {
    position: absolute;
    top: 0px;
    left: 660px;
    width: 187.3px;
    height: 122.6px;
    color: var(--text-color); 
    cursor: pointer;
    user-select: none;
  }
  

.bremse-value {
    position: absolute;
    top: 80px;
    left: 25.3px;
    display: inline-block;
    width: 43.6px;
    height: 37.5px;
    color: var(--text-color); 
    cursor: pointer;
    user-select: none;
  }

  .speed {
    position: absolute;
    top: 0px;
    left: 440px;
    width: 187.3px;
    height: 122.6px;
    color: var(--text-color); 
    cursor: pointer;
    user-select: none;
  }

  .speed-value {
    position: absolute;
    top: 80px;
    left: 25.3px;
    display: inline-block;
    width: 130px;
    height: 37.5px;
    color: var(--text-color); 
    cursor: pointer;
    user-select: none;
  }
  .png-wasser-icon {
    position: absolute;
    top: 20px;
    left: 90px;
    width: 28px;
    height: 37px;
    color: var(--text-color); 
    object-fit: cover;
    cursor: pointer;
    user-select: none;
  }
  .png-oel-icon {
    position: absolute;
    top: 20px;
    left: 10px;
    width: 52px;
    height: 37px;
    color: var(--text-color); 
    object-fit: cover;
    cursor: pointer;
    user-select: none;
  }
  .wasser-value {
    position: absolute;
    top: 81px;
    left: 90px;
    display: inline-block;
    width: 43.6px;
    height: 37.5px;
    color: var(--text-color); 
    cursor: pointer;
    user-select: none;
  }
  .oel-value {
    position: absolute;
    top: 81px;
    left: 10px;
    display: inline-block;
    width: 43.6px;
    height: 37.5px;
    color: var(--text-color); 
    cursor: pointer;
    user-select: none;
  }
  .oel-wasser {
    position: absolute;
    top: 0px;
    left: 220px;
    width: 187.3px;
    height: 122.6px;
    color: var(--text-color); 
    cursor: pointer;
    user-select: none;
  }

  .drehzahl {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 193px;
    height: 125px;
    color: var(--text-color); 
    cursor: pointer;
    user-select: none;
  }

  .drehzahl-value {
    position: absolute;
    top: 81px;
    left: 15px;
    display: inline-block;
    width: 150px;
    height: 37.5px;
    color: var(--text-color); 
    cursor: pointer;
    user-select: none;
  }
  .home-otto-elemente {
    position: absolute;
    top: 72%;
    left: 13%;
    width: 1067.3px;
    height: 125px;
    font-size: 20px;
    font-family: 'Manrope';
    user-select: none;
  }
  .batterie-Wert-Hybrid {
    position: absolute;
    top: 480px;
    left: 1271px;
    background-color: rgba(255, 255, 255, 0);
    width: 118px;
    height: 32px;
    color: var(--text-color); 
    user-select: none;
  }
  .png-batterie-icon {
    position: absolute;
    top: 485px;
    left: 1226px;
    width: 34px;
    height: 27px;
    object-fit: cover;
    user-select: none;
  }
  .batterie-balken-hintergrund-hybrid {
    position: absolute;
    top: 480px;
    left: 1008px;
    border-radius: 56px;
    width: 207px;
    height: 32px;
    user-select: none;
  }
  .batterie-balken-aktuell-hybrid {
    position: absolute;
    top: 482px;
    left: 1011px;
    border-radius: 56px;
    width: 168px;
    height: 28px;
    user-select: none;
  }


  .tank-volumen{
    position: absolute;
    top: 461px;
    left: 240px;
    background-color: rgba(255, 255, 255, 0);
    width: 118px;
    height: 32px;
    color: var(--text-color); 
    user-select: none;
  }


  .png-tank-icon-hybrid {
    position: absolute;
    top: 462px;
    left: 140px;
    width: 29px;
    height: 25px;
    object-fit: cover;
    user-select: none;
    color:#426b1f;
  }

  .tank-prozent-wert{
    position: absolute;
    top: 461px;
    left: 165px;
    width: 29px;
    height: 25px;
    object-fit: cover;
    user-select: none;
    color:white;
  }
  .tank-balken-hintergrund-hybrid {
    position: absolute;
    top: 411px;
    left: 120px;
    border-radius: 56px;
    width: 1193px;
    height: 46px;
    user-select: none;
  }
  .tank-balken-aktuell-hybrid{
    position: absolute;
    top: 415px;
    left: 124px;
    border-radius: 2000px;
    transform-origin: top left;
    transition: transform 1s ease;
    width: 1183px;
    height: 39px;
    user-select: none;
    background-color: #324722;
    border-color: #324722;
    
    
   
  }
  .png-auto-dashboard {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
 
  max-width: 120%;
  max-height: 120%;
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


.spoiler-closed {
  position: absolute;
    height: 10px;
    width: 43px; 
    top: 244px; 
    left: 1200px; 
    font-weight: 300;
    color: var(--secondary-color); 
    text-align: center;
    display: inline-block;
    user-select: none;
}

.spoiler-text {
    position: absolute;
    height: 10px; 
    width: 57px; 
    top: 244px; 
    left: 1100px; 
    font-weight: 300;
    color: var(--text-color); 
    display: inline-block;
    user-select: none;
}

.hupe-text {
    position: absolute;
    height: 10px; 
    width: 50px; 
    top: 244px; 
    left: 124px; 
    font-weight: 300;
    color: var(--text-color); 
    display: inline-block;
    user-select: none;
}

.hupe-aktiv {
    position: absolute;
    height: 10px; 
    width: 43px; 
    top: 244px; 
    left: 200px; 
    font-weight: 300;
    color: var(--secondary-color); 
    text-align: center;
    display: inline-block;
    user-select: none;
}

.abs-aktiv {
    position: absolute;
    height: 10px;
    width: 43px; 
    top: 270px; 
    left: 200px; 
    font-weight: 300;
    color: var(--secondary-color); 
    text-align: center;
    display: inline-block;
    user-select: none;
}

.abs-text {
    position: absolute;
    height: 10px; 
    width: 32px; 
    top: 270px; 
    left: 124px; 
    font-weight: 300;
    color: var(--text-color); 
    display: inline-block;
    user-select: none;
}
.bremse-aktiv {
    position: absolute;
    height: 10px;
    width: 43px; 
    top: 270px; 
    left: 1200px; 
    font-weight: 300;
    color: var(--secondary-color); 
    text-align: center;
    display: inline-block;
    user-select: none;
}

.bremse-text {
    position: absolute;
    height: 10px; 
    width: 32px; 
    top: 270px; 
    left: 1100px; 
    font-weight: 300;
    color: var(--text-color); 
    display: inline-block;
    user-select: none;
}

.element-background:hover {
    background-color: #2b3f00;
  }

  /* Du kannst dies für andere Container wiederholen, indem du die entsprechenden Klassen hinzufügst */
  .bremse:hover .element-background,
  .speed:hover .element-background,
  .oel-wasser:hover .element-background,
  .drehzahl:hover .element-background,
  .gang:hover .element-background {
    background-color: #000;
  }

  .home-dashboard-hybrid {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: left;
    font-size:  21px;
    color: #fff;
    font-family: 'Poppins';
  }

 
 
</style>