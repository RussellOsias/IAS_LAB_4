import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// DOM Elements
const profileEmail = document.getElementById('profileEmail');
const logoutButton = document.getElementById('logoutButton');

// Handle Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);

    // Display user's email
    profileEmail.textContent = user.email;

    // Show logout button
    logoutButton.classList.remove('hidden');
  } else {
    console.log("User is signed out");

    // Redirect to login page if no user is logged in
    window.location.href = "index.html";
  }
});

// Logout User
logoutButton.addEventListener('click', () => {
  console.log("Attempting to log out...");

  signOut(auth)
    .then(() => {
      console.log("User logged out successfully.");
      alert("Logged out successfully!");
      window.location.href = "index.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Logout failed:", error);
      alert("Error: " + error.message);
    });
});