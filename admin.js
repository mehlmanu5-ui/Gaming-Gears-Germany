import { db } from "./firebase.js";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const grid = document.getElementById("grid");

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