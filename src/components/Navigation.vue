//Hauptersteller: Tom Bernauer

<template>
  <div>
    <header class="header">

      <a href="#" class="logo"></a>
      
      

      <input type="checkbox" id="check" v-model="menuOpen">
      <label for="check" class="icons">
        <i v-if="!menuOpen" class='bx bx-menu' id="menu-icon"></i>
        <i v-if="menuOpen" class='bx bx-x' id="close-icon"></i>
      </label>

      <nav class="navbar">
        <a href="#" @click="onDashboardclick"  style="--i:0; order: 1;"><span>Dashboard</span><i class='bx bxs-dashboard bx-flip-horizontal' style="margin-left: 7px;" ></i></a>
        <div class="dropdown">
          <a href="#" style="--i:1; order: 2;"><span>Messwerte</span><i class='bx bx-caret-down' ></i></a>
          <div class="dropdown-content">
            <div @click="onDrehzahlclick" class="text">Drehzahl</div><br>
            <div @click="onTemperaturenclick" class="text">Öl/Wassertemperaturen</div><br>
            <div @click="onGeschwindigkeitclick" class="text">Geschwindigkeit</div><br>
            <div @click="onBremstemperaturenclick" class="text">Bremstemperaturen</div><br>
            <div @click="onGangclick" class="text">Gang</div><br>
            <div @click="onTankclick" class="text">Tank</div><br>
            <div @click="onLenkungclick" class="text">Lenkung</div><br>
            <div @click="onTripsclick" class="text">Trips</div><br>
            <div @click="onHoeheclick" class="text">Höhe</div><br>
          </div>
        </div>

        <a href="#" @click="onFahrzeugeclick" style="--i:3; order: 4;"><span>Fahrzeuge</span><i class='bx bx-car' style="margin-left: 7px;"></i></a>
        <a href="#" @click="onLayoutclick" style="--i:4; order: 5;"><span>Layout</span><i class='bx bx-layout' style="margin-left: 7px;" ></i></a>
        <a href="#" @click="onProfilclick" style="--i:2; order: 3;"><i class='bx bx-user bx-flip-horizontal' style="margin-left: -7px;"></i></a>
        <a href="#" @click="onHilfeclick"  style="--i:5; order: 6;"><i class='bx bx-help-circle' style="margin-left: -7px;"></i></a>
        <a href="#" @click="handleSignOut"><i class='bx bx-exit' style="margin-left: -8px;"></i></a>
  
        
      </nav>
    </header>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router';

  export default {
  
    data() {
      return {
        menuOpen: false,
        selectedLanguage: 'de',
      };
    },
    
    methods: {
      changeLanguage() {
        this.$i18n.locale = this.selectedLanguage;
      },
      onFahrzeugeclick() {
        this.$router.push('/fahrzeuge');
      },
      onDrehzahlclick() {
        this.$router.push('/drehzahl');
      },
      onGeschwindigkeitclick() {
        this.$router.push('/geschwindigkeit');
      },
      onBremstemperaturenclick() {
        this.$router.push('/bremsen');
      },
      onTemperaturenclick() {
        this.$router.push('/temperaturen');
      },
      onGangclick() {
        this.$router.push('/gang');
      },
      onTankclick() {
        this.$router.push('/tank');
      },
      onLayoutclick() {
        this.$router.push('/layout');
      },
      onLenkungclick() {
        this.$router.push('/lenkung');
      },
      onMotorclick() {
        this.$router.push('/motor');
      },
      onTripsclick() {
        this.$router.push('/trips');
      },
      onHoeheclick() {
        this.$router.push('/hoehe');
      },
      onDashboardclick() {
        this.$router.push('/');
      },
      onProfilclick() {
        this.$router.push('/profil');
      },
      onHilfeclick() {
        this.$router.push('/hilfe');
      },
      handleSignOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push('/login');
      });
    },
  },
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);

    onMounted(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });

    return {
      router,
      isLoggedIn,
    };
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

select {
  font-size: 14px;
  background: transparent;
  border: none; 
  color: var(--text-color);
}


.dropdown {
position: relative;
display: inline-block;
padding-bottom: 1px; /* Hinzugefügt: Anpassen Sie den Wert nach Bedarf */
}
.dropdown-content:hover{
  color:#426b1f;
}

.dropdown-content {
display: none;
position: absolute;
z-index: 1;
}

.dropdown-content div {
  padding: 0.1px; /* Reduziere den Abstand zwischen den Elementen hier */
}

/* Hinzugefügt: Anpassungen für das Aussehen des Dropdown-Inhalts beim Hover */
.dropdown:hover .dropdown-content {
display: block;
text-align: left;
border-radius: 10px;
background: rgba(0, 0, 0, .1);
backdrop-filter: blur(10px); /* Adjusted blur effect */
padding: 10px; /* Hinzugefügt: Anpassen Sie den Wert nach Bedarf */
}

/* Textstil */
.text {
font-size: 16px; /* Adjusted font size */
color: var(--text-color);
cursor: pointer;
padding: 5px; /* Hinzugefügt: Anpassen Sie den Wert nach Bedarf */
margin-bottom: 0.1px 0;

}

/* Verbessertes Hover-Effekt für den Text */
.text:hover {
background-color: rgba(255, 255, 255, 0.1);
color: var(--secondary-color); 
}

body {
  min-height: 100vh;
  background: url('login-hintergrund.png') no-repeat;
  background-size: cover;
  background-position: center;

}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.3rem 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .1);
  backdrop-filter: blur(50px);
  z-index: -1;
}

.button{
  color: var(--text-color);
}




.logo {
display: inline-block;
width: 80px; 
height: 40px; 
background-image: url('/AF-IT LOGO.png'); 
background-size: contain;
background-repeat: no-repeat;
cursor: auto;
}

.navbar a {
  font-size: 1.15rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  margin-left: 2.5rem;
}
.navbar a:hover{
  color:var(--secondary-color); 
}

#check {
  display: none;
}

.icons {
  position: absolute;
  right: 5%;
  font-size: 2.8rem;
  color: #fff;
  cursor: pointer;
  display: none;
}



@media (max-width: 992px) {
  .header {
      padding: 1.3rem 5%;
  }
}

@media (max-width: 768px) {
  .icons {
      display: block;
  }

  #check:checked~.icons #menu-icon {
      display: none;
  }

  .icons #close-icon {
      display: none;
  }

  #check:checked~.icons #close-icon {
      display: block;
  }

  .navbar {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 0;
      background: rgba(0, 0, 0, .1);
      backdrop-filter: blur(50px);
      box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .1);
      overflow: hidden;
      transition: .3s ease;
  }

  #check:checked~.navbar {
      height: 17.7rem;
  }

  .navbar a {
      display: block;
      font-size: 1.1rem;
      margin: 1.5rem 0;
      text-align: center;
      transform: translateY(-50px);
      opacity: 0;
      transition: .3s ease;
  }

  #check:checked~.navbar a {
      transform: translateY(0);
      transition-delay: calc(.15s * var(--i));
      opacity: 1;
  }
}
</style>