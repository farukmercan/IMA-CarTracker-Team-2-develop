//Hauptersteller: Ilhan Bahadir

<template>    
        <Navigation/>
  
  <div  @click="goBack">
   <div class="arrow"><i class='bx bx-left-arrow-alt'></i></div>
   </div>
   
   <button class="fahrzeug-button" @click="onbuttonClick">Fahrzeuge Hinzufügen</button>
  
<CarouselExample/>

</template>
<script>
 import { defineComponent } from "vue";
 import Navigation from '../components/Navigation.vue';
 import CarouselExample from "../components/CarouselExample.vue";

 export default defineComponent({
   name: "Fahrzeuge",
   components: { CarouselExample, Navigation},
   methods: {
     onPlusClick() {
       this.$router.push("/fahrzeughinzufuegen");
     },
   },
   methods: {
    onbuttonClick(){
this.$router.push('/fahrzeughinzufuegen')
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
 
 .fahrzeug-button {
  position: absolute;
  font-family: 'Manrope';
  top: 605px;
  left: 1200px;
  cursor: pointer;
  z-index: 1000;
  padding: 10px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
 }

 .fahrzeug-button:hover{
  background-color: rgba(255, 255, 255, 0.7);

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