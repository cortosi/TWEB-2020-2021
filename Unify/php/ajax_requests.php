<?php
    @include './connection.php';
    try{
        switch($_GET['type']){
            case 'songs':
                $rows = $db -> prepare("SELECT song.title, artist.name as artname, album.name as albname, song.lenght
                                        FROM song_alb
                                        JOIN song ON(song_alb.song_id = song.id)
                                        JOIN album ON(song_alb.album_id = album.id)
                                        JOIN song_art ON(song_art.song_id = song.id)
                                        JOIN artist ON (song_art.artist_id = artist.id);");
                $rows -> execute();
                $result = $rows->fetchAll();
                echo  "{\n\"songs\":[\n";
                for($i = 0; $i < $rows -> rowCount(); $i++){
                    echo "{\"name\":\"".$result[$i]['title']."\",
                            \n \"artist\":\"".$result[$i]['artname']."\",
                            \n \"album\":\"".$result[$i]['albname']."\",
                            \n \"lenght\":\"".$result[$i]['lenght']."\"
                    }";
                    if($i != $rows -> rowCount() -1){
                        echo ",\n";
                    }
                }
                echo "\n]\n}";
                break;
            case 'album':
                $rows = $db -> prepare("SELECT album.name as album, artist.name as artist
                                        FROM alb_art
                                        JOIN album ON(alb_art.album_id = album.id)
                                        JOIN artist ON(alb_art.artist_id = artist.id);");
                $rows -> execute();
                $result = $rows->fetchAll();
                echo  "{\n\"albums\":[\n";
                    for($i = 0; $i < $rows -> rowCount(); $i++){
                        echo "{\"album\":\"".$result[$i]['album']."\",
                                \n\"artist\":\"".$result[$i]['artist']."\"
                        }";
                        if($i != $rows -> rowCount() - 1){
                            echo ",\n";
                        }
                    }
                    echo "\n]\n}";
                break;
                
            case 'playlist':
                    $rows = $db -> prepare("SELECT name
                                            FROM playlist;");
                    $rows -> execute();
                    $result = $rows->fetchAll();
                    echo  "{\n\"playlists\":[\n";
                        for($i = 0; $i < $rows -> rowCount(); $i++){
                            echo "{\"name\":\"".$result[$i]['name']."\"
                            }";
                            if($i != $rows -> rowCount() - 1){
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