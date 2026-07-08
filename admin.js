import { db, auth, storage } from "./firebase.js";


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
    doc,
    onSnapshot

}
from
"https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";



import {

    ref,
    uploadBytes,
    getDownloadURL

}
from
"https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";






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


const link =
document.getElementById("link");


const board =
document.getElementById("board");


const category =
document.getElementById("category");


const featured =
document.getElementById("featured");




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


alert(
"Login fehlgeschlagen: "
+ e.message
);


}



};







/* =====================
LOGOUT
===================== */


window.logout = async()=>{


await signOut(auth);


};








/* =====================
AUTH CHECK
===================== */


onAuthStateChanged(auth,user=>{


if(user){


loginBox.style.display="none";


adminBox.style.display="block";


loadProducts();


loadCategories();



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



let imageURL = "";



const file =

document.getElementById("imageFile")
.files[0];





/* IMAGE UPLOAD */


if(file){



const storageRef =


ref(

storage,

"products/"
+
Date.now()
+
"_"
+
file.name

);




await uploadBytes(

storageRef,

file

);




imageURL =

await getDownloadURL(

storageRef

);



}





/* FIRESTORE SAVE */


await addDoc(

collection(db,"products"),

{


name:
nameInput.value,


desc:
desc.value,


image:
imageURL,


link:
link.value,


board:
board.value,


category:
category.value,


featured:
featured.checked


}


);






nameInput.value="";


desc.value="";


link.value="";


featured.checked=false;



document.getElementById("imageFile").value="";



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
src="${p.image || ''}"
width="200"
>


<h3>

${p.name}

${p.featured ? "⭐":""}

</h3>



<p>

${p.desc || ""}

</p>



<small>

${p.board}
/
${p.category}

</small>




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
DELETE
===================== */


window.del = async(id)=>{


await deleteDoc(

doc(db,"products",id)

);


};








/* =====================
CATEGORIES
===================== */


window.addCategory = async()=>{


const input =

document.getElementById("newCategory");



if(!input.value)

return;




await addDoc(

collection(db,"categories"),

{


name:
input.value


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

<option>

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