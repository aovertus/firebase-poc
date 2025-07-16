import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  onChildAdded,
  push,
  set,
  child
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAGQDapaMzvYkrBVAipk0wGzXOVd03_e3o",
  authDomain: "kith-partner-app-staging.firebaseapp.com",
  databaseURL: "https://kith-partner-app-staging-default-rtdb.firebaseio.com",
  projectId: "kith-partner-app-staging",
  storageBucket: "kith-partner-app-staging.firebasestorage.app",
  messagingSenderId: "696261396428",
  appId: "1:696261396428:web:4e90179d357b2c94717f69",
  measurementId: "G-4TZJ2XRSHN",
  databaseURL: "https://kith-partner-app-staging-default-rtdb.firebaseio.com"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

function showStatus(msg) {
  document.getElementById("status").innerText = msg;
}

function renderObjects(data) {
  const container = document.getElementById("objects");
  container.innerHTML = ""; // Clear previous
  if (!data) {
    container.innerText = "No objects found.";
    return;
  }

  const div = document.createElement("div");
  console.log("Rendering item:", data);
  div.textContent = `• ${data.receiptNumber}`;
  container.appendChild(div);
}

function watchAndDuplicateEntries(userId) {
  const objectsRef = ref(db, `partners/UUID6/orders`);
  console.log("Watching for new entries in:", objectsRef.toString());
  onChildAdded(objectsRef, (object) => {

    console.log("New entry detected:", object.val());
    renderObjects(object.val());
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    showStatus(`Welcome back: ${user.email}`);

    watchAndDuplicateEntries(user.uid);

    // ... your existing code to load objects
  } else {
    showStatus("Not logged in.");
    document.getElementById("objects").innerHTML = "";
  }
});

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    showStatus(`Logged in: ${userCredential.user.email}`);
  } catch (error) {
    showStatus(`Login failed: ${error.message}`);
  }
};

window.signup = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    showStatus(`Signed up: ${userCredential.user.email}`);
  } catch (error) {
    showStatus(`Signup failed: ${error.message}`);
  }
};

window.logout = async function () {
  await signOut(auth);
  showStatus("Logged out.");
  document.getElementById("objects").innerHTML = "";
};
