<?php
@session_start();
if (isset($_SESSION['loginSuccess'])) {

require_once('db.php');
$editMe = $_POST['editId'];
$MyEdited = mysqli_query($connect,"SELECT id, label, prix, imgSrc,stock,CodeBare,BuyingPrice  FROM feutre WHERE id = $editMe");

echo json_encode(mysqli_fetch_assoc($MyEdited));

}else{
    echo "NoConnect";
    return;
}

?>