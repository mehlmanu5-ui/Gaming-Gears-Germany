import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { db } from "./firebase.js";
import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

/* ---------------- LOGIN ---------------- */

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        alert("Login Fehler: " + err.message);
    }
});
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth);
});

const addBtn = document.getElementById("addBtn");

addBtn?.addEventListener("click", async () => {

    const name = document.getElementById("name").value;
    const desc = document.getElementById("desc").value;
    const image = document.getElementById("image").value;
    const link = document.getElementById("link").value;
    const board = document.getElementById("board").value;
    const category = document.getElementById("category").value;

    try {
        await addDoc(collection(db, "products"), {
            name,
            desc,
            image,
            link,
            board,
            category,
            createdAt: Date.now()
        });

        alert("Produkt gespeichert ✅");

    } catch (err) {
        alert("Fehler: " + err.message);
    }

});

/* ---------------- LOGIN STATUS ---------------- */

onAuthStateChanged(auth, (user) => {

    if (user) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
    } else {
        document.getElementById("loginBox").style.display = "block";
        document.getElementById("adminPanel").style.display = "none";
    }

});