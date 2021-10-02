<?php

@session_start();
if (isset($_SESSION['loginSuccess'])) {

require_once('db.php');

if (isset($_POST['label']) && isset($_POST['prix']) && $_POST['prixBuying']) {

    if (is_numeric($_POST['prix']) && is_numeric($_POST['prixBuying'])) {
        
$editMe = $_GET['editId'];
$label = $_POST['label'];
$prix = $_POST['prix'];
$stock = $_POST['stock'];
$prixBuying = $_POST['prixBuying'];

    

if ($prix != 0 && $prixBuying != 0 && $prixBuying < $prix ) {


if ($_FILES['fileToUpload']['tmp_name']) {


if(filesize($_FILES['fileToUpload']['tmp_name']) < 2000000){
    
    
    $productId = uniqid($label);
    $path = "images/";
    $target_file =  $path;
    $file=$_FILES['fileToUpload']['name'];
    if(exif_imagetype ($_FILES['fileToUpload']['tmp_name'])==(IMAGETYPE_JPEG || IMAGETYPE_PNG)){
    
    $result = move_uploaded_file($_FILES['fileToUpload']['tmp_name'],$target_file.$productId.$file);
    
    }

    $img = str_replace(" ","%20",$productId.$file);

    if (isset($_POST['codebar']) && is_numeric($_POST['codebar'])) {
        $codebar = $_POST['codebar'];
        mysqli_query($connect, " UPDATE feutre SET prix = '$prix', label = '$label', imgSrc = '$img', stock='$stock',BuyingPrice = '$prixBuying', CodeBare = $codebar WHERE id = $editMe ");
        echo "yes";
        
     return;
    }else {
        mysqli_query($connect, " UPDATE feutre SET prix = '$prix', label = '$label', imgSrc = '$img', stock='$stock',BuyingPrice = '$prixBuying' WHERE id = $editMe ");
        echo "yes";
        
            return;
    }
    

    }
}else {

    if (isset($_POST['codebar']) && is_numeric($_POST['codebar'])) {
        $codebar = $_POST['codebar'];
        mysqli_query($connect, " UPDATE feutre SET prix = '$prix', label = '$label', stock='$stock',BuyingPrice = '$prixBuying',CodeBare = $codebar WHERE id = $editMe ");
        echo "yes";
        
     return;
    }else {
        mysqli_query($connect, " UPDATE feutre SET prix = '$prix', label = '$label', stock='$stock',BuyingPrice = '$prixBuying' WHERE id = $editMe ");
        echo 'yes';
            return;
    }


}

    
}

}

}


}else{
    echo "NoConnect";
    return;
}


?>