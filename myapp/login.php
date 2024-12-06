<?php
// login.php
header('Content-Type: application/json');

// Get POST data
$email = $_POST['email'];
$password = $_POST['password'];

// Database connection
$servername = "localhost";
$username = "root";  // Default MySQL username
$passwordDB = "";    // Default MySQL password
$dbname = "user_db"; // Your database name

$conn = new mysqli($servername, $username, $passwordDB, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL to check if the email exists
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        echo json_encode(["message" => "Login successful"]);
    } else {
        echo json_encode(["message" => "Invalid password"]);
    }
} else {
    echo json_encode(["message" => "User not found"]);
}

$conn->close();
?>
