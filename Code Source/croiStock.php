<?php
@session_start();
if (isset($_SESSION['loginSuccess'])) {
    
require_once('db.php');

if ($_POST['croiStock'] >= 0) {


    $editMe = $_POST['editId'];
    $croiStock = $_POST['croiStock'];

    $checkStock = mysqli_query($connect," SELECT stock FROM feutre WHERE id = $editMe ");
    $arr = mysqli_fetch_assoc($checkStock);


        mysqli_query($connect, " UPDATE feutre SET stock = stock + $croiStock WHERE id = $editMe ");


    $data = ['res'=>1 , 'newStock' => ($arr['stock']) + ($croiStock)];

    echo json_encode($data);


}
}else{
    echo "NoConnect";
    return;
    }


?>