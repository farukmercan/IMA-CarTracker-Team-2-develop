//Template und Style:Tom Bernauer
//Script: Ilhan Bahadir

<template>
  <body>
    <div class="wrapper">
      <form @submit.prevent="submitForm">
        <h1>Fahrzeug Hinzufügen</h1>

        <div class="input-box">
          <div @click="goBack">
            <div class="arrow"><i class='bx bx-left-arrow-alt'></i></div>
          </div>

          <div class="input-field">
            <input type="text" v-model="brand" placeholder="Marke" required list="brandList">
            <datalist id="brandList">
              <option value="BMW"></option>
              <option value="Mercedes-Benz"></option>
              <option value="Volkswagen"></option>
              <option value="Ford"></option>
              <option value="Audi"></option>
              <option value="Porsche"></option>
            </datalist>
            <i class='bx bx-copyright'></i>
          </div>

          <div class="input-field">
            <input type="text" v-model="username" placeholder="Modell" required>
            <i class='bx bxs-car' ></i>
          </div>
        </div>

        <div class="input-box">
          <div class="input-field">
            <input type="text" v-model="VINNumber" placeholder="VIN Nummer" title="17 Ziffern" required pattern="[A-HJ-NPR-Z0-9]{17}">
            <i class='bx bxs-key'></i>
          </div>

          <div class="input-field">
            <input type="text" v-model="color" placeholder="Farbe" required list="colorList">
            <datalist id="colorList">
              <option value="schwarz"></option>
              <option value="weiss"></option>
              <option value="blau"></option>
              <option value="rot"></option>
              <option value="grün"></option>
              <option value="pink"></option>
            </datalist>
            <i class='bx bx-palette'></i>
          </div>
        </div>

        <div class="input-box">
          <div class="input-field">
            <input type="text" v-model="phoneNumber" placeholder="Erstzulassung" title="TT.MM.YYYY" required pattern="^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}">
            <i class='bx bxs-calendar' ></i>
          </div>

          <div class="input-field">
            <input type="text" v-model="name" placeholder="Name Inhaber" pattern="[A-Za-z\s]+" title="Nur Buchstaben und Leerzeichen erlaubt" required>
            <i class='bx bxs-user' ></i>
          </div>
        </div>

        <label>
          <input type="checkbox" v-model="declaration">Is your vehicle favorite?
        </label>

        <button type="submit" class="btn">Hinzufügen</button>
      </form>
    </div>
  </body>
</template>

<script>
import store from '../store/store';

export default {
  data() {
    return {
      fullName: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      declaration: false,
      brand: '',
      imagePath: null,
    };
  },

  methods: {
    checkBrand() {
      
      let checkedBrand = this.brand;
      let imagePath;

      switch (checkedBrand) {
        case 'BMW':
          imagePath = '/M4 Front1.png';
          break;
        case 'Mercedes-Benz':
          imagePath = '/M4 Front2.webp';
          break;
        case 'Volkswagen':
          imagePath = '/M4 Front3.webp';
          break;
        case 'Ford':
          imagePath = '/Mustang Front.png';
          break;
        case 'Audi':
          imagePath = '/M4 Front6.png';
          break;
        case 'Porsche':
          imagePath = '/Porsche Front.png';
          break;
        default:
          console.error("Kein Bild konnte geladen werden. Unbekannte Marke:", checkedBrand);
          imagePath = null;
      }

      if (imagePath && !store.getters.getCarInformation.includes(imagePath)) {
        this.imagePath = imagePath;
        return imagePath;
      } else if (store.getters.getCarInformation.includes(imagePath)) {
        console.error("Dieses Auto wurde bereits gespeichert!");
        return null;
      } else {
        return null;
      }
    },

    translateBrand(brandName) {
      const brandTranslations = {
        "Mercedes-Benz": "MB",
        "BMW": "BMW",
        "Volkswagen": "VW",
        "Porsche": "PO",
        "Ford": "FO",
        "Audi": "AU"
      };

      return brandTranslations[brandName] || brandName;
    },

    async submitForm() {
      
  const translatedBrand = this.translateBrand(this.brand);
  this.imagePath = this.checkBrand();
  console.log('Wert von this.imagePath:', this.imagePath);

  const queryParams = new URLSearchParams({
    modell: this.username,
    farbe: this.color,
    erstzulassung: this.phoneNumber,
    isFavorit: this.declaration.toString(),
    vin: this.VINNumber,
    nameInhaber: this.name,
    markeMarkenId: translatedBrand,
  });

  const apiUrl = `https://cartrackerapi.onrender.com/api/v1/fahrzeuge?${queryParams.toString()}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
    });

    if (response.ok) {
      const responseData = await response.text(); // Text, nicht JSON, weil die ID als Text zurückgegeben wird

      // Extrahiere die ID aus dem Text
      const extractedId = responseData.match(/Neues Fahrzeug mit ID (\S+) wurde hinzugefügt/)?.[1];

      if (extractedId) {
        console.log('Extrahierte ID:', extractedId);

        const carPath = this.imagePath;
        // Erstelle das carObject nur, wenn die ID definiert ist
        const carObject = {
          id: extractedId,
          modell: this.username,
          farbe: this.color,
          erstzulassung: this.phoneNumber,
          isFavorit: this.declaration.toString(),
          vin: this.VINNumber,
          nameInhaber: this.name,
          markeMarkenId: translatedBrand,
          path: carPath,
        };

        // Dispatche die Aktion, um das Objekt im Store hinzuzufügen
        store.dispatch('addCar', carObject);
      } else {
        console.error('Fehler beim Extrahieren der ID aus der Erfolgsmeldung. ID nicht gefunden.');
      }

      this.$router.push("/");
      console.log('Fahrzeug erfolgreich gepostet!');
    } else {
      console.error('Fehler beim Posten des Fahrzeugs.');
    }
  } catch (error) {
    console.error('Fehler beim Fetch-Aufruf:', error);
  }
},



},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Manrope', sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('/login-hintergrund.png') no-repeat;
  background-size: cover;
  background-position: center;
}

.wrapper {
  width: 750px;
  background: rgba(255, 255, 255, .1);
  border: 2px solid rgba(255, 255, 255, .2);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  backdrop-filter: blur(50px);
  border-radius: 10px;
  color: var(--text-color); 
  padding: 40px 35px 55px;
  margin: 0 10px;
}

.wrapper h1 {
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
}

.wrapper .input-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.input-box .input-field {
  position: relative;
  width: 48%;
  width: 50%;
  margin: 13px 0;
}

.input-box .input-field input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .2);
  outline: none;
  font-size: 16px;
  color: var(--text-color); 
  border-radius: 6px;
  padding: 15px 15px 15px 40px;
}

.input-box .input-field input::placeholder {
  color: var(--text-color); 
}

.input-box .input-field i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
}

.wrapper label {
  display: inline-block;
  font-size: 14.5px;
  margin: 10px 0 23px;
}

.wrapper label input {
  accent-color: var(--text-color); 
  margin-right: 5px;
}

.wrapper .btn {
  width: 100%;
  height: 45px;
  background: var(--text-color); 
  border: none;
  outline: none;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  color: #333;
  font-weight: 600;
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

.arrow:hover {
  color: var(--text-color); 
}

@media(max-width: 576px) {
  .input-box .input-field {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
