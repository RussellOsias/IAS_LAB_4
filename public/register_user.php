<?php
// Database configuration
$host = "127.0.0.1"; // Your database host
$username = "root"; // Your database username
$password = ""; // Your database password (leave empty if no password)
$dbname = "wecare"; // Your database name

// Create a connection to the database
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user data from POST request (sent from your frontend)
$first_name = $_POST['first_name'];
$middle_name = $_POST['middle_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password
$phone_number = $_POST['phone_number'];
$address = $_POST['address'];
$role = $_POST['role'] ?? 'resident'; // Default role is 'resident'

// Insert user data into the `users` table
$sql = "INSERT INTO users (first_name, middle_name, last_name, email, password, phone_number, address, role)
        VALUES ('$first_name', '$middle_name', '$last_name', '$email', '$password', '$phone_number', '$address', '$role')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "User registered successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

// Close the database connection
$conn->close();
?>