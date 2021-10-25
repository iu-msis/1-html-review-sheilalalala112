<?php

// if (($_SERVER['REQUEST_METHOD'] ?? '') != 'POST') {
//     header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed");
//     exit;
// }

// if everything is the try dies catch will do 
try {
    $_POST = json_decode( 
                file_get_contents('php://input'), //get everything in the body of the request
                true,
                2, //Depth of 2 is the deepest it will go
                JSON_THROW_ON_ERROR //parameter, don't fail silently
            );
} catch (Exception $e) { //if it dies, send a 400--> user error then exit 
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    // print_r($_POST);
    // echo file_get_contents('php://input');
    exit;
}

require("class/DbConnection.php");

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: change the query to delete the whole row in the offer table 
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
  'DELETE FROM book WHERE id = ?'
);
// pass all these values to the query
// info be passed later
$stmt->execute([
  $_POST['id']
]);

// Get auto-generated PK from DB
// https://www.php.net/manual/en/pdo.lastinsertid.php
// $pk = $db->lastInsertId();  

// Step 4: Output
// Here, instead of giving output, I'm redirecting to the SELECT API,
// just in case the data changed by entering it
header('HTTP/1.1 303 See Other'); //303 means so far it's succeed, for the rest of the info go to offer/?student='
header('Location: ../offer/?student=' . $_POST['studentId']);//what is this?