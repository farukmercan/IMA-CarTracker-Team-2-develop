//Hauptersteller: Tom Bernauer
//Implementierung, von Google und GitHub als Authentification provider: Adrian Skeja
// Validierung von Eingaben: Can Taylan Sentürk

<template>
  <body>
  <div class="wrapper">
    <form id="loginForm" @submit.prevent="login" >
      <h1>Login</h1>
      <div class="input-box">
        <input v-model="email" type="email" placeholder="Email" required>
      </div>
      <div class="input-box">
        <input v-model="password" type="password" placeholder="Passwort" required>
      </div>
      <div><p v-if="errMsg">{{ errMsg }}</p></div>
      <div class="remember-forgot">
  <label id="forgotpasslabel" @click="ForgotPassword" style="cursor: pointer; user-select: none; color: var(--text-color); text-decoration: none;">Passwort vergessen?</label>
</div>
      <button type="submit" class="btn">Einloggen</button>
      <div class="register-link">
        <p>Noch kein Konto? <a @click="register" href="#">Registrieren</a></p>
      </div>
    </form>
  </div>
</body>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref();

const login = (event) => {
  event.preventDefault(); // Verhindert das Standardverhalten des Formulars

  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Erfolgreich eingeloggt!");
      router.push('/fahrzeughinzufuegen');
    })
    .catch((error) => {
      handleAuthError(error);
    });
};


const handleAuthError = (error) => {
  console.log(error.code);
  switch (error.code) {
    case "auth/invalid-email":
      errMsg.value = "Ungültige Email";
      break;
    case "auth/user-not-found":
      errMsg.value = "Kein Konto mit dieser Email gefunden";
      break;
    case "auth/wrong-password":
      errMsg.value = "Falsches Passwort";
      break;
    case "auth/email-already-in-use":
      errMsg.value = "Email wird schon benutzt";
      break;
    default:
      errMsg.value = "Email or Passwort war falsch";
      break;
  }
};

const register = () =>{
  router.push('/register')
}


const forgotPassword = () => {
  sendPasswordResetEmail(getAuth(), email.value)
    .then(() => {
      alert("Ein Link zum Zurücksetzen des Passwortes wurde an Ihre E-Mail gesendet");
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};

onMounted(() => {
  const mainForm = document.getElementById('loginForm');
  const forgotPasswordLabel = document.getElementById('forgotpasslabel');

  if (mainForm) {
    mainForm.addEventListener('submit', login);
  }

  if (forgotPasswordLabel) {
    forgotPasswordLabel.addEventListener('click', forgotPassword);
  }
});
</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Manrope", sans-serif;

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
    width: 420px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .2);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    color: var(--text-color); 
    border-radius: 10px;
    padding: 30px 40px;
}

.wrapper h1 {
    font-size: 36px;
    text-align: center;
    user-select: none;
}

.wrapper .input-box {
    width: 100%;
    height: 50px;
    margin: 30px 0;
}

.input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, .2);
    border-radius: 40px;
    font-size: 16px;
    color:var(--text-color); 
    padding: 20px 45px 20px 20px;
}

.input-box input::placeholder {
    color:var(--text-color); 
}

.input-box i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
}

.wrapper .remember-forgot {
    display: flex;
    justify-content: space-between;
    font-size: 14.5px;
    margin: -15px 0 15px;
}

.remember-forgot label input {
    accent-color: var(--text-color); 
    margin-right: 3px;
}

.remember-forgot a {
    color: var(--text-color); 
    text-decoration: none;
}

.remember-forgot a:hover {
    text-decoration: underline;
}

.wrapper .btn {
    width: 100%;
    height: 45px;
    background: var(--text-color); 
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 16px;
    color: #333;
    font-weight: 600;

}

.wrapper .btn:hover{
  background-color: aqua;
}

.wrapper .register-link {
    font-size: 14.5px;
    text-align: center;
    margin: 20px 0 15px;
    user-select: none;

}

.register-link p a {
    color: var(--text-color); 
    text-decoration: none;
    font-weight: 600;
}

.register-link p a:hover {
    text-decoration: underline;
}
</style>
