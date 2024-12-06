<?php
// register.php
header('Content-Type: application/json');

// Get POST data
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Database connection
$servername = "localhost";
$username = "root";  // Default MySQL username
$passwordDB = "";    // Default MySQL password
$dbname = "user_db"; // Your database name

$conn = new mysqli($servername, $username, $passwordDB, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL to insert data
$sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashedPassword')";

if ($conn->query($sql) === TRUE) {
    // Return success response with a message and a redirect URL
    echo json_encode(["message" => "Registration successful", "redirect_url" => "http://localhost/myapp/login.php"]);
} else {
    echo json_encode(["message" => "Error: " . $conn->error]);
}

$conn->close();
?>
