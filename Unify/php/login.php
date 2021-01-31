<?php
try {
    @include "./connection.php";
    $username = $db->quote($_GET['username']);
    $password = $db->quote(sha1($_GET['password']));
    $query = $db->prepare("SELECT username, password
                      FROM users
                      WHERE users.username = $username;");
    $query->execute();
    $results = $query->fetchAll();
    if ($query->rowCount() > 0) {
        if ($results[0]['password'] == trim($password, '\'')) {
            session_start();
            $_SESSION['username'] = trim($username, '\'');
            echo "LOGGED";
        } else {
            echo "PSW_ERR";
        }
    } else {
        echo "USR_ERR";
    }
} catch (Exception $e) {
    echo "error: " . $e->getMessage();
}
