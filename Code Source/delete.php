<?php

@session_start();
if (isset($_SESSION['loginSuccess'])) {
    
require_once('db.php');

if (isset($_POST['deleteId'])) {


$deleteMe = $_POST['deleteId'];

mysqli_query($connect, "DELETE FROM feutre WHERE id = $deleteMe");

// header('location:/');

$arr = ['res'=>1];

echo json_encode($arr);

}

}else{
    echo "NoConnect";
    return;
    }

?>