//Hauptersteller: Ilhan Bahadir 

<template> 
  <div style="text-align: center; margin-top: 150px;">
    <swiper :options="swiperOptions" v-on:init="onSwiperInit" ref="mySwiper">
      <swiper-slide v-for="(car, index) in cars" :key="index">
        <img :src="car.image" alt="">
        <div class="modell-text">{{ car.title }}</div>
        <button class="button" @click="deleteSelectedCar(index)">Löschen</button>
      </swiper-slide>
    </swiper>

    <i class='bx bx-right-arrow-alt right-arrow-icon' @click="goToNext"></i>
    <i class='bx bx-left-arrow-alt left-arrow-icon' @click="goToPrev"></i>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import store from '../store/store';

export default {
  name: 'Carousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOptions: {},
      swiper: null,
      cars: [],
     
    };
  },
  methods: {
    onSwiperInit(swiper) {
      this.swiper = swiper;
      this.fetchCarsFromStore();
    },
    goToPrev() {
      if (this.swiper) {
        this.swiper.slidePrev();
      }
    },
    goToNext() {
      if (this.swiper) {
        this.swiper.slideNext();
      }
    },
    
    fetchCarsFromStore() {
      try {
        const carDataArray = store.getters.getCarInformation;

        if (carDataArray && carDataArray.length > 0) {
          this.cars = carDataArray.map(car => ({
            image: car.path,  // Hier den richtigen Pfad für das Bild einfügen
            title: car.modell,  // Oder verwenden Sie einen anderen geeigneten Wert für den Titel
          }));
        } else {
          console.error('Keine Fahrzeugdaten im Store gefunden.');
        }
      } catch (error) {
        console.error('Fehler beim Abrufen von Fahrzeugdaten aus dem Store:', error);
      }
    },
    
    async deleteSelectedCar(index) {
    if (confirm('Möchten Sie dieses Fahrzeug wirklich löschen?')) {

    if (this.cars.length === 1) {
      // Wenn das Fahrzeug das einzige im Carousel ist, zeige eine Meldung und kehre zurück
      window.alert('Kann das einzige Fahrzeug im Carousel nicht löschen.');
      return;
    }
    
    const selectedCar = this.cars[index];
    const carToDelete = store.getters.getCarInformation.find(car => car.path === selectedCar.image);

    if (!carToDelete) {
      console.error('Fahrzeug nicht im Store gefunden.');
      return;
    }

    try {
      // 1. Aktion: Fahrzeug aus dem Store löschen
      store.commit('deleteCar', carToDelete.id);

      // 2. Aktion: Fahrzeug aus der API löschen
      const apiUrl = `https://cartrackerapi.onrender.com/api/v1/fahrzeuge/${carToDelete.id}`;
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Fahrzeug erfolgreich aus der API gelöscht.');

        // 3. Das gelöschte Fahrzeug aus der Liste entfernen und das Carousel aktualisieren
        this.cars.splice(index, 1);
        this.swiper.update(); // Das Carousel aktualisieren
      } else {
        console.error('Fehler beim Löschen des Fahrzeugs aus der API.');
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Fahrzeugs:', error);
    }
  }
},



  
  },
};
</script>

<style scoped>

.button{
  position: absolute;
  top: 455px;
  left: 1390px;
  font-family: 'Manrope';
  cursor: pointer;
  padding: 10px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.button:hover{
  background-color: rgba(255, 255, 255, 0.7);

 }
 .right-arrow-icon,
.left-arrow-icon {
  position: absolute;
  top: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  color: var(--text-color);
  z-index: 2;
}

.right-arrow-icon {
  left: 1359px;
}

.left-arrow-icon {
  left: 52px;

}

.modell-text{
  position: absolute;
   top: 90px;
   left: 700px;
   color: #fff;
   font-size:30px;
}
</style>