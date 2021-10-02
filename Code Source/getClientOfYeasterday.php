<?php
@session_start();
if (isset($_SESSION['loginSuccess'])) {
    
$connect = mysqli_connect("localhost","u491101165_feutre","v#h*=bE2?","u491101165_feutre");

$earningsDay = mysqli_query($connect,"SELECT id, clientdate, cart, totall, clientearnings FROM clients WHERE ClientDate >  DATE_SUB(CURRENT_DATE(),INTERVAL 1 DAY) AND ClientDate < CURRENT_DATE() ORDER BY id DESC");
echo json_encode(mysqli_fetch_all($earningsDay));

return;

}else{
    echo "NoConnect";
    return;
    }


?>