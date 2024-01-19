//Hauptersteller: Can Taylan Sentürk
//Nebenersteller: Faruk Mercan
<template>
  <div>
    <Navigation />
    <div :class="{ 'dark-mode': isDarkMode }"></div>
    <div @click="goBack">
      <div class="arrow"><i class='bx bx-left-arrow-alt'></i></div>
    </div>
    <div class="layout-green" @click="setMode('green')"></div>
    <div class="layout-tropical" @click="setMode('tropical')"></div>
    <div class="layout-blue" @click="setMode('blue')"></div>
    <div class="darkmode-schalter">
      <div class="grün-text">Grün</div>
      <div class="tropical-text">Tropical</div>
      <div class="frozen-text">Frozen</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Navigation from '../components/Navigation.vue';

export default defineComponent({
  name: "Layout",
  components: { Navigation },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    },
  },
  mounted() {
    this.setMode(this.$store.getters.getColorMode);
  },
  methods: {
    setMode(mode) {
      document.documentElement.style.setProperty('--secondary-color', `var(--${mode}-color)`);
    },
    goBack() {
      this.$router.go(-1);
    },
    toggleDarkMode() {
      const currentMode = this.$store.getters.isDarkMode;
      this.$store.dispatch('setDarkMode', !currentMode);
    },
  },
});
</script>

<style scoped>
.dark-mode {
  background-color: var(--dark-bg-color); /* Hier die Hintergrundfarbe für den Dark Mode einfügen */
  color: var(--dark-text-color); /* Hier die Textfarbe für den Dark Mode einfügen */
}

.layout-tropical {
   position: absolute;
   top: 35%;
   left: 42%;
   border-radius: 40px;
   background: linear-gradient(
    -2.09deg, 
    #ff8c00 53.13%,
    rgba(255, 255, 255, 0));
   width: 211px;
   height: 211px;
   opacity: 0.4;
}

 .layout-blue {
   position: absolute;
   top: 35%;
   left: 57%;
   border-radius: 40px;
   background: linear-gradient(
     -2.09deg,
     #1dc4ce 53.13%,
     rgba(217, 217, 217, 0)
   );
   width: 211px;
   height: 211px;
   opacity: 0.4;
 }
 .layout-green {
   position: absolute;
   top: 35%;
   left: 27%;
   border-radius: 40px;
   background: linear-gradient(
     -2.09deg,
     #426b1f 53.13%,
     rgba(217, 217, 217, 0)
   );
   width: 211px;
   height: 211px;
   opacity: 0.4;
 }
 .layout-green:hover,
 .layout-tropical:hover,
 .layout-blue:hover {
   width: 220px; 
   height: 220px; 
   opacity: 0.8; 
   transition: all 0.3s ease; 
 }

 [data-active-mode="tropical"] .layout-white,
[data-active-mode="blue"] .layout-blue,
[data-active-mode="green"] .layout-green {
  width: 220px;
  height: 220px;
  opacity: 0.8;
  transition: all 0.3s ease;
}

 .grün-text {
 position: absolute;
 height: 15px;
 width: 109px;
 top: 65%;
 left: 32.4%;
 font-weight: 800;
 display: inline-block;
 color: var(--text-color); 
}

.tropical-text {
 position: absolute;
 height: 15px;
 width: 109px;
 top: 65%;
 left: 47.3%;
 font-weight: 800;
 display: inline-block;
 color: var(--text-color); 
}

.frozen-text {
 position: absolute;
 height: 15px;
 width: 109px;
 top: 65%;
 left: 62.2%;
 font-weight: 800;
 display: inline-block;
 color: var(--text-color); 
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