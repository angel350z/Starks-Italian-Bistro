<?php
// Replace 'YOUR_API_KEY' with your actual API key from Football-Data API
$apiUrl = "https://api.football-data.org//v4/teams/";
$apiKey = "29daebcc3d344402ad30262758b6b908";

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "X-Auth-Token: $apiKey"
));

// Execute cURL request
$response = curl_exec($ch);

// Close cURL session
curl_close($ch);

// Check for errors
if ($response === false) {
    echo json_encode(array('error' => 'Failed to fetch data.'));
    exit();
}

// Return the response in JSON format
header('Content-Type: application/json');
echo $response;
?>
