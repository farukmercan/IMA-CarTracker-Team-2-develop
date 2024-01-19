//Hauptersteller: Can Taylan Sentürk
//Nebenersteller: Fark Mercan
<template>
  <div class="container" :class="{ 'dark-mode': isChecked }">
    <input type="checkbox" id="switch" v-model="isChecked" @change="toggleTheme" />
    
    <div class="bg-fill" :class="{ 'checked': isChecked }"></div>
    
    <div class="switch-btn" :class="{ 'checked': isChecked }">
      <label for="switch">
        <div class="icons">
          <img src="/moon-icon.png" alt="moon" />
          <img src="/sun-icon.png" alt="sun" />
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    toggleTheme() {
      // Überschreiben der CSS-Variablen basierend auf dem Dark-Mode-Status
      const root = document.documentElement;
      root.style.setProperty('--text-color', this.isChecked ? '#000' : '#fff');
      document.body.style.backgroundColor = this.isChecked ? '#FAFAFA' : '#333';

      if (this.isChecked) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem('darkMode', this.isChecked.toString());
    },
    restoreTheme() {
      // Lese den isChecked-Wert aus dem localStorage und setze ihn
      const darkModeValue = localStorage.getItem('darkMode');
      this.isChecked = darkModeValue === 'true';
    
    },
  },
  mounted() {
    // Stelle den Theme-Modus beim Laden der Komponente wieder her
    this.restoreTheme();
  },
};
</script>


<style scoped>
* {
  margin: 0px;
  padding: 0px;
  transition: all 0.8s ease;
}

body {
  width: 63vw; /* 70% - 10% */
  height: 63vh; /* 70% - 10% */
  display: flex;
  align-items: left;
  justify-content: center;
  position: relative;
}

body.dark-mode {
  background-color: #333;
}
body:not(.dark-mode) {
  background-color: #FAFAFA; /* Helle Hintergrundfarbe für den Light Mode */
}

.bg-fill.checked {
  background-color: #ddecfe;
}

.container {
  text-align: center;
}

h4 {
  color: #17193f;
  margin-bottom: 12.6px; /* 14px - 10% */
  text-align: center;
  font-weight: 600;
}

input[type="checkbox"] {
  display: none;
}

body.dark-mode {
  --arrow-color: #000000; /* Änderung der Pfeilfarbe im Dark Mode */
}

.switch-btn {
  width: 113.4px; /* 126px - 10% */
  height: 37.8px; /* 42px - 10% */
  background: #212659;
  border: 2.88px solid #ffffff17; /* 3.2px - 10% */
  border-radius: 31.5px; /* 35px - 10% */
  z-index: 999;
  cursor: pointer;
}

.icons {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 12.6px; /* 14px - 10% */
  user-select: none;
  color: #17193f;
  transform: translate(0px, 25.83px); /* 28.7px - 10% */
}

.icons img {
  width: 35.91px; /* 39.9px - 10% */
  height: 35.91px; /* 39.9px - 10% */
  object-fit: cover;
}

label {
  width: 31.5px; /* 35px - 10% */
  height: 31.5px; /* 35px - 10% */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #17193f;
  border-radius: 18.9px; /* 21px - 10% */
  cursor: pointer;
  overflow: hidden;
}

.bg-fill {
  width: 12.6px; /* 14px - 10% */
  height: 12.6px; /* 14px - 10% */
  background: transparent;
  border-radius: 31.5%; /* 35% - 10% */
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
}

.switch-btn.checked {
  background: #ffffff;
  border: 2.88px solid #c3dfffba; /* 3.2px - 10% */
}

.switch-btn.checked label {
  background: #ffffff;
  transform: translateX(calc(113.4px - 37.8px)); /* (126px - 42px) - 10% */
  box-shadow: 0px 1.89px 3.15px 0px rgba(0, 0, 0, 0.2); /* 0px 2.1px 3.5px 0px - 10% */
}

.switch-btn.checked label .icons {
  transform: translate(0px, -25.83px); /* 28.7px - 10% */
}

.bg-fill.checked {
  background-color: #ddecfe;
  border-radius: 31.5%; /* 35% - 10% */
  transform: scale(157.5%); /* 175% - 10% */
  color: #fff;
}
</style>