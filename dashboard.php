<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
  <!-- Sidebar -->
  <div class="flex h-screen bg-gray-200">
    <div class="w-64 bg-gray-800 text-white p-4">
      <h2 class="text-xl font-bold mb-4">Sidebar</h2>
      <ul>
        <li class="mb-2"><a href="#" class="hover:text-red-500">Home</a></li>
        <li class="mb-2"><a href="#" class="hover:text-red-500">Profile</a></li>
        <li class="mb-2"><a href="#" class="hover:text-red-500">Settings</a></li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Bar -->
      <div class="bg-white p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">Welcome to the Dashboard</h1>
        <button id="logoutButton" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Logout
        </button>
      </div>

      <!-- Content Area -->
      <div class="flex-1 p-8 bg-gray-100">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <p>This is the main content area. You can customize it further.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Logout Script -->
  <script>
    document.getElementById('logoutButton').addEventListener('click', () => {
      fetch('logout.php') // Call a PHP script to handle logout
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            window.location.href = 'index.html'; // Redirect to login page
          } else {
            alert('Logout failed. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        });
    });
  </script>
</body>
</html>