import { db } from "./firebase.js";
import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

/* ---------------- DOM ---------------- */

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const boardFilter = document.getElementById("boardFilter");
const categoryFilter = document.getElementById("categoryFilter");

let allProducts = [];

/* ---------------- PRODUCTS LIVE ---------------- */

onSnapshot(collection(db, "products"), snap => {

    allProducts = [];

    snap.forEach(doc => {
        allProducts.push({ id: doc.id, ...doc.data() });
    });

    render(allProducts);
});

/* ---------------- RENDER ---------------- */

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

                    <a class="btn" href="${p.link}" target="_blank">
                        OPEN
                    </a>
                </div>
            `;
        });
}

/* ---------------- FILTER EVENTS ---------------- */

search.addEventListener("input", () => render(allProducts));
boardFilter.addEventListener("change", () => render(allProducts));
categoryFilter.addEventListener("change", () => render(allProducts));

/* ---------------- CATEGORIES (FIXED) ---------------- */

function loadCategories() {

    onSnapshot(collection(db, "categories"), snap => {

        categoryFilter.innerHTML = `
            <option value="all">All Categories</option>
        `;

        snap.forEach(doc => {

            const c = doc.data();

            categoryFilter.innerHTML += `
                <option value="${c.name}">
                    ${c.name}
                </option>
            `;
        });
    });
}

/* ---------------- START ---------------- */

loadCategories();