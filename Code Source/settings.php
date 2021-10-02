<?php

@session_start();
if (isset($_SESSION['loginSuccess'])) {

require_once('db.php');

    if (isset($_POST['newUsername']) && isset($_POST['newPass'])) {
        $username = $_POST['newUsername'];
        $password = $_POST['newPass'];
        mysqli_query($connect, " UPDATE users SET username = '$username' , password = '$password' WHERE id = 1 ");
        $_SESSION['username'] = $_POST['newUsername'];
        echo "success";
        return;
    }elseif (isset($_POST['newPass'])) {
        $password = $_POST['newPass'];
        mysqli_query($connect, " UPDATE users SET password = '$password' WHERE id = 1 ");
        echo "success";
        return;
    }

    echo "error";

}else{
    echo "NoConnect";
    return;
}
