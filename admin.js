import { db, auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} 
from
"https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


import {

    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot

}
from
"https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";





/* =====================
DOM
===================== */


const loginBox =
document.getElementById("loginBox");


const adminBox =
document.getElementById("adminBox");


const grid =
document.getElementById("grid");



const nameInput =
document.getElementById("name");


const desc =
document.getElementById("desc");


const image =
document.getElementById("image");


const link =
document.getElementById("link");


const board =
document.getElementById("board");


const category =
document.getElementById("category");


const featured =
document.getElementById("featured");



let editID = null;






/* =====================
LOGIN
===================== */


window.login = async()=>{


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



try{


await signInWithEmailAndPassword(
auth,
email,
password
);


}

catch(e){

alert(e.message);

}


};






/* =====================
LOGOUT
===================== */


window.logout = async()=>{

await signOut(auth);

};









/* =====================
AUTH
===================== */


onAuthStateChanged(auth,user=>{


if(user){


loginBox.style.display="none";

adminBox.style.display="block";


loadProducts();

loadCategories();

loadBoards();


}

else{


loginBox.style.display="block";

adminBox.style.display="none";


}


});









/* =====================
ADD PRODUCT
===================== */


window.addProduct = async()=>{


await addDoc(

collection(db,"products"),

{


name:nameInput.value,


desc:desc.value,


image:image.value,


link:link.value,


board:board.value,


category:category.value,


featured:featured.checked


}


);



clearForm();


};








/* =====================
UPDATE PRODUCT
===================== */


window.updateProduct = async()=>{


if(!editID){

alert("Kein Produkt ausgewählt");

return;

}



await updateDoc(

doc(db,"products",editID),

{


name:nameInput.value,


desc:desc.value,


image:image.value,


link:link.value,


board:board.value,


category:category.value,


featured:featured.checked


}


);



editID=null;


clearForm();


alert("Produkt aktualisiert");


};









/* =====================
LOAD PRODUCTS
===================== */


function loadProducts(){



onSnapshot(

collection(db,"products"),

snap=>{


grid.innerHTML="";



snap.forEach(d=>{


const p=d.data();



grid.innerHTML += `



<div class="card">


<img 
src="${p.image || 'https://via.placeholder.com/300'}"
width="200">


<h3>

${p.name}

${p.featured ? "⭐":""}

</h3>


<p>

${p.desc || ""}

</p>



<small>

${p.board || ""}

/

${p.category || ""}

</small>




<button onclick="editProduct('${d.id}')">

EDIT

</button>



<button onclick="del('${d.id}')">

DELETE

</button>



</div>


`;



});


}


);


}









/* =====================
EDIT
===================== */


window.editProduct=(id)=>{


editID=id;



onSnapshot(

doc(db,"products",id),

snap=>{


const p=snap.data();



nameInput.value=p.name || "";

desc.value=p.desc || "";

image.value=p.image || "";

link.value=p.link || "";

board.value=p.board || "";

category.value=p.category || "";

featured.checked=p.featured || false;



}

);


};









/* =====================
DELETE
===================== */


window.del=async(id)=>{


await deleteDoc(

doc(db,"products",id)

);


};









/* =====================
CATEGORIES
===================== */


window.addCategory=async()=>{


const input =
document.getElementById("newCategory");


if(!input.value)
return;



await addDoc(

collection(db,"categories"),

{


name:input.value


}


);



input.value="";


};






function loadCategories(){



onSnapshot(

collection(db,"categories"),

snap=>{


category.innerHTML=
`

<option value="">
Kategorie wählen
</option>

`;



snap.forEach(d=>{


const c=d.data();



category.innerHTML +=


`

<option value="${c.name}">

${c.name}

</option>

`;


});


}


);


}









/* =====================
BOARDS
===================== */


window.addBoard=async()=>{


const input =
document.getElementById("newBoard");



if(!input.value)
return;



await addDoc(

collection(db,"boards"),

{


name:input.value


}


);



input.value="";


};






function loadBoards(){



onSnapshot(

collection(db,"boards"),

snap=>{


board.innerHTML=

`

<option value="">
Board wählen
</option>

`;



snap.forEach(d=>{


const b=d.data();



board.innerHTML +=


`

<option value="${b.name}">

${b.name}

</option>

`;



});


}


);


}









/* =====================
CLEAR
===================== */


function clearForm(){


nameInput.value="";

desc.value="";

image.value="";

link.value="";


featured.checked=false;


}