import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";


import { getFirestore } 
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


import { getAuth } 
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


import { getStorage } 
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";



/* =========================
   FIREBASE CONFIG
========================= */


const firebaseConfig = {

    apiKey: "AIzaSyBWzfkGLulCyTfWnr0elYXgDzn2SSYzHcc",

    authDomain:
    "tech-board-8bdd5.firebaseapp.com",

    projectId:
    "tech-board-8bdd5",

    storageBucket:
    "tech-board-8bdd5.firebasestorage.app",

    messagingSenderId:
    "668103046596",

    appId:
    "1:668103046596:web:51c6e0348d7f1fba1ba091"

};





/* =========================
   INITIALIZE
========================= */


const app =
initializeApp(firebaseConfig);





/* =========================
   EXPORTS
========================= */


export const db =
getFirestore(app);



export const auth =
getAuth(app);



export const storage =
getStorage(app);