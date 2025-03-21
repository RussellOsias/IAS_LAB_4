// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZD0FiX_dTO8iojw4R1W95Ybk75V0sIag",
  authDomain: "info-efb6b.firebaseapp.com",
  projectId: "info-efb6b",
  storageBucket: "info-efb6b.firebasestorage.app",
  messagingSenderId: "8141133981",
  appId: "1:8141133981:web:a01a544d206acffd199c74",
  measurementId: "G-9T38NLDXKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);