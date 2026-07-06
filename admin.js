import { db } from "./firebase.js";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const grid = document.getElementById("grid");

const nameInput = document.getElementById("name");
const descInput = document.getElementById("desc");
const imageInput = document.getElementById("image");
const linkInput = document.getElementById("link");
const boardInput = document.getElementById("board");
const categoryInput = document.getElementById("category");

window.addProduct = async () => {

    if(!nameInput.value) return alert("Name fehlt!");

    await addDoc(collection(db, "products"), {
        name: nameInput.value,
        desc: descInput.value,
        image: imageInput.value,
        link: linkInput.value,
        board: boardInput.value,
        category: categoryInput.value
    });

    alert("Produkt hinzugefügt");
};

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

window.del = async (id) => {
    await deleteDoc(doc(db, "products", id));
};