<?php

@session_start();
if (isset($_SESSION['loginSuccess'])) {
    $connect = mysqli_connect("localhost","u491101165_feutre","v#h*=bE2?","u491101165_feutre");

$date = $_POST['date'];
// $date = '2021-05-31';
$fin = $date.' '.'23:59:59';

$cc = mysqli_query($connect , " SELECT ClientDate,totall,clientEarnings,cart FROM clients WHERE ClientDate BETWEEN '$date' AND '$fin' " );

echo json_encode( mysqli_fetch_all($cc) );

return;
}else{
    echo "NoConnect";
    return;
    }


?>