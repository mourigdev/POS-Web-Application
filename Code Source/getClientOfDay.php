<?php
@session_start();
if (isset($_SESSION['loginSuccess'])) {
    
$connect = mysqli_connect("localhost","u491101165_feutre","v#h*=bE2?","u491101165_feutre");

$earningsDay = mysqli_query($connect,"SELECT id, clientdate, cart, totall, clientearnings FROM clients WHERE ClientDate >=  CURRENT_DATE + ' 00:00:00' ORDER BY id DESC ");
echo json_encode(mysqli_fetch_all($earningsDay));

return;

}else{
    echo "NoConnect";
    return;
    }


?>