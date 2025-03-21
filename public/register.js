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
      fetch("register_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          email: email,
          password: password, // Password should be securely hashed in PHP
          phone_number: phoneNumber,
          address: address,
          role: "resident", // Default role
        }),
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
          console.error("Error sending data to server:", error);
          alert("Error: Failed to save user data.");
        });
    })
    .catch((error) => {
      console.error("Registration failed:", error);
      alert("Error: " + error.message);
    });
});