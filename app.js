import { db } from "./firebase.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

let all = [];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const boardFilter = document.getElementById("boardFilter");
const categoryFilter = document.getElementById("categoryFilter");

onSnapshot(collection(db, "products"), snap => {

    all = [];

    snap.forEach(doc => {
        all.push({ id: doc.id, ...doc.data() });
    });

    render(all);
    updateCategories(all);
});

function render(list) {

    grid.innerHTML = "";

    const s = search.value?.toLowerCase() || "";
    const b = boardFilter.value;
    const c = categoryFilter.value;

    list
    .filter(p => p.name.toLowerCase().includes(s))
    .filter(p => b === "all" ? true : p.board === b)
    .filter(p => c === "all" ? true : p.category === c)
    .forEach(p => {

        grid.innerHTML += `
            <div class="card">
                <img src="${p.image || 'https://via.placeholder.com/300'}">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <small>${p.board} / ${p.category}</small>

                <a class="btn" href="${p.link}" target="_blank">OPEN</a>
            </div>
        `;
    });
}

search.addEventListener("input", () => render(all));
boardFilter.addEventListener("change", () => render(all));
categoryFilter.addEventListener("change", () => render(all));

function updateCategories(list) {

    const cats = [...new Set(list.map(p => p.category))];

    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

    cats.forEach(c => {
        categoryFilter.innerHTML += `<option value="${c}">${c}</option>`;
    });
}

