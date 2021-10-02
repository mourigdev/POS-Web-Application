<?php

if( isset($_POST['username'], $_POST['password']) ){

$connect = mysqli_connect("localhost","u491101165_feutre","v#h*=bE2?","u491101165_feutre");
$results = mysqli_query($connect,"SELECT * FROM users");
$data = mysqli_fetch_all($results);

if ($data[0][1] == $_POST['username'] && $data[0][2] == $_POST['password']) {
    session_start();
    $_SESSION['loginSuccess'] = "LoginTrue";
    $_SESSION['username'] = $_POST['username'];
    echo "LoginTrue";
}

}else{
    return;
}


?>