<?php
@session_start();
if (isset($_SESSION['loginSuccess'])) {

require_once('db.php');

if (isset($_POST['label']) && isset($_POST['prix']) && isset($_POST['prixBuying']) && isset($_POST['stock'])) {

    $label = preg_replace('/[^a-zA-Z0-9\']/', '', $_POST['label']);
    $prix = $_POST['prix'];
    $prixBuying = $_POST['prixBuying'];
    $stock = $_POST['stock'];



    if (is_numeric($_POST['prix']) && is_numeric($_POST['prixBuying']) && is_numeric($stock) && $prix!=0 && $prixBuying!=0) {

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
        $insert = mysqli_query($connect,"INSERT INTO feutre (label,prix,BuyingPrice,imgSrc,stock,CodeBare)
                                         VALUES ('$label', '$prix' , $prixBuying , '$img', '$stock','$codebar')"
                               );
    }else {
        $insert = mysqli_query($connect,"INSERT INTO feutre (label,prix,BuyingPrice,imgSrc,stock)
        VALUES ('$label', '$prix' , $prixBuying , '$img', '$stock')"
);
    }
    



    
    }


    }

}

echo 'yes';
// header('location:/');

}else{
    echo "NoConnect";
    return;
}

?>