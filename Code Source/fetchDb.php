<?php
@session_start();
if ( isset($_SESSION['loginSuccess']) ) {
    require_once('db.php');
    echo json_encode(mysqli_fetch_all($result));
}else{
    echo "NoConnect";
    return;
}




?>