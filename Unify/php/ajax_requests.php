<?php
    @include './connection.php';
    try{
        switch($_GET['type']){
            case 'songs':
                echo  "{\n\"songs\":[\n";
                $rows = $db -> prepare("SELECT album.foto,canzone.titolo,album.nome,canzone.durata
                                        FROM canz_alb
                                        JOIN canzone ON(canz_alb.id_canzone = canzone.id)
                                        JOIN album ON(canz_alb.id_album = album.id);");
                $rows -> execute();
                $result = $rows->fetchAll();
                for($i = 0; $i < $rows -> rowCount(); $i++){
                    echo "{\"name\":\"".$result[$i]['titolo']."\"}";
                    if($i != $rows -> rowCount() -1){
                        echo ",\n";
                    }
                }
                echo "\n]\n}";
                break;
            
        }
    }catch (PDOException $e){
        echo 'connection failed: ' . $e->getMessage();
    }
?>