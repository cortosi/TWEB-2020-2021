<?php
try{
    $connectstr = "mysql:dbname=unify;host=localhost:3306";
    $db = new PDO($connectstr, "root", "");
}catch (PDOException $e){
    echo 'connection failed: ' . $e->getMessage();
}
?>