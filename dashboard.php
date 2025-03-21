<?php
session_start();
require_once 'includes/db_conn.php';
require_once 'includes/authentication.php';

// Redirect if not authenticated
if (!isset($_SESSION['user_id'])) {
    if (isset($_COOKIE['auth_token'])) {
        if (!authenticateToken($_COOKIE['auth_token'])) {
            header("Location: login.php");
            exit();
        }
    } else {
        header("Location: login.php");
        exit();
    }
}

$user_id = $_SESSION['user_id'];

// Fetch user data (name, profile picture, and role)
try {
    $stmt = $conn->prepare("SELECT first_name, last_name, profile_picture, role FROM users WHERE id = :id");
    $stmt->bindParam(':id', $user_id);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        die("User not found.");
    }
} catch (PDOException $e) {
    die("Error fetching user data: " . $e->getMessage());
}

// Fetch total users and role counts
try {
    $stmt = $conn->query("SELECT COUNT(*) AS total_users FROM users");
    $totalUsers = $stmt->fetch(PDO::FETCH_ASSOC)['total_users'];
    $stmt = $conn->query("SELECT role, COUNT(*) AS count FROM users GROUP BY role");
    $roleCounts = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
} catch (PDOException $e) {
    die("Error fetching user data: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
  <link rel="stylesheet" href="./assets/css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <style>
    /* Same styles as provided */
  </style>
</head>
<body>
  <div class="dashboard-wrapper">
    <?php include 'includes/sidebar.php'; ?>
    
    <main class="main-content">
      <header class="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <div class="user-info">
          <img src="<?php echo $user['profile_picture'] ? htmlspecialchars($user['profile_picture']) : './assets/images/default_profile.png'; ?>" alt="Profile Picture">
          <span><?php echo htmlspecialchars($user['first_name'] . ' ' . $user['last_name']); ?></span>
        </div>
      </header>

      <section class="dashboard-stats">
        <!-- Conditionally render or disable the "Total Users" card -->
        <a href="manage_users.php" class="card <?php echo $user['role'] === 'resident' ? 'disabled' : ''; ?>">
          <i class="fas fa-users"></i> 
          <div>
            <span>Total Users</span>
            <strong><?php echo $totalUsers; ?></strong>
          </div>
        </a>
        <div class="card">
          <i class="fas fa-user-shield"></i> 
          <div>
            <span>Admins</span>
            <strong><?php echo $roleCounts['admin'] ?? 0; ?></strong>
          </div>
        </div>
        <div class="card">
          <i class="fas fa-user-tie"></i> 
          <div>
            <span>Officers</span>
            <strong><?php echo $roleCounts['officer'] ?? 0; ?></strong>
          </div>
        </div>
        <div class="card">
          <i class="fas fa-user"></i> 
          <div>
            <span>Residents</span>
            <strong><?php echo $roleCounts['resident'] ?? 0; ?></strong>
          </div>
        </div>
      </section>
    </main>
  </div>
</body>
</html>