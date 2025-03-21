import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Google Provider
const googleProvider = new GoogleAuthProvider();

// DOM Elements
const loginForm = document.getElementById('loginForm');
const googleLoginButton = document.getElementById('googleLoginButton');

// Handle Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);

    // Check if email is verified
    if (user.emailVerified) {
      console.log("Email is verified. Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500); // 500ms delay
    } else {
      console.log("Email is not verified.");
      alert("Please verify your email before logging in.");
      signOut(auth).then(() => {
        console.log("User logged out due to unverified email.");
        window.location.href = "index.html";
      });
    }
  } else {
    console.log("User is signed out");
  }
});

// Login User
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log("Attempting to log in with:", email, password);

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("Login successful.");
    })
    .catch((error) => {
      console.error("Login failed:", error);
      alert("Error: " + error.message);
    });
});

// Login with Google
googleLoginButton.addEventListener('click', () => {
  console.log("Attempting to log in with Google...");

  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;

      console.log("Logged in with Google successfully:", user.email);

      // Redirect to dashboard if email is verified
      if (user.emailVerified) {
        console.log("Email is verified. Redirecting to dashboard...");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 500); // 500ms delay
      } else {
        console.log("Email is not verified.");
        alert("Please verify your email before logging in.");
        signOut(auth).then(() => {
          console.log("User logged out due to unverified email.");
          window.location.href = "index.html";
        });
      }
    })
    .catch((error) => {
      console.error("Google login failed:", error);
      alert("Error: " + error.message);
    });
});