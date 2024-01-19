//Hauptersteller: Can Taylan Sentürk
//Interaktion mit Firebase: Tom Bernauer

import { createApp } from "vue";
import { createRouter, createWebHistory, RouterView } from "vue-router"; // Füge RouterView hinzu
import App from "./App.vue";
import store from "./store/store";
import 'boxicons/css/boxicons.min.css';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD-sVPR2ZGYYAPDqy39UM-VOnHRqWaFUc",
  authDomain: "gothic-handbook-410216.firebaseapp.com",
  projectId: "gothic-handbook-410216",
  storageBucket: "gothic-handbook-410216.appspot.com",
  messagingSenderId: "779087196572",
  appId: "1:779087196572:web:2bf37c661371e2d2e25859"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { db };


import HomeDashboardHybrid from "./pages/HomeDashboardHybrid.vue";
import Fahrzeuge from "./pages/Fahrzeuge.vue";
import Profil from "./pages/Profil.vue";
import FahrzeugHinzufuegen from "./pages/FahrzeugHinzufuegen.vue";
import LogIn from "./pages/LogIn.vue";
import Register from "./pages/Register.vue";
import Hilfe from "./pages/Hilfe.vue";
import Layout from "./pages/Layout.vue";
import Gang from "./pages/Gang.vue";
import Lenkung from "./pages/Lenkung.vue";
import Drehzahl from "./pages/Drehzahl.vue";
import Geschwindigkeit from "./pages/Geschwindigkeit.vue";
import Tank from "./pages/Tank.vue";
import Temperaturen from "./pages/Temperaturen.vue";
import Trips from "./pages/Trips.vue";
import Bremsen from "./pages/Bremsen.vue";
import Hoehe from "./pages/Hoehe.vue";
import NotFound from "./pages/NotFound.vue";




import "./global.css";



const routes = [

  {
    path: "",
    name: "HomeDashboardHybrid",
    component: HomeDashboardHybrid,
    meta: {
      requiresAuth: true,
      title: "Dashboard"
    },
  },
  {
    path: "/fahrzeuge",
    name: "Fahrzeuge",
    component: Fahrzeuge,
    meta: {
      requiresAuth: true,
      title: "Fahrzeuge"
    },
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
    meta: {
      requiresAuth: true,
      title: "Benutzerprofil"
    },
  },
  {
    path: "/fahrzeughinzufuegen",
    name: "FahrzeugHinzufuegen",
    component: FahrzeugHinzufuegen,
    meta: {
      requiresAuth: true,
      title: "Hinzufügen eines neuen Fahrzeugs"
    },
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
    meta: {
      title: "Login"
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/hilfe",
    name: "Hilfe",
    component: Hilfe,
  },
  {
    path: "/layout",
    name: "Layout",
    component: Layout,
    meta: {
      requiresAuth: true,
      title: "Layout"
    },
  },
  {
    path: "/gang",
    name: "Gang",
    component: Gang,
    meta: {
      requiresAuth: true,
      title: "Gang"
    },
  },
  {
    path: "/lenkung",
    name: "Lenkung",
    component: Lenkung,
    meta: {
      requiresAuth: true,
      title: "Lenkung"
    },
  },
  {
    path: "/drehzahl",
    name: "Drehzahl",
    component: Drehzahl,
    meta: {
      requiresAuth: true,
      title: "Drehzahl"
    },
  },
  {
    path: "/geschwindigkeit",
    name: "Geschwindigkeit",
    component: Geschwindigkeit,
    meta: {
      requiresAuth: true,
      title: "Geschwindigkeit"
    },
  },
  {
    path: "/tank",
    name: "Tank",
    component: Tank,
    meta: {
      requiresAuth: true,
      title: "Tank"
    },
  },
  {
    path: "/temperaturen",
    name: "Temperaturen",
    component: Temperaturen,
    meta: {
      requiresAuth: true,
      title: "Öl und Wassertemperatur"
    },
  },
  {
    path: "/trips",
    name: "Trips",
    component: Trips,
    meta: {
      requiresAuth: true,
      title: "Trips"
    },
  },
  {
    path: "/bremsen",
    name: "Bremsen",
    component: Bremsen,
    meta: {
      requiresAuth: true,
      title: "Bremstemperaturen"
    },
  },
  {
    path: "/hoehe",
    name: "Hoehe",
    component: Hoehe,
    meta: {
      requiresAuth: true,
      title: "Höhe"
    },
  },
  {
    path: "/404",
    name: "notfound",
    component: NotFound,
    meta: {
      title: "404 error",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  })
}

router.beforeEach(async (toRoute, fromRoute, next) => {
  if (toRoute.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Sie sind ausgeloggt!");
      next('/login');
    }
  } else {
    // Verschieben Sie diese Zeile innerhalb des else-Zweigs
    next();
  }

  // Dies sollte außerhalb der if-else-Anweisung stehen
  const documentTitle =
    toRoute?.meta && toRoute?.meta?.title ? toRoute?.meta?.title : "CT";
  window.document.title = documentTitle;
  if (toRoute?.meta?.description) {
    addMetaTag(toRoute?.meta?.description);
  }
});


const addMetaTag = (value) => {
  let element = document.querySelector(`meta[name='description']`);

  if (element) {
    element.setAttribute("content", value);
  } else {
    element = `<meta name="description" content="${value}" />`;
    document.head.insertAdjacentHTML("beforeend", element);
  }
};


createApp(App).use(router).use(store).mount("#app");

export default router;