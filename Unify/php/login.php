<?php 
try{
    @include "./connection.php";
    $query = $db -> prepare("SELECT username, password
                      FROM users
                      WHERE users.username='$_GET[username]';");
    $query -> execute();
    $results = $query -> fetchAll();
    if($query -> rowCount() > 0){
        if($results[0]['password'] == $_GET['password']){
            session_start();
            $_SESSION['username'] = $_GET['username'];
            echo "LOGGED";
        }else{
            echo "PSW_ERR";
        }
    }else{
        echo "USR_ERR";
    }
}catch(Exception $e){
    echo "error: ".$e -> getMessage();
}
?>
