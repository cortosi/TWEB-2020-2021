<?php
@include './connection.php';
switch ($_GET['type']) {
    case 'songs':
        if ($_GET['username'] == 'admin') {
            $rows = $db->prepare('SELECT S.name songname,Al.name as albname,Ar.name as artname, S.length as length
                                FROM songs S JOIN songs_albums SA ON S.id = SA.song_id
                                JOIN albums Al ON SA.album_id=Al.id
                                JOIN artists_albums ArAl ON Al.id=ArAl.album_id
                                JOIN artists Ar ON ArAl.artist_name=Ar.name');
        } else {
            $rows = $db->prepare("SELECT S.name songname,Al.name as albname,Ar.name as artname, S.length as length
            FROM songs S JOIN songs_albums SA ON S.id = SA.song_id
            JOIN albums Al ON SA.album_id=Al.id
            JOIN artists_albums ArAl ON Al.id=ArAl.album_id
            JOIN artists Ar ON ArAl.artist_name=Ar.name
            WHERE S.id IN (SELECT song_id 
                            FROM user_songs 
                            WHERE user_songs.username = '$_GET[username]');");
        }
        $rows->execute();
        $result = $rows->fetchAll();
        echo  "{\n\"songs\":[\n";
        for ($i = 0; $i < $rows->rowCount(); $i++) {
            echo "{\"name\":\"" . $result[$i]['songname'] . "\",
                        \n \"artist\":\"" . $result[$i]['artname'] . "\",
                        \n \"album\":\"" . $result[$i]['albname'] . "\",
                        \n \"length\":\"" . $result[$i]['length'] . "\"
                }";
            if ($i != $rows->rowCount() - 1) {
                echo ",\n";
            }
        }
        echo "\n]\n}";
        break;
    case 'album':
        if ($_GET['username'] == 'admin') {
            $rows = $db->prepare("SELECT DISTINCT albums.name as album, artists.name as artist
                                    FROM songs
                                    JOIN songs_albums ON(songs.id = songs_albums.song_id)
                                    JOIN artists_albums ON(artists_albums.album_id = songs_albums.album_id)
                                    JOIN albums ON(albums.id = songs_albums.album_id)
                                    JOIN artists ON(artists.name = artists_albums.artist_name);");
        } else {
            $rows = $db->prepare("SELECT DISTINCT albums.name as album, artists.name as artist
                                    FROM songs
                                    JOIN songs_albums ON(songs.id = songs_albums.song_id)
                                    JOIN artists_albums ON(artists_albums.album_id = songs_albums.album_id)
                                    JOIN albums ON(albums.id = songs_albums.album_id)
                                    JOIN artists ON(artists.name = artists_albums.artist_name)
                                    WHERE songs.id IN (SELECT song_id 
                                                    FROM user_songs 
                                                    WHERE user_songs.username = '$_GET[username]');");
        }
        $rows->execute();
        $result = $rows->fetchAll();
        echo  "{\n\"albums\":[\n";
        for ($i = 0; $i < $rows->rowCount(); $i++) {
            echo "{\"album\":\"" . $result[$i]['album'] . "\",
                            \n\"artist\":\"" . $result[$i]['artist'] . "\"
                    }";
            if ($i != $rows->rowCount() - 1) {
                echo ",\n";
            }
        }
        echo "\n]\n}";
        break;
    case 'playlist':
        $rows = $db->prepare("SELECT pl_name FROM playlists
                              WHERE playlists.user = '$_GET[username]';");
        $rows->execute();
        $result = $rows->fetchAll();
        echo  "{\n\"playlists\":[\n";
        for ($i = 0; $i < $rows->rowCount(); $i++) {
            echo "{\"name\":\"" . $result[$i]['pl_name'] . "\"}";
            if ($i != $rows->rowCount() - 1) {
                echo ",\n";
            }
        }
        echo "\n]\n}";
        break;
    case 'artists':
        if ($_GET['username'] == 'admin') {
            $rows = $db->prepare("SELECT DISTINCT artists.name as name
                                    FROM songs
                                    JOIN songs_albums ON(songs.id = songs_albums.song_id)
                                    JOIN artists_albums ON(artists_albums.album_id = songs_albums.album_id)
                                    JOIN albums ON(albums.id = songs_albums.album_id)
                                    JOIN artists ON(artists.name = artists_albums.artist_name)
                                    WHERE songs.id IN (SELECT song_id);");
        } else {
            $rows = $db->prepare("SELECT DISTINCT artists.name as name
            FROM songs
            JOIN songs_albums ON(songs.id = songs_albums.song_id)
            JOIN artists_albums ON(artists_albums.album_id = songs_albums.album_id)
            JOIN albums ON(albums.id = songs_albums.album_id)
            JOIN artists ON(artists.name = artists_albums.artist_name)
            WHERE songs.id IN (SELECT song_id 
                            FROM user_songs 
                            WHERE user_songs.username = '$_GET[username]');");
        }
        $rows->execute();
        $result = $rows->fetchAll();
        echo  "{\n\"artists\":[\n";
        for ($i = 0; $i < $rows->rowCount(); $i++) {
            echo "{\"name\":\"" . $result[$i]['name'] . "\"}";
            if ($i != $rows->rowCount() - 1) {
                echo ",\n";
            }
        }
        echo "\n]\n}";
        break;
    case 'check_pl_exist':
        $rows = $db->prepare("SELECT pl_name
                                    FROM playlists
                                    WHERE user = '$_GET[username] AND 'pl_name='$_GET[new_pl_text]';");
        $rows->execute();
        $result = $rows->fetchAll();
        echo  "{\n\"playlists\":[\n";
        for ($i = 0; $i < $rows->rowCount(); $i++) {
            echo "{\"name\":\"" . $result[$i]['pl_name'] . "\"
                    }";
            if ($i != $rows->rowCount() - 1) {
                echo ",\n";
            }
        }
        echo "\n]\n}";
        break;
    case 'new_pl':
        $query = $db->prepare("INSERT INTO playlists (user, pl_name)
                                    VALUES ('$_GET[username]', '$_GET[name]');");
        $query->execute();
        echo "ok";
        break;
    case 'songs_into_pl':
        $rows = $db->prepare("SELECT songs.name as name, artists.name as artist, albums.name as album 
                                FROM playlists
                                JOIN playlists_songs ON(playlists.pl_name = playlists_songs.pl_name)
                                JOIN songs ON(playlists_songs.song_id = songs.id)
                                JOIN songs_albums ON(songs_albums.song_id = songs.id)
                                JOIN albums ON(songs_albums.album_id = albums.id)
                                JOIN artists_albums ON(artists_albums.album_id = albums.id)
                                JOIN artists ON(artists_albums.artist_name = artists.name)
                                WHERE playlists.user = '$_GET[username]' AND playlists.pl_name = '$_GET[pl_name]';");
        $rows->execute();
        $result = $rows->fetchAll();
        echo  "{\n\"songs\":[\n";
        for ($i = 0; $i < $rows->rowCount(); $i++) {
            echo "{\"name\":\"" . $result[$i]['name'] . "\",
                            \n \"artist\":\"" . $result[$i]['artist'] . "\",
                            \n \"album\":\"" . $result[$i]['album'] . "\"
                    }";
            if ($i != $rows->rowCount() - 1) {
                echo ",\n";
            }
        }
        echo "\n]\n}";
        break;
        break;
    case 'insert_into_pl':
        try {
            $q1 = $db->prepare("SELECT songs.id as id
                                FROM songs
                                WHERE songs.name = '$_GET[name]'");
            $q1->execute();
            $song_id_arr = $q1->fetchAll();
            $song_id = $song_id_arr[0]['id'];
            $query = $db->prepare("INSERT INTO playlists_songs (pl_name, song_id)
                                   VALUES ('$_GET[pl_name]', '$song_id');");
            $query->execute();
            echo 'ok';
        } catch (Exception $e) {
            echo 'ERROR' . $e->getMessage();
        }
        break;
    case 'album_songs':
        $rows = $db->prepare("SELECT songs.name as name, songs.length as length
                              FROM albums
                              JOIN songs_albums ON(albums.id = songs_albums.album_id)
                              JOIN songs ON(songs.id = songs_albums.song_id)
                              WHERE albums.id = (SELECT id FROM albums WHERE name = '$_GET[album]')");
        $rows->execute();
        $result = $rows->fetchAll();
        echo  "{\n\"songs\":[\n";
        for ($i = 0; $i < $rows->rowCount(); $i++) {
            echo "{\"name\":\"" . $result[$i]['name'] . "\",
                    \n\"lenght\":\"" . $result[$i]['length'] . "\"
                    }";
            if ($i != $rows->rowCount() - 1) {
                echo ",\n";
            }
        }
        echo "\n]\n}";
        break;
    case 'album_artist_per_user':
        $rows = $db->prepare("SELECT albums.name as album, albums.genre as genre, songs.name as songname
                                FROM songs
                                JOIN user_songs ON(user_songs.song_id = songs.id)
                                JOIN songs_albums ON(songs_albums.song_id = user_songs.song_id)
                                JOIN albums ON(albums.id = songs_albums.album_id)
                                JOIN artists_albums ON(albums.id = artists_albums.album_id)
                                WHERE user_songs.username = '$_GET[username]' AND artists_albums.artist_name = '$_GET[artist]'");
        $rows->execute();
        $result = $rows->fetchAll();
        $lastalb = $result[0]['album'];
        echo  "{\n\"albums\":[\n{\"albumname\":\"" . $result[0]['album'] . "\",\n
            \"songs\": [\n
            {\"songname\":\"" . $result[0]['songname'] . "\"}";
        for ($i = 1; $i < $rows->rowCount(); $i++) {
            if ($result[$i]['album'] == $lastalb) {
                echo ",{\"songname\":\"" . $result[$i]['songname'] . "\"}";
            } else {
                $lastalb = $result[$i]['album'];
                echo "]},\n{\"albumname\":\"" . $result[$i]['album'] . "\",\n
                    \"songs\": [\n";
                echo "{\"songname\":\"" . $result[$i]['songname'] . "\"}";
            }
        }
        echo "]}\n]\n}";
        break;
}
