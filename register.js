import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// DOM Elements
const registerForm = document.getElementById("registerForm");

// Register User
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  const firstName = document.getElementById("reg-first-name").value;
  const middleName = document.getElementById("reg-middle-name").value;
  const lastName = document.getElementById("reg-last-name").value;
  const phoneNumber = document.getElementById("reg-phone-number").value;
  const address = document.getElementById("reg-address").value;
  const profilePicture = document.getElementById("reg-profile-picture").files[0]; // Profile picture file

  console.log("Attempting to register with:", email, password);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      console.log("User registered successfully:", user.email);

      // Send email verification
      return sendEmailVerification(user);
    })
    .then(() => {
      // Send user data to PHP backend
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("middle_name", middleName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("password", password); // Password should be securely hashed in PHP
      formData.append("phone_number", phoneNumber);
      formData.append("address", address);
      formData.append("role", "resident"); // Default role
      formData.append("profile_picture", profilePicture); // Profile picture file

      return fetch("register_user.php", {
        method: "POST",
        body: formData,
      });
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Registration successful! Please check your email to verify your account.");
        window.location.href = "index.html"; // Redirect to login page
      } else {
        alert("Error saving user data: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Registration failed:", error);
      alert("Error: " + error.message);
    });
});