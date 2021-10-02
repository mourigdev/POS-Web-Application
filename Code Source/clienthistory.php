<?php

@session_start();
if (isset($_SESSION['loginSuccess'])) {
    
require_once('db.php');

// $checkStock = mysqli_query($connect," SELECT cart FROM clients WHERE id = 1 ");

// $arr = mysqli_fetch_assoc($checkStock);

// $cc = json_decode($arr['cart']);

// foreach ($cc as $value) {
//     foreach ($value as $key => $value) {
//         echo "$key : $value <br>";
//     }
//     echo "<br>";
// };



$data = ['res'=>1];

echo json_encode($data);

}else{
    echo "NoConnect";
    return;
    }


?>