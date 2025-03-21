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
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Fetch all users from the `users` table
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode(["status" => "success", "users" => $users]);
} else {
    echo json_encode(["status" => "error", "message" => "No users found"]);
}

// Close the database connection
$conn->close();
?>