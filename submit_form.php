<?php
// Database connection details

// var_dump($_POST);
// exit;


$servername = "localhost";
$username = "u860777907_dhatchtnt";
$password = "dhatchDB@2024";
$dbname = "u860777907_dhatch_db";

// Form fields from POST request
$name = $_POST['name'] ?? null;
$phone = $_POST['phone'] ?? null;
$email = $_POST['email'] ?? 'Not provided';
$destination = $_POST['destination'] ?? null;
$travel_date = $_POST['travel_date'] ?? null;
$num_people = $_POST['num_people'] ?? null;
$source_page = $_POST['source_page'] ?? 'Home/Contact';

// Check if required fields are present
// if (!$name || !$phone || !$destination || !$travel_date || !$num_people) {
//     echo "Error: All required fields must be filled out.";
//     exit;
// }

try {
    // Establish connection
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("SET time_zone = '+05:30'");

    // SQL query to insert form data (timestamp is automatically added by MySQL)
    $stmt = $conn->prepare("INSERT INTO form_submissions (name, phone, email, destination, travel_date, num_people, source_page) 
                            VALUES (:name, :phone, :email, :destination, :travel_date, :num_people, :source_page)");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':destination', $destination);
    $stmt->bindParam(':travel_date', $travel_date);
    $stmt->bindParam(':num_people', $num_people);
    $stmt->bindParam(':source_page', $source_page);

    // Execute the query
    $stmt->execute();
    echo "Data stored successfully";
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;

// 2. Send Form Data as an Email
$to = "jasonsanjay.s9a@gmail.com";
$subject = "New Form Submission from $source_page";
$submission_date = date("Y-m-d H:i:s"); // Get current timestamp
$body = "Name: $name\nPhone: $phone\nEmail: $email\nDestination: $destination\nDate of Travel: $travel_date\n"
      . "Number of People: $num_people\nSource Page: $source_page\nSubmission Date: $submission_date";

$headers = "From: info@dhatchtravels.com";

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo "Email sent successfully";
} else {
    echo "Failed to send email";
}
?>
