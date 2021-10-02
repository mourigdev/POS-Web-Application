<?php
@session_start();
if (isset($_SESSION['loginSuccess'])) {
    
$connect = mysqli_connect("localhost","u491101165_feutre","v#h*=bE2?","u491101165_feutre");
$arr = [];
$Daily =[];
$Weekly = [];
$Monthly = [];


// Last 7 Days
for ($i=1; $i <7 ; $i++) { 

$earningsWeek = mysqli_query($connect , " SELECT ClientDate,totall,clientEarnings,cart FROM clients WHERE ClientDate >= DATE(NOW()) + INTERVAL (-$i) DAY AND ClientDate < DATE(NOW()) + INTERVAL ((-$i)+1) DAY " );
array_push($Daily, mysqli_fetch_all($earningsWeek)); 

}


// Last 12 Months
for ($i=1; $i <13 ; $i++) { 

    $earningsMonthly = mysqli_query($connect , " SELECT ClientDate,totall,clientEarnings,cart FROM clients WHERE ClientDate >= CURRENT_TIMESTAMP + INTERVAL (-$i) MONTH AND ClientDate < CURRENT_TIMESTAMP + INTERVAL ((-$i)+1) MONTH " );
    array_push($Monthly, mysqli_fetch_all($earningsMonthly)); 
    
}



// Last 4 Weeks
for ($i=1; $i <5 ; $i++) { 

    $earningsThisMonth = mysqli_query($connect , " SELECT ClientDate,totall,clientEarnings,cart FROM clients WHERE ClientDate >= CURRENT_TIMESTAMP + INTERVAL (-$i) WEEK AND ClientDate < CURRENT_TIMESTAMP + INTERVAL ((-$i)+1) WEEK " );
    array_push($Weekly, mysqli_fetch_all($earningsThisMonth)); 
    
}


array_push($arr, $Daily, $Weekly, $Monthly ); 




echo json_encode($arr);

return;

}else{
    echo "NoConnect";
    return;
    }


?>