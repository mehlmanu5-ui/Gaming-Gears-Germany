import { db, auth } from "./firebase.js";
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

/* ---------------- DOM ---------------- */

const loginBox = document.getElementById("loginBox");
const adminBox = document.getElementById("adminBox");

const grid = document.getElementById("grid");

const name = document.getElementById("name");
const desc = document.getElementById("desc");
const image = document.getElementById("image");
const link = document.getElementById("link");
const board = document.getElementById("board");
const category = document.getElementById("category");

/* ---------------- LOGIN ---------------- */

window.login = async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        alert("Login failed: " + e.message);
    }
};

/* ---------------- LOGOUT ---------------- */

window.logout = async () => {
    await signOut(auth);
};

/* ---------------- AUTH STATE ---------------- */

onAuthStateChanged(auth, (user) => {

    if (user) {
        loginBox.style.display = "none";
        adminBox.style.display = "block";
        loadProducts();
    } else {
        loginBox.style.display = "block";
        adminBox.style.display = "none";
    }
});

/* ---------------- ADD PRODUCT ---------------- */

window.addProduct = async () => {

    await addDoc(collection(db, "products"), {
        name: name.value,
        desc: desc.value,
        image: image.value,
        link: link.value,
        board: board.value,
        category: category.value
    });

};

/* ---------------- LOAD PRODUCTS ---------------- */

function loadProducts() {

    onSnapshot(collection(db, "products"), snap => {

        grid.innerHTML = "";

        snap.forEach(d => {

            const p = d.data();

            grid.innerHTML += `
                <div class="card">
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>
                    <small>${p.board} / ${p.category}</small>

                    <button onclick="del('${d.id}')">DELETE</button>
                </div>
            `;
        });
    });
}

/* ---------------- DELETE ---------------- */

window.del = async (id) => {
    await deleteDoc(doc(db, "products", id));
};