// This JS file is for registering a new app user ---------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { getDatabase, ref, set, update, child, get } 
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAT_QMQxfukEOjqSOLIP3jUSXOY2eOMeKw",
    authDomain: "research-site-db.firebaseapp.com",
    databaseURL: "https://research-site-db-default-rtdb.firebaseio.com",
    projectId: "research-site-db",
    storageBucket: "research-site-db.appspot.com",
    messagingSenderId: "923944412863",
    appId: "1:923944412863:web:a7792f04ba076c6c06480a"
  };
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth();

// Return instance of your app's FRD
const db = getDatabase(app);


// ---------------- Register New Uswer --------------------------------//

document.getElementById('submitData').onclick = function(){
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('userEmail').value

  //Firebase will require a password of at least 6 characters
  const password = document.getElementById('userPass').value;

  //Validate user inputs
  if(!validation(firstName, lastName, email, password)){
    return;
  };

  // Create new app user
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    // Add user account info to realtime database
    //'Set' will create a new reference or completely replace an existing one
    // each new user will be placed under the 'users' node
    set(ref(db, 'users/' + user.uid + '/accountInfo'),{
      uid: user.uid,    //save userID for home.js reference
      email: email,
      password: encryptPass(password),
      firstname: firstName,
      lastname: lastName
    })
    .then(()=>{
      //Data saved successfully
      alert('User created successfully!')
    })
    .catch((error)=>{
      alert(error)
    });

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}


// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str){
  return str === null || str.match(/^ *$/) !== null
}

// ---------------------- Validate Registration Data -----------------------//
function validation(firstName, lastName, email, password){
  let fNameRegex = /^[a-zA-Z]+$/;
  let lNameRegex = /^[a-zA-Z]+$/;
  let emailRegex = /^[a-zA-Z0-9]+@ctemc\.org$/;

  if(isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName) || isEmptyorSpaces (email)|| isEmptyorSpaces (password)){
    alert("Please complete all fields.");
    return false;
  }

  if(!fNameRegex.test(firstName)){
    alert("The first name should only contain letters");
    return false;
  }

  if(!lNameRegex.test(lastName)){
    alert("The first name should only contain letters");
    return false;
  }

  if(! emailRegex.test(email)){
    alert("Please enter a valid email");
    return false;
  }

  return true;

}

// --------------- Password Encryption -------------------------------------//
function encryptPass(password){
  let encrypted = CryptoJS.AES.encrypt(password, password)
  return encrypted.toString();
}

function decryptPass(password){
  let decrypted = CryptoJS.AES.decript(password, password) 
  return decrypted.toString();
}

