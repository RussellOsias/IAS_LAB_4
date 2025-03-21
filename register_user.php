<?php
session_start();
require_once 'includes/db_conn.php';

// Handle form data
$first_name = $_POST['first_name'];
$middle_name = $_POST['middle_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password
$phone_number = $_POST['phone_number'];
$address = $_POST['address'];
$role = $_POST['role'] ?? 'resident';

// Handle profile picture upload
$profile_picture = null;
if ($_FILES['profile_picture']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/assets/images/';
    $fileName = uniqid() . '_' . basename($_FILES['profile_picture']['name']);
    $filePath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['profile_picture']['tmp_name'], $filePath)) {
        $profile_picture = './assets/images/' . $fileName; // Store relative path
    }
}

// Insert user data into the database
try {
    $stmt = $conn->prepare("
        INSERT INTO users (first_name, middle_name, last_name, email, password, phone_number, address, role, profile_picture)
        VALUES (:first_name, :middle_name, :last_name, :email, :password, :phone_number, :address, :role, :profile_picture)
    ");
    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':middle_name', $middle_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':phone_number', $phone_number);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':role', $role);
    $stmt->bindParam(':profile_picture', $profile_picture);
    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "User registered successfully"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>