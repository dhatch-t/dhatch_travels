<?php
// Database connection details
$servername = "localhost";
$username = "u860777907_dhatchtnt";
$password = "dhatchDB@2024";
$dbname = "u860777907_dhatch_db";

// Form fields from POST request
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'] ?? 'Not provided';
$destination = $_POST['destination'];
$travel_date = $_POST['travel_date'];
$num_people = $_POST['num_people'];
$source_page = $_POST['source_page'];

// 1. Store Data in the Database
try {
    // Establish connection
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL query to insert form data
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
$body = "Name: $name\nPhone: $phone\nEmail: $email\nDestination: $destination\nDate of Travel: $travel_date\n"
      . "Number of People: $num_people\nSource Page: $source_page\nMessage: $message";

$headers = "From: info@dhatchtravels.com";

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo "Email sent successfully";
} else {
    echo "Failed to send email";
}
?>