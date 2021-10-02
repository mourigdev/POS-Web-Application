<?php
@session_start();
if (isset($_SESSION['loginSuccess'])) {
    require_once('db.php');

if ($_POST['decStock'] >= 0) {


    $editMe = $_POST['editId'];
    $decStock = $_POST['decStock'];

    $checkStock = mysqli_query($connect," SELECT stock FROM feutre WHERE id = $editMe ");
    $arr = mysqli_fetch_assoc($checkStock);

    if ( ($arr['stock']) - ($decStock) >= 0) {
        mysqli_query($connect, " UPDATE feutre SET stock = stock - $decStock WHERE id = $editMe ");

        $data = ['res'=>1,'newStock' => ($arr['stock']) - ($decStock)];

        echo json_encode($data);
    };



}
}else{
    echo "NoConnect";
    return;
    }



?>