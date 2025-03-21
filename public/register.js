import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Initialize Firestore
const db = getFirestore();

// DOM Elements
const registerForm = document.getElementById('registerForm');

// Register User
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  console.log("Attempting to register with:", email, password);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      console.log("User registered successfully:", user.email);

      // Send email verification
      return sendEmailVerification(user);
    })
    .then(() => {
      alert("Registration successful! Please check your email to verify your account.");
      window.location.href = "index.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Registration failed:", error);
      alert("Error: " + error.message);
    });
});