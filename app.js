import { db } from "./firebase.js";
import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

let allProducts = [];

const grid = document.getElementById("grid");

const search = document.getElementById("search");
const boardFilter = document.getElementById("boardFilter");
const categoryFilter = document.getElementById("categoryFilter");

/* ---------------- LIVE DATA ---------------- */

onSnapshot(collection(db, "products"), (snapshot) => {

    allProducts = [];

    snapshot.forEach(doc => {
        allProducts.push({ id: doc.id, ...doc.data() });
    });

    render(allProducts);
    updateCategories(allProducts);
});

/* ---------------- RENDER ---------------- */

function render(list) {

    const searchValue = search.value?.toLowerCase() || "";
    const boardValue = boardFilter.value;
    const categoryValue = categoryFilter.value;

    grid.innerHTML = "";

    list
        .filter(p => p.name.toLowerCase().includes(searchValue))
        .filter(p => boardValue === "all" ? true : p.board === boardValue)
        .filter(p => categoryValue === "all" ? true : p.category === categoryValue)
        .forEach(p => {

            grid.innerHTML += `
                <div class="card">
                    <img src="${p.image || ''}">
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>

                    <small>${p.board} / ${p.category}</small>

                    <a class="btn" href="${p.link}" target="_blank">
                        Öffnen
                    </a>
                </div>
            `;
        });
}

/* ---------------- FILTER EVENTS ---------------- */

search.addEventListener("input", () => render(allProducts));
boardFilter.addEventListener("change", () => render(allProducts));
categoryFilter.addEventListener("change", () => render(allProducts));

/* ---------------- DYNAMIC CATEGORY DROPDOWN ---------------- */

function updateCategories(products) {

    const categories = [...new Set(products.map(p => p.category))];

    categoryFilter.innerHTML = `<option value="all">Alle Kategorien</option>`;

    categories.forEach(c => {
        categoryFilter.innerHTML += `<option value="${c}">${c}</option>`;
    });
}