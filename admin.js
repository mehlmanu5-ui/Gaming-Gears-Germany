import { db, auth } from "./firebase.js";

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

console.log("ADMIN JS LOADED");

/* ---------------- LOGIN ---------------- */

document.getElementById("loginBtn").addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        alert("Login Fehler: " + err.message);
    }

});

/* ---------------- AUTH STATE ---------------- */

onAuthStateChanged(auth, (user) => {

    if (user) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        loadProducts();
    } else {
        document.getElementById("loginBox").style.display = "block";
        document.getElementById("adminPanel").style.display = "none";
    }

});

/* ---------------- ADD PRODUCT ---------------- */

document.getElementById("addBtn").addEventListener("click", async () => {

    await addDoc(collection(db, "products"), {
        name: document.getElementById("name").value,
        desc: document.getElementById("desc").value,
        image: document.getElementById("image").value,
        link: document.getElementById("link").value,
        board: document.getElementById("board").value,
        category: document.getElementById("category").value,
        createdAt: Date.now()
    });

    alert("Produkt gespeichert ✅");
});

/* ---------------- LOAD PRODUCTS ---------------- */

const productList = document.getElementById("productList");

function loadProducts() {

    onSnapshot(collection(db, "products"), (snapshot) => {

        productList.innerHTML = "";

        snapshot.forEach((docSnap) => {

            const p = docSnap.data();
            const id = docSnap.id;

            productList.innerHTML += `
                <div style="border:1px solid #00e5ff;padding:10px;margin:10px 0;">
                    <b>${p.name}</b><br>
                    ${p.board} / ${p.category}<br>

                    <button onclick="deleteProduct('${id}')">🗑 Löschen</button>
                </div>
            `;
        });
    });
}

/* ---------------- DELETE ---------------- */

window.deleteProduct = async function(id) {
    await deleteDoc(doc(db, "products", id));
}

/* ---------------- LOGOUT ---------------- */

document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth);
});