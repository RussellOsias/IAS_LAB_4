import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// DOM Elements
const profileEmail = document.getElementById("profileEmail");
const logoutButton = document.getElementById("logoutButton");
const usersList = document.getElementById("usersList");

// Handle Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);

    // Display user's email
    profileEmail.textContent = user.email;

    // Show logout button
    logoutButton.classList.remove("hidden");

    // Fetch all users from the database
    fetch("fetch_users.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const users = data.users;
          usersList.innerHTML = ""; // Clear previous content

          users.forEach((user) => {
            const userDiv = document.createElement("div");
            userDiv.className = "p-4 bg-gray-700 rounded-lg mb-2 text-center";
            userDiv.innerHTML = `
              <p><strong>Name:</strong> ${user.first_name} ${user.middle_name} ${user.last_name}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Phone:</strong> ${user.phone_number}</p>
              <p><strong>Address:</strong> ${user.address}</p>
              <p><strong>Role:</strong> ${user.role}</p>
            `;
            usersList.appendChild(userDiv);
          });
        } else {
          console.error("Failed to fetch users:", data.message);
          usersList.innerHTML = `<p class="text-red-500">Failed to load users.</p>`;
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        usersList.innerHTML = `<p class="text-red-500">An error occurred while loading users.</p>`;
      });
  } else {
    console.log("User is signed out");

    // Redirect to login page if no user is logged in
    window.location.href = "index.html";
  }
});

// Logout User
logoutButton.addEventListener("click", () => {
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