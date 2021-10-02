<?php
@session_start();
if (isset($_SESSION['loginSuccess'])) {
    
    $connect = mysqli_connect("localhost","u491101165_feutre","v#h*=bE2?","u491101165_feutre");
$arr = [];
// =======Last 24h==============

// $earningsDay = mysqli_query($connect,"SELECT totall,clientEarnings,cart FROM clients WHERE ClientDate > DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 DAY)");

// ====== Today ==========
$earningsDay = mysqli_query($connect,"SELECT totall,clientEarnings,cart FROM clients WHERE ClientDate >=  CURRENT_DATE + ' 00:00:00'");
$earningsMonth = mysqli_query($connect,"SELECT totall,clientEarnings,cart FROM clients WHERE ClientDate > DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 MONTH)");
// $earnings = mysqli_query($connect,"SELECT clientEarnings FROM clients WHERE ClientDate >='2021-05-22 00:00:00'
// AND ClientDate <'2021-05-27 00:00:00' ");
array_push($arr, mysqli_fetch_all($earningsDay), mysqli_fetch_all($earningsMonth)); 


echo json_encode($arr);

return;


// <!-- select * from table_name where date_column 
// between "2018-01-04 00:00:00" and "2018-01-04 11:59:59"; -->

// <!-- $earnings = mysqli_query($connect,"SELECT id FROM clients WHERE ClientDate > DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 DAY)");
// echo json_encode(mysqli_fetch_all($cc)); -->

}else{
    echo "NoConnect";
    return;
    }


?>