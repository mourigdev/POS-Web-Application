<?php

@session_start();
if (isset($_SESSION['loginSuccess'])) {
    $arr = [];
    $smlArr = [];
    $connect = mysqli_connect("localhost","u491101165_feutre","v#h*=bE2?","u491101165_feutre");
    $result = mysqli_query($connect,"SELECT id, clientdate, cart, totall, clientearnings  FROM clients ORDER BY id DESC ");
    echo json_encode(mysqli_fetch_all($result));
}else{
    echo "NoConnect";
    return;
}

// -------------------------------
// Pagination
// SELECT * FROM clients ORDER BY `clients`.`id` LIMIT 15 OFFSET 1
// -------------------------------


// foreach ($result as $value) {

//     array_push($smlArr,$value);

//     if (count($smlArr) == 15) {

//     array_push($arr,$smlArr);
//     $smlArr = [];

//     };

    
// }

// echo json_encode($arr);

?>