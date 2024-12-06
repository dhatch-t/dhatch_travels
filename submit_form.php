<?php
// Database connection details
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

try {
    // Establish connection
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("SET time_zone = '+05:30'");

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

    // Send email
    $to = "jasonsanjay.s9a@gmail.com";
    $subject = "New Form Submission from $source_page";
    $submission_date = date("Y-m-d H:i:s");
    $body = "Name: $name\nPhone: $phone\nEmail: $email\nDestination: $destination\nDate of Travel: $travel_date\n"
          . "Number of People: $num_people\nSource Page: $source_page\nSubmission Date: $submission_date";

    $headers = "From: info@dhatchtravels.com";

    if (mail($to, $subject, $body, $headers)) {
        // Display the "Thank You" HTML if everything is successful
        echo <<<HTML
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: linear-gradient(to bottom, #ed3237, #f05d5e);
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .thank-you-container {
                    text-align: center;
                    animation: fadeIn 1.5s ease-in-out;
                }
                .checkmark {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background-color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto 20px;
                    animation: bounce 1s ease;
                }
                .checkmark svg {
                    width: 50px;
                    height: 50px;
                }
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                h1 {
                    font-size: 2rem;
                }
                p {
                    font-size: 1.2rem;
                }
                .back-home {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #fff;
                    color: #ed3237;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }
                .back-home:hover {
                    background-color: #f05d5e;
                    color: #fff;
                }
            </style>
        </head>
        <body>
            <div class="thank-you-container">
                <div class="checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle cx="26" cy="26" r="25" fill="none" class="circle" />
                        <path fill="none" stroke="#4CAF50" stroke-width="4" d="M14 27l7 7 15-15" />
                    </svg>
                </div>
                <h1>Thank You!</h1>
                <p>We have received your details. Our team will get back to you soon!</p>
                <a href="/" class="back-home">Go Back to Home</a>
            </div>
        </body>
        </html>
        HTML;
    } else {
        echo "Data saved, but email failed to send.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
?>
