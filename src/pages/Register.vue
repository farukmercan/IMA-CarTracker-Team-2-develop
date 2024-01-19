//Hauptersteller: Tom Bernauer

<template>
 

  <body>
<div class="wrapper">
  <form @submit.prevent="submitForm">
    <h1>Registrieren</h1>


  <div @click="goBack" class="arrow"><i class='bx bx-left-arrow-alt'></i></div>


    <div class="input-box">
      <div class="input-field">
        <input type="text" v-model="Name" placeholder="Vollständiger Name" required>
        <i class='bx bxs-user'></i>
      </div>
      <div class="input-field">
        <input type="email" v-model="email" placeholder="Email" required>
        <i class='bx bxs-envelope'></i>
      </div>
    </div>

    <div class="input-box">
      <div class="input-field">
        <input type="password" v-model="password" placeholder="Passwort" required>
        <i class='bx bxs-lock-alt'></i>
      </div>
     <div class="input-field">
    <input type="password" v-model="confirmPassword" placeholder="Passwort bestätigen" required>
    <i class='bx bxs-lock-alt'></i>
</div>
    </div>

    <label required>
      <input type="checkbox" v-model="declaration">Hiermit erkläre ich, dass die oben angegebenen Informationen wahr und korrekt sind.</label>
    <button @click="register" type="submit" class="btn" required>Registrieren</button>
    <button @click="signInWithGoogle" class="btnGoogle">
  <i class='bx bxl-google' style="font-size:20px; vertical-align: middle;"></i>
  <span style="margin-left: 10px; vertical-align: middle;">Fortfahren mit Google</span>
</button>

<button @click="signInWithGithub" class="btnGithub">
  <i class='bx bxl-github' style="font-size:20px; vertical-align: middle;"></i>
  <span style="margin-left: 10px; vertical-align: middle;">Fortfahren mit Github</span>
</button>

  </form>
</div>

</body>
</template>

<script setup>

import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider,GithubAuthProvider, signInWithPopup,} from "firebase/auth";
import {useRouter} from 'vue-router'
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../main"; 


const Name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth(); // Add this line to get the auth instance


const register = () => {
  // Erstelle den Benutzer in Firebase Authentication
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Benutzerdaten
      const user = userCredential.user;

      // Hier kannst du die Benutzerdaten in Firestore speichern
      // Erstelle eine Firestore-Referenz auf die Benutzerdaten
      const userRef = doc(collection(db, 'users'), user.uid);

      // Füge die Benutzerdaten hinzu (Beispiel: Name und Email)
      setDoc(userRef, {
        name: Name.value,
        email: email.value,
        // Weitere Felder hier...
      })
        .then(() => {
          console.log("Benutzerdaten erfolgreich in Firestore gespeichert");
          console.log(auth.currentUser);
          router.push('/login');
        })
        .catch((error) => {
          console.error("Fehler beim Speichern der Benutzerdaten in Firestore:", error);
          alert("Fehler beim Speichern der Benutzerdaten");
        });
    })
    .catch((error) => {
      console.error("Fehler bei der Benutzerregistrierung:", error.code, error.message);
      alert(error.message);
    });
};


const goBack = () =>{
  router.go(-1)
}

const signInWithGoogle = () => {
const provider = new GoogleAuthProvider();
signInWithPopup(getAuth(), provider)
.then((result) =>{
console.log(result.user);
router.push('/');
})
.catch((error) =>[

])
}

const signInWithGithub = () => {
const provider = new GithubAuthProvider();
signInWithPopup(getAuth(), provider)
.then((result) =>{
console.log(result.user);
router.push('/');
})
.catch((error) =>[

])
}

</script>

<style scoped>




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
  color: #fff; 
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
  color: #fff;
  border-radius: 6px;
  padding: 15px 15px 15px 40px;
}

.input-box .input-field input::placeholder {
  color: #fff;
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
  accent-color: #fff;
  margin-right: 5px;
}


.wrapper .btn {
  width: 100%;
  height: 45px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  color: #333;
  font-weight: 600;
}
.wrapper .btn:hover{
  background: #2a9aba;
}
.wrapper .btnGoogle {
  width: 100%;
  height: 45px;
  background: #4285F4;
  border: none;
  outline: none;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  margin-top: 15px;
}
.wrapper .btnGoogle:hover{
  background: #2a9aba;
}
.wrapper .btnGithub {
  width: 100%;
  height: 45px;
  background: #0d1117;
  border: none;
  outline: none;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  margin-top: 17px;
}
.wrapper .btnGithub:hover{
  background: #2a9aba;
}
.arrow {
  position: absolute;
  top: 9%;
  left: 10%;
  font-size: 30px;
  font-weight: 600;
  font-family: 'Poppins';
  color: #fff;
  cursor: pointer;
}
.arrow:hover{
color:#426b1f;
}

@media(max-width: 576px) {
  .input-box .input-field {
      width: 100%;
      margin: 10px 0;
  }
}
</style>
