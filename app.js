import { db } from "./firebase.js";

import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";



/* =========================
   DOM
========================= */

const grid = document.getElementById("grid");

const search = document.getElementById("search");

const boardFilter = document.getElementById("boardFilter");

const categoryFilter = document.getElementById("categoryFilter");


const productCount = document.getElementById("productCount");

const categoryCount = document.getElementById("categoryCount");

const boardCount = document.getElementById("boardCount");


const featuredName = document.getElementById("featuredName");

const featuredButton = document.getElementById("featuredButton");



let allProducts = [];

let allCategories = [];





/* =========================
   PRODUCTS LIVE
========================= */


onSnapshot(collection(db, "products"), snap => {


    allProducts = [];


    snap.forEach(doc => {


        allProducts.push({

            id: doc.id,

            ...doc.data()

        });


    });


    console.log(
        "Produkte geladen:",
        allProducts
    );


    updateStats();

    setFeatured();

    render(allProducts);


});







/* =========================
   RENDER PRODUCTS
========================= */


function render(list){


    if(!grid)
        return;



    grid.innerHTML = "";



    const text =
    (search?.value || "")
    .toLowerCase();



    const board =
    boardFilter?.value || "all";



    const category =
    categoryFilter?.value || "all";




    list

    .filter(p =>

        (p.name || "")
        .toLowerCase()
        .includes(text)

    )


    .filter(p =>

        board === "all"

        ?

        true

        :

        (p.board || "")
        .toLowerCase()

        ===

        board.toLowerCase()

    )


    .filter(p =>

        category === "all"

        ?

        true

        :

        (p.category || "")
        .toLowerCase()

        ===

        category.toLowerCase()

    )



    .forEach(p => {



        grid.innerHTML += `


        <div class="card">


            <img src="${p.image || 
            'https://via.placeholder.com/300'}">



            <h3>
                ${p.name || "Unknown Product"}
            </h3>



            <p>
                ${p.desc || ""}
            </p>



            <small>

                ${p.board || "Unknown"}

                /

                ${p.category || "Unknown"}

            </small>




            <a

            class="btn"

            href="${p.link || '#'}"

            target="_blank">

                OPEN

            </a>



        </div>


        `;


    });


}









/* =========================
   FILTER EVENTS
========================= */


if(search){

search.addEventListener(
"input",
()=>render(allProducts)
);

}



if(boardFilter){

boardFilter.addEventListener(
"change",
()=>render(allProducts)
);

}



if(categoryFilter){

categoryFilter.addEventListener(
"change",
()=>render(allProducts)
);

}









/* =========================
   CATEGORIES
========================= */


function loadCategories(){



    onSnapshot(
    collection(db,"categories"),
    snap => {



        allCategories = [];



        if(categoryFilter){


        categoryFilter.innerHTML = `

        <option value="all">
        📁 All Categories
        </option>

        `;


        }



        snap.forEach(doc => {



            const data = doc.data();



            allCategories.push(data);



            if(categoryFilter){


            categoryFilter.innerHTML += `


            <option value="${data.name}">

            ${data.name}

            </option>


            `;


            }



        });



        updateStats();



    });


}









/* =========================
   STATS
========================= */


function updateStats(){



    if(productCount){

        productCount.textContent =
        allProducts.length;

    }




    if(categoryCount){

        categoryCount.textContent =
        allCategories.length;

    }




    if(boardCount){


        const boards =
        new Set(

            allProducts.map(

                p => p.board

            )

            .filter(Boolean)

        );



        boardCount.textContent =
        boards.size;


    }


}









/* =========================
   FEATURED
========================= */


function setFeatured(){



    if(!featuredName)
        return;




    const featuredProduct =

    allProducts.find(

        p => p.featured === true

    );





    if(featuredProduct){



        featuredName.textContent =

        featuredProduct.name;



        if(featuredButton){


            featuredButton.href =

            featuredProduct.link || "#";


        }




    }

    else{


        featuredName.textContent =

        "No Featured Product";


    }


}









/* =========================
   START
========================= */


loadCategories();