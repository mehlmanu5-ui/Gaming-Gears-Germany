import { db } from "./firebase.js";

import {
    collection,
    onSnapshot
}
from
"https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";



/* =========================
DOM
========================= */


const grid =
document.getElementById("grid");


const search =
document.getElementById("search");


const boardFilter =
document.getElementById("boardFilter");


const categoryFilter =
document.getElementById("categoryFilter");


const productCount =
document.getElementById("productCount");


const categoryCount =
document.getElementById("categoryCount");


const boardCount =
document.getElementById("boardCount");


const featuredName =
document.getElementById("featuredName");


const featuredButton =
document.getElementById("featuredButton");




let allProducts=[];

let allCategories=[];

let allBoards=[];






/* =========================
PRODUCTS
========================= */


onSnapshot(

collection(db,"products"),

snap=>{


allProducts=[];



snap.forEach(doc=>{


allProducts.push({

id:doc.id,

...doc.data()

});


});



updateStats();

setFeatured();

render(allProducts);



}


);









/* =========================
RENDER
========================= */


function render(list){



if(!grid)
return;



grid.innerHTML="";



const text =
(search?.value || "")
.toLowerCase();



const board =
boardFilter?.value || "all";


const category =
categoryFilter?.value || "all";





list

.filter(p=>

(p.name || "")
.toLowerCase()
.includes(text)

)



.filter(p=>

board==="all"

?

true

:

(p.board || "")
.toLowerCase()

===

board.toLowerCase()

)



.filter(p=>

category==="all"

?

true

:

(p.category || "")
.toLowerCase()

===

category.toLowerCase()

)



.forEach(p=>{



grid.innerHTML += `



<div class="card">



<img src="${p.image || 
'https://via.placeholder.com/300'}">



<h3>

${p.name || "Unknown"}

${p.featured ? " ⭐":""}

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


search?.addEventListener(
"input",
()=>render(allProducts)
);



boardFilter?.addEventListener(
"change",
()=>render(allProducts)
);



categoryFilter?.addEventListener(
"change",
()=>render(allProducts)
);









/* =========================
CATEGORIES
========================= */


function loadCategories(){


onSnapshot(

collection(db,"categories"),

snap=>{


allCategories=[];



categoryFilter.innerHTML=`

<option value="all">

📁 All Categories

</option>

`;




snap.forEach(doc=>{


const data=doc.data();


allCategories.push(data);



categoryFilter.innerHTML +=`

<option value="${data.name}">

${data.name}

</option>

`;



});



updateStats();


}


);



}









/* =========================
BOARDS
========================= */


function loadBoards(){


onSnapshot(

collection(db,"boards"),

snap=>{


allBoards=[];



if(boardFilter){



boardFilter.innerHTML=`

<option value="all">

🎮 All Boards

</option>

`;



}




snap.forEach(doc=>{


const data=doc.data();


allBoards.push(data);



if(boardFilter){



boardFilter.innerHTML +=`

<option value="${data.name}">

${data.name}

</option>

`;



}



});



updateStats();



}


);



}









/* =========================
STATS
========================= */


function updateStats(){



if(productCount)

productCount.textContent =
allProducts.length;



if(categoryCount)

categoryCount.textContent =
allCategories.length;



if(boardCount)

boardCount.textContent =
allBoards.length;



}









/* =========================
FEATURED
========================= */


function setFeatured(){



if(!featuredName)
return;



const featuredProduct =

allProducts.find(

p=>p.featured === true

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


if(featuredButton)

featuredButton.href="#";


}



}









/* =========================
START
========================= */


loadCategories();

loadBoards();