//Hauptersteller: Can Taylan Sentürk

<template>
  <Navigation/>
  <div @click="goBack">
      <div class="arrow"><i class='bx bx-left-arrow-alt'></i></div>
    </div>
  <section>
    <h2 class="title">FAQ</h2>
    <div v-for="(faq, index) in faqs" :key="index" class="faq" :class="{ active: faq.active }">
      <div class="question" @click="toggleFaq(faq)">
        <h3>{{ faq.question }}</h3>
        <svg width="15" height="10" viewBox="0 0 42 25" :class="{ rotated: faq.active }">
          <path d="M3 3L21 21L39 3" stroke="white" stroke-width="7" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="answer" :style="{ maxHeight: faq.active ? '100%' : '0' }">
        <p>{{ faq.answer }}</p>
      </div>
    </div>
  </section>
</template>


<script>
import Navigation from '../components/Navigation.vue';

export default {
  data() {
    return {
      faqs: [
        {
        question: "1. Was ist ein CarTracker?",
        answer: "Der CarTracker ist eine Anwendung zur Visualisierung von Telemetriedaten des eigenen Fahrzeugs.",
        active: false,
        },
        {
        question: "2. Welche Messwerte visualisiert der CarTracker?",
        answer: "Die visualisierten Messwerte umfassen Drehzahl, Öl- und Wassertemperatur, Geschwindigkeit, Bremstemperaturen, Gang, Tank, Lenkung, Motor, Trips und Höhe. Darüber hinaus werden der Status von Hupe, ABS, Bremse, Motorhaube und Spoiler angezeigt.",
        active: false,
        },
        {
         question: "3. Wie füge ich mein Fahrzeug hinzu?",
         answer: "Um Ihr Fahrzeug hinzuzufügen, öffnen Sie das Sideboard-Menü und wählen Sie den Punkt Fahrzeuge aus. Auf der neu geöffneten Seite befindet sich die Option Fahrzeug hinzufügen, die Sie wählen müssen. Tragen Sie nun Marke, Modell, Fahrgestellnummer, Farbe und Erstzulassung ein und speichern Sie die eingegebenen Daten, indem Sie auf den Pfeil nach rechts klicken. Der CarTracker ermöglicht es Ihnen, mehrere Fahrzeuge hinzuzufügen",
         active: false,
        },
        {
        question: "4.	Visualisiert die Anwendung die Messwerte auch in Diagrammen.",
        answer: "Ja, Diagramme zur Darstellung von Langzeitdaten sind für folgende Messwerte möglich Drehzahl, Öl- und Wassertemperatur, Geschwindigkeit, Gang, Lenkung, Trips, Höhe.  Die Anwendung ermöglicht zudem die Auswahl von Start- und Enddatum für die Diagramme",
        active: false,
        },
        {
        question: "5.	Ist es möglich, die Website auch im White-Mode darzustellen?",
        answer: "Ja, wenn Sie das Sideboard-Menü öffnen und die Präferenzen auswählen, können Sie das Layout der Website in Grün, Weiß oder Frozen ändern",
        active: false,
        },
        
        {
        question:"6. Wie oft werden die Telemetriedaten aktualisiert?",
        answer: " Der CarTracker aktualisiert die Messwerte alle 2-3 Sekunden",
        active: false,
        }
      ]
    };
  },
  components: {Navigation},
  methods: {
    goBack() {
    // Navigiere zur vorherigen Seite
    this.$router.go(-1); // Diese Zeile funktioniert in Vue Router
    // Alternativ: window.history.back();
  },
    toggleFaq(faq) {
      // Schließe alle anderen FAQs
      this.faqs.forEach(item => {
        if (item !== faq) {
          item.active = false;
        }
      });

      // Toggle die Aktivität der aktuellen FAQ
      faq.active = !faq.active;
    }
  }
};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
 
}

body {
    font-family: 'Manrope', sans-serif;
    background: var(--text-color); 
    color:var(--text-color); 
}

section {
    min-height: 100vh;
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text-color); 
}

.title {
    font-size: 3rem;
    margin: 7rem 0rem;
    
}

.faq {
    max-width: 700px;
    margin-top: .5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--text-color); 
    cursor: pointer;
    
}

.question {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.question h3 {
    font-size: 1.8rem;
    color: var(--text-color); 
}

.answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height .2s ease;
}

.answer p {
    padding-top: 1rem;
    line-height: 1.6;
    font-size: 1.4rem;
}

.faq.active .answer {
    max-height: 300px;
    animation:  fade 1s ease-in-out;
}

.faq.active svg {
    transform: rotate(180deg);
}

svg {
    transition: transform 0.5s ease-in; /* Hier wurde tranform zu transform geändert */
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

@keyframes fade { 
    from {
        opacity: 0;
        transform: translate(-10px);
    }
    to {
        opacity: 1;
        transform: translate(0px);
    }
}
</style>
