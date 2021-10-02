<?php
@session_start();
if (isset($_SESSION['loginSuccess'])) {
    

    
require_once('db.php');




if (is_numeric($_POST['totall']) && $_POST['totall']>0) {

$totall = $_POST['totall'];
$allCart = json_decode($_POST['clientCart']);
$cart = $_POST['clientCart'];
$totall = $_POST['totall'];
$clientEarnings = $_POST['clientEarnings'];

foreach ($allCart as $value) {
    $id = $value -> id;
    $quantity = $value -> quantity;
    $price = $value -> price;
    $checkStock = mysqli_query($connect," SELECT stock FROM feutre WHERE id = $id ");
    $buyingprice = mysqli_query($connect," SELECT buyingprice FROM feutre WHERE id = $id ");

    $arr = mysqli_fetch_assoc($checkStock);
    $arr2 = mysqli_fetch_assoc($buyingprice);

    $getBuyingPrice = $arr2['buyingprice'];
    $getEarnings = ($price - $getBuyingPrice) * $quantity;



    if ( ($arr['stock']) - ($value -> quantity) >= 0) {
        if (($value -> quantity)>0 ) {
     
        mysqli_query($connect, " UPDATE feutre SET stock = stock - $quantity  WHERE id = $id ");
        mysqli_query($connect, " UPDATE feutre SET salesnum = salesnum + $quantity  WHERE id = $id ");
        mysqli_query($connect, " UPDATE feutre SET productearnings = productearnings + $getEarnings  WHERE id = $id ");


    }else {
        return;
    }
     
    }else {
        return;
    };

}

mysqli_query($connect, " INSERT INTO clients (cart,totall,ClientEarnings)
                                VALUES ('$cart', '$totall' , '$clientEarnings')");


$last_id = mysqli_insert_id($connect);

                                $data = ['res'=>1,'id' => $last_id];
                                echo json_encode($data);
return;

}


}else{
    echo "NoConnect";
    return;
    }





?>