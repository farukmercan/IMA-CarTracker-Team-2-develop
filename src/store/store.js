// Hauptersteller: Ilham Bahadir


import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
export default createStore({

  plugins: [createPersistedState({
    key: 'carStorage',  // Der Key, unter dem die Daten im Local Storage gespeichert werden
    paths: ['carInformation'],  // Nur die gewünschten Teile des Zustands persistieren
  })],
  
  state: {
    carInformation: [], // Array für die gespeicherten Auto-Daten
  },
  
  mutations: {
    addCar(state, car) {
      console.log("Auto zum Store hinzufügen:", car);
      state.carInformation.push(car);
    },
    
    deleteCar(state, carId) {
      console.log("Auto aus dem Store löschen, ID:", carId);
      const index = state.carInformation.findIndex(car => car.id === carId);
      if (index !== -1) {
        state.carInformation.splice(index, 1);
      }
    },
  },
  
  actions: {
    addCar({ commit }, car) {
      commit('addCar', car);
    },

    deleteCar({ commit }, carId) {
      commit('deleteCar', carId);
    },
  },
  
  getters: {
    getCarInformation: (state) => state.carInformation,
    getLatestCarPath(state) {
      const carDataArray = state.carInformation;
  
      if (carDataArray.length > 0) {
        return carDataArray[carDataArray.length - 1].path;
      } else {
        return null;
      }
    },
  
  },
});
