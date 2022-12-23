// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signOut } 
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { getDatabase, ref, set, update, child, get, remove } 
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



// ---------------------// Get reference values -----------------------------
let userLink = document.getElementById('userLink');   //user name for navbar
let signOutLink = document.getElementById('signOut'); //Signout link
let welcome = document.getElementById('welcome');     //Welcome header
let currentUser = null; //Initialize currentUser to null


// ----------------------- Get User's Name'Name ------------------------------
function getUsername(){
  //Grab the value for the 'keep logged in' switch
  let keepLoggedIn = localStorage.getItem("keepLoggedIn");

  //Grab user information passed from signIn.js
  if(keepLoggedIn == "yes"){
    currentUser = JSON.parse(localStorage.getItem('user'));
  }else{
    currentUser = JSON.parse(sessionStorage.getItem('user'));
  }
}

function signOutUser(){
  sessionStorage.removeItem('user');        //Clear session storage
  localStorage.removeItem('user');          // Clear local storage
  localStorage.removeItem('keepLoggedIn');  

  signOut(auth).then(() => {
    // Sign-out succesful

  }).catch((error)=>{
    //Error occurred

  });

  window.location= 'home.html'
}

// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD



// ------------------------Set (insert) data into FRD ------------------------
function setData(userID, day, condition, diameter){
  //Must use brackets around variable name to use it as a key
  set(ref(db, 'users/' + userID + '/data/' + day), {
    [condition]: diameter
  })
  .then(()=>{
    alert("Data stored successfully.");
  })
  .catch((error) =>{
    alert("There was an error. Error: " + error);
  });
}

// -------------------------Update data in database --------------------------
function updateData(userID, day, condition, diameter){
  //Must use brackets around variable name to use it as a key
  update(ref(db, 'users/' + userID + '/data/' + day), {
    [condition]: diameter
  })
  .then(()=>{
    alert("Data updated successfully.");
  })
  .catch((error) =>{
    alert("There was an error. Error: " + error);
  });
}

// ----------------------Get a datum from FRD (single data point)---------------
function getData(userID, year, month, day){

  let yearVal = document.getElementById('yearVal');
  let monthVal = document.getElementById('monthVal');
  let dayVal = document.getElementById('dayVal');
  let tempVal = document.getElementById('tempVal');

  const dbref = ref(db); //Firebase paramater required for the 'get' function

  //Provide the path through the nodes to the data
  get(child(dbref, 'users/' + userID + '/data/' + year + '/' + month)).then((snapshot) => {
    if (snapshot.exists()){
      yearVal.textContent = year;
      monthVal.textContent = month;
      dayVal.textContent = day;

      //To get a specific value from a key: snapshot.value()[key]
      tempVal.textContent = snapshot.val()[day];
    }
    else{
      alert('Unsuccessful, error' + error);
    }
  })
  .catch((error) =>{
    alert("unsuccessful");
  });
}

// ---------------------------Get a month's data set --------------------------
// Must be an async function because you need to get all the data from FRD
// before you can process it for a table or graph


// Add a item to the table of data



// -------------------------Delete a day's data from FRD ---------------------



// --------------------------- Home Page Loading -----------------------------
window.onload = function(){
  // ------------------------- Set Welcome Message -------------------------
  getUsername();

  if(currentUser == null){
    userLink.innerText = "Create New Account";
    userLink.classList.replace("nav-link", "btn");
    userLink.classList.add("btn-primary");
    userLink.href = "register.html";

    signOutLink.innertext = "Sign In"
    signOutLink.classList.replace("nav-link", "btn");
    signOutLink.classList.add("btn-success")
    signOutLink.href = "signIn.html";
  }
  else{
    userLink.innerText = currentUser.firstname; 
    welcome.innerText = "Welcome " + currentUser.firstname;
    userLink.classList.replace("btn", "nav-link");
    userLink.classList.add("btn-primary");
    userLink.href = "#";

    signOutLink.innertext = "Sign In"
    signOutLink.classList.replace("btn", "nav-link");
    signOutLink.classList.add("btn-success")
    document.getElementById('signOut').onclick = function(){
      signOutUser();
    }
  };
  // Set, Update, Get, Remove Temperature Data


  // Set Data
  document.getElementById('set').onclick = function(){
    const day = document.getElementById('day').value;
    const condition = document.getElementById('condition').value;
    const diameter = document.getElementById('diameter').value;
    const userID = currentUser.uid;
    
    setData(userID, day, condition, diameter);

  };

  //Update Data
  document.getElementById('update').onclick = function(){
    const day = document.getElementById('day').value;
    const condition = document.getElementById('condition').value;
    const diameter = document.getElementById('diameter').value;
    const userID = currentUser.uid;
    
    updateData(userID, day, condition, diameter);

  }

  //Get  Data
  document.getElementById('get').onclick = function(){
    const year = document.getElementById('getYear').value;
    const month = document.getElementById('getMonth').value;
    const day = document.getElementById('getDay').value;
    
    const userID = currentUser.uid;
    
    getData(userID, year, month, day);

  }
}

  
  // Get, Set, Update, Delete Sharkriver Temp. Data in FRD
  // Set (Insert) data function call
  
  // Update data function call
  

  // Get a datum function call
  

  // Get a data set function call
  

  // Delete a single day's data function call
  

