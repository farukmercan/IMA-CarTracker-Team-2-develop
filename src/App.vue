<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // Setze standardmäßig die grüne Farbe beim Laden der App
    this.setMode('green');
  },
  methods: {
    setMode(mode) {
      document.documentElement.style.setProperty('--secondary-color', `var(--${mode}-color)`);
    },
  },
};
</script>

<style>
/* Hier können globale Stile platziert werden */
</style>
