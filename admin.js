import { db, auth } from "./firebase.js";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

/* ---------------- AUTH GUARD ---------------- */

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

/* ---------------- DOM ---------------- */

const grid = document.getElementById("grid");

const name = document.getElementById("name");
const desc = document.getElementById("desc");
const image = document.getElementById("image");
const link = document.getElementById("link");
const board = document.getElementById("board");
const category = document.getElementById("category");

/* ---------------- ADD ---------------- */

window.addProduct = async () => {

    if(!name.value) return alert("Name fehlt!");

    await addDoc(collection(db, "products"), {
        name: name.value,
        desc: desc.value,
        image: image.value,
        link: link.value,
        board: board.value,
        category: category.value
    });

    name.value = "";
    desc.value = "";
    image.value = "";
    link.value = "";
};

/* ---------------- LIVE LOAD ---------------- */

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

/* ---------------- DELETE ---------------- */

window.del = async (id) => {
    await deleteDoc(doc(db, "products", id));
};