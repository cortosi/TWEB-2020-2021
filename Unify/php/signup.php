<?php 
try{
    @include "./connection.php";
    $query_user = $db -> prepare("SELECT username
                                  FROM user
                                  WHERE user.username='$_GET[username]';");
    $query_email = $db -> prepare("SELECT email
                                    FROM user
                                    WHERE user.email='$_GET[email]';");           
    $query_user -> execute();
    $query_email -> execute();
    $results = $query_user -> fetchAll();
    if(($query_user -> rowCount() == 0) && ($query_email -> rowCount() == 0)){
        $insert_query = $db->prepare("INSERT INTO user (username, email, photo, gender, psw) 
                                      VALUES ('$_GET[username]', '$_GET[email]', NULL, '$_GET[gender]', '$_GET[password]');");
        $insert_query -> execute();
        echo "REGISTERED";
    }else if($query_user -> rowCount() > 0){
        echo 'USERNAME_EXIST';
    }else{
        echo 'EMAIL_EXIST';
    }
}catch(Exception $e){
    echo "error: ".$e -> getMessage();
}
?>
