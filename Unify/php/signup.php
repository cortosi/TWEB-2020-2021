<?php 
try{
    @include "./connection.php";
    $query_user = $db -> prepare("SELECT username
                                  FROM users
                                  WHERE users.username='$_GET[username]';");
    $query_email = $db -> prepare("SELECT email
                                    FROM users
                                    WHERE users.email='$_GET[email]';");           
    $query_user -> execute();
    $query_email -> execute();
    $results = $query_user -> fetchAll();
    if(($query_user -> rowCount() == 0) && ($query_email -> rowCount() == 0)){
        $insert_query = $db->prepare("INSERT INTO users (username, email, password, gender) 
                                      VALUES ('$_GET[username]', '$_GET[email]', '$_GET[password]', '$_GET[gender]');");
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
