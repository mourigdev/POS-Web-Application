<?php

if (isset($_POST['logout'])) {
    if ($_POST['logout'] == 'true') {
    session_start();
    session_destroy();
    echo "logout";
    }
}

?>