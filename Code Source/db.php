<?php

@session_start();
if (isset($_SESSION['loginSuccess'])) {

$connect = mysqli_connect("localhost","u491101165_feutre","v#h*=bE2?","u491101165_feutre");
$result = mysqli_query($connect,"SELECT id, label, prix, imgSrc, stock, buyingprice, salesnum, productearnings, codebare,ispricevariable  FROM feutre ORDER BY id DESC");

}

?>