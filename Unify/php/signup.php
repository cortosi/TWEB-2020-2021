<?php
try {
    @include "./connection.php";
    $username = $db->quote($_GET['username']);
    $email = $db->quote($_GET['email']);
    $password = $db->quote(sha1($_GET['password']));
    $gender = $db->quote($_GET['gender']);
    $query_user = $db->prepare("SELECT username
                                  FROM users
                                  WHERE users.username = $username;");
    $query_email = $db->prepare("SELECT email
                                    FROM users
                                    WHERE users.email = $email;");
    $query_user->execute();
    $query_email->execute();
    $results = $query_user->fetchAll();
    if (($query_user->rowCount() == 0) && ($query_email->rowCount() == 0)) {
        $insert_query = $db->prepare("INSERT INTO users (username, email, password, gender) 
                                      VALUES ($username, $email, $password, $gender);");
        $insert_query->execute();
        echo "REGISTERED";
    } else if ($query_user->rowCount() > 0) {
        echo 'USERNAME_EXIST';
    } else {
        echo 'EMAIL_EXIST';
    }
} catch (Exception $e) {
    echo "error: " . $e->getMessage();
}
