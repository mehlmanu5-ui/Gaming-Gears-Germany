import { auth } from "./firebase.js";
import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

window.login = async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);

        alert("Login erfolgreich");

        window.location.href = "admin.html";

    } catch (e) {
        alert("Login fehlgeschlagen: " + e.message);
    }
};