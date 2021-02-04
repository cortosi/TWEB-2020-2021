<?php
@include './connection.php';
session_start();
if (isset($_SESSION['username']) && $_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['type'])) {
    switch ($_GET['type']) {
        case 'explore_songs':
            $max_songs = 18;
            $rows = $db->prepare('SELECT S.name songname,Al.name as albname,Ar.name as artname, S.length as length
                                FROM songs S JOIN songs_albums SA ON S.id = SA.song_id
                                JOIN albums Al ON SA.album_id=Al.id
                                JOIN artists_albums ArAl ON Al.id=ArAl.album_id
                                JOIN artists Ar ON ArAl.artist_name=Ar.name
                                ORDER BY S.name ASC');
            $rows->execute();
            $result = $rows->fetchAll();
            echo  "{\n\"songs\":[\n";
            for ($i = 0; $i < $max_songs; $i++) {
                echo "{\"name\":\"" . $result[$i]['songname'] . "\",
                        \n \"artist\":\"" . $result[$i]['artname'] . "\",
                        \n \"album\":\"" . $result[$i]['albname'] . "\",
                        \n \"length\":\"" . $result[$i]['length'] . "\"
                }";
                if ($i != $max_songs - 1) {
                    echo ",\n";
                }
            }
            echo "\n]\n}";
            break;
        case 'explore_album':
            $max_album = 5;
            $rows = $db->prepare("SELECT DISTINCT albums.name as album, artists.name as artist
                                        FROM songs
                                        JOIN songs_albums ON(songs.id = songs_albums.song_id)
                                        JOIN artists_albums ON(artists_albums.album_id = songs_albums.album_id)
                                        JOIN albums ON(albums.id = songs_albums.album_id)
                                        JOIN artists ON(artists.name = artists_albums.artist_name);");
            $rows->execute();
            $result = $rows->fetchAll();
            echo  "{\n\"albums\":[\n";
            for ($i = 0; $i < $max_album; $i++) {
                echo "{\"album\":\"" . $result[$i]['album'] . "\",
                                \n\"artist\":\"" . $result[$i]['artist'] . "\"
                        }";
                if ($i != $max_album - 1) {
                    echo ",\n";
                }
            }
            echo "\n]\n}";
            break;
        case 'song_list':
            $username = $db->quote($_GET['username']);
            if (isset($_GET['song_explore']) && $_GET['song_explore'] != "NULL") {
                $rows = $db->prepare("SELECT S.name songname,Al.name as albname,Ar.name as artname, S.length as length
                                        FROM songs S JOIN songs_albums SA ON S.id = SA.song_id
                                        JOIN albums Al ON SA.album_id=Al.id
                                        JOIN artists_albums ArAl ON Al.id=ArAl.album_id
                                        JOIN artists Ar ON ArAl.artist_name=Ar.name;");
            } else {
                $rows = $db->prepare("SELECT S.name songname,Al.name as albname,Ar.name as artname, S.length as length
                                        FROM songs S JOIN songs_albums SA ON S.id = SA.song_id
                                        JOIN albums Al ON SA.album_id=Al.id
                                        JOIN artists_albums ArAl ON Al.id=ArAl.album_id
                                        JOIN artists Ar ON ArAl.artist_name=Ar.name
                                        WHERE S.id IN (SELECT song_id 
                                                        FROM user_songs 
                                                        WHERE user_songs.username = $username);");
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
        case 'album_list':
            $username = $db->quote($_GET['username']);
            if (isset($_GET['albums_explore']) && $_GET['albums_explore'] != "NULL") {
                $rows = $db->prepare("SELECT albums.name as album, artists.name as artist
                FROM albums
                JOIN artists_albums ON(artists_albums.album_id = albums.id)
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
                                                        WHERE user_songs.username = $username);");
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

        case 'user_playlists':
            $username = $db->quote($_GET['username']);
            $rows = $db->prepare("SELECT pl_name FROM playlists
                                    WHERE playlists.user = $username;");
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
        case 'user_artists':
            $username = $db->quote($_GET['username']);
            $rows = $db->prepare("SELECT DISTINCT artists.name as name
                                    FROM songs
                                    JOIN songs_albums ON(songs.id = songs_albums.song_id)
                                    JOIN artists_albums ON(artists_albums.album_id = songs_albums.album_id)
                                    JOIN albums ON(albums.id = songs_albums.album_id)
                                    JOIN artists ON(artists.name = artists_albums.artist_name)
                                    WHERE songs.id IN (SELECT song_id 
                                                    FROM user_songs 
                                                    WHERE user_songs.username = $username);");
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
            $username = $db->quote($_GET['username']);
            $pl_name = $db->quote($_GET['new_pl_name']);
            $rows = $db->prepare("SELECT pl_name
                                    FROM playlists
                                    WHERE playlists.user = $username AND playlists.pl_name = $pl_name;");
            $rows->execute();
            $result = $rows->fetchAll();
            if ($rows->rowCount() > 0) {
                echo "ALREADY_EXIST";
            } else {
                echo "OK";
            }
            break;
        case 'insert_new_pl':
            $username = $db->quote($_GET['username']);
            $pl_name = $db->quote($_GET['pl_name']);
            try {
                $query = $db->prepare("INSERT INTO playlists (user, pl_name)
                                    VALUES ($username, $pl_name);");
                $query->execute();
                echo "ok";
            } catch (Exception $e) {
                echo "ERROR";
            }
            break;
        case 'songs_into_pl':
            $username = $db->quote($_GET['username']);
            $pl_name = $db->quote($_GET['pl_name']);
            $rows = $db->prepare("SELECT songs.name as name, artists.name as artist, albums.name as album, songs.length as length 
                                    FROM playlists
                                    JOIN playlists_songs ON(playlists.pl_name = playlists_songs.pl_name AND
                                                            playlists.user = playlists_songs.user)
                                    JOIN songs ON(playlists_songs.song_id = songs.id)
                                    JOIN songs_albums ON(songs_albums.song_id = songs.id)
                                    JOIN albums ON(songs_albums.album_id = albums.id)
                                    JOIN artists_albums ON(artists_albums.album_id = albums.id)
                                    JOIN artists ON(artists_albums.artist_name = artists.name)
                                    WHERE playlists.user = $username AND playlists.pl_name = $pl_name;");
            $count_query = $db->prepare("SELECT COUNT(*) as nsongs
                                                FROM playlists
                                                JOIN playlists_songs ON(playlists.pl_name = playlists_songs.pl_name AND
                                                                        playlists.user = playlists_songs.user)
                                                JOIN songs ON(playlists_songs.song_id = songs.id)
                                                JOIN songs_albums ON(songs_albums.song_id = songs.id)
                                                JOIN albums ON(songs_albums.album_id = albums.id)
                                                JOIN artists_albums ON(artists_albums.album_id = albums.id)
                                                JOIN artists ON(artists_albums.artist_name = artists.name)
                                                WHERE playlists.user = $username AND playlists.pl_name = $pl_name;");
            $count_query->execute();
            $rows->execute();
            $result = $rows->fetchAll();
            $nsongs = $count_query->fetchAll();
            echo  "{\n\"nsongs\":" . $nsongs[0]['nsongs'] . ",\n\"songs\":[\n";
            for ($i = 0; $i < $rows->rowCount(); $i++) {
                echo "{\"name\":\"" . $result[$i]['name'] . "\",
                            \n \"artist\":\"" . $result[$i]['artist'] . "\",
                            \n \"album\":\"" . $result[$i]['album'] . "\",
                            \n \"length\":\"" . $result[$i]['length'] . "\"

                    }";
                if ($i != $rows->rowCount() - 1) {
                    echo ",\n";
                }
            }
            echo "\n]\n}";
            break;
            break;
        case 'insert_song_into_pl':
            try {
                $username = $db->quote($_GET['username']);
                $songname = $db->quote($_GET['songname']);
                $pl_name = $db->quote($_GET['pl_name']);
                $query1 = $db->prepare("SELECT songs.id as id
                                FROM songs
                                WHERE songs.name = $songname");
                $query1->execute();
                $song_id_arr = $query1->fetchAll();
                $song_id = $song_id_arr[0]['id'];
                $query = $db->prepare("INSERT INTO playlists_songs (user, pl_name, song_id)
                                   VALUES ($username, $pl_name, $song_id);");
                $query->execute();
                echo 'ok';
            } catch (Exception $e) {
                echo 'ERROR' . $e->getMessage();
            }
            break;
        case 'album_songs':
            $username = $db->quote($_GET['username']);
            $album = $db->quote($_GET['album']);
            if (isset($_GET['album_explore']) && $_GET['album_explore'] != "NULL") {
                $rows = $db->prepare("SELECT S.name name, S.length as length
                                        FROM songs S JOIN songs_albums SA ON S.id = SA.song_id
                                        JOIN albums Al ON SA.album_id=Al.id
                                        JOIN artists_albums ArAl ON Al.id=ArAl.album_id
                                        JOIN artists Ar ON ArAl.artist_name=Ar.name
                                        WHERE Al.name = $album;");
            } else {
                $rows = $db->prepare("SELECT S.name name, S.length as length
                                        FROM songs S JOIN songs_albums SA ON S.id = SA.song_id
                                        JOIN albums Al ON SA.album_id=Al.id
                                        JOIN artists_albums ArAl ON Al.id=ArAl.album_id
                                        JOIN artists Ar ON ArAl.artist_name=Ar.name
                                        WHERE Al.name = $album AND S.id IN (SELECT song_id 
                                                        FROM user_songs 
                                                        WHERE user_songs.username = $username);");
            }
            $rows->execute();
            $result = $rows->fetchAll();
            echo  "{\n\"songs\":[\n";
            for ($i = 0; $i < $rows->rowCount(); $i++) {
                echo "{\"name\":\"" . $result[$i]['name'] . "\",
                    \n\"length\":\"" . $result[$i]['length'] . "\"
                    }";
                if ($i != $rows->rowCount() - 1) {
                    echo ",\n";
                }
            }
            echo "\n]\n}";
            break;
        case 'album_artist_per_user':
            $username = $db->quote($_GET['username']);
            $artist = $db->quote($_GET['artist']);
            $rows = $db->prepare("SELECT albums.name as album, albums.genre as genre, songs.name as songname
                                FROM songs
                                JOIN user_songs ON(user_songs.song_id = songs.id)
                                JOIN songs_albums ON(songs_albums.song_id = user_songs.song_id)
                                JOIN albums ON(albums.id = songs_albums.album_id)
                                JOIN artists_albums ON(albums.id = artists_albums.album_id)
                                WHERE user_songs.username = $username AND artists_albums.artist_name = $artist");
            $rows->execute();
            $result = $rows->fetchAll();
            $lastalb = $result[0]['album'];
            echo  "{\n\"albums\":[\n{\"albumname\":\"" . $result[0]['album'] . "\",\n
            \"genre\":\"" . $result[0]['genre'] . "\",\n
            \"songs\": [\n
            {\"songname\":\"" . $result[0]['songname'] . "\"}";
            for ($i = 1; $i < $rows->rowCount(); $i++) {
                if ($result[$i]['album'] == $lastalb) {
                    echo ",{\"songname\":\"" . $result[$i]['songname'] . "\"}";
                } else {
                    $lastalb = $result[$i]['album'];
                    echo "]},\n{\"albumname\":\"" . $result[$i]['album'] . "\",\n
                    \"genre\": \"" . $result[$i]['genre'] . "\",\n
                    \"songs\": [\n";
                    echo "{\"songname\":\"" . $result[$i]['songname'] . "\"}";
                }
            }
            echo "]}\n]\n}";
            break;
        case 'check_owned_song':
            $username = $db->quote($_GET['username']);
            $songname = $db->quote($_GET['songname']);
            $query = $db->prepare("SELECT * 
                                    FROM user_songs 
                                    WHERE username = $username AND user_songs.song_id = (SELECT songs.id
                                                        FROM songs
                                                        WHERE songs.name = $songname)");
            $query->execute();
            if ($query->rowCount() > 0) {
                echo 'ALREADY_EXIST';
            } else {
                echo 'OK';
            }
            break;
        case 'add_song_to_lib':
            $username = $db->quote($_GET['username']);
            $songname = $db->quote($_GET['songname']);
            try {
                $song_id_query = $db->prepare("SELECT songs.id FROM songs WHERE songs.name = $songname");
                $song_id_query->execute();
                $song_id_arr = $song_id_query->fetchAll();
                $song_id = $song_id_arr[0]['id'];
                $insert_query = $db->prepare("INSERT INTO user_songs (username, song_id, added) VALUES ($username, $song_id, CURRENT_TIMESTAMP);");
                $insert_query->execute();
                echo "OK";
            } catch (Exception $e) {
                echo "ERR" . $e->getMessage();
            }
            break;
        case 'add_album_to_library':
            $username = $db->quote($_GET['username']);
            $album = $db->quote($_GET['album']);
            $query = $db->prepare("SELECT S.id as id
                                        FROM songs S JOIN songs_albums SA ON S.id = SA.song_id
                                        JOIN albums Al ON SA.album_id=Al.id
                                        JOIN artists_albums ArAl ON Al.id=ArAl.album_id
                                        JOIN artists Ar ON ArAl.artist_name=Ar.name
                                        WHERE Al.name = $album;");
            $query->execute();
            $songs = $query->fetchAll();
            foreach ($songs as $val) {
                try {
                    $insert_query = $db->prepare("INSERT INTO user_songs (username, song_id, added) VALUES ($username, $val[id], CURRENT_TIMESTAMP);");
                    $insert_query->execute();
                } catch (Exception $e) {
                }
            }
            echo "ADDED";
            break;
        case 'check_owned_album':
            $username = $db->quote($_GET['username']);
            $album = $db->quote($_GET['album']);
            $query1 = $db->prepare("SELECT COUNT(S.id) as n
                                        FROM songs S JOIN songs_albums SA ON S.id = SA.song_id
                                        JOIN albums Al ON SA.album_id=Al.id
                                        JOIN artists_albums ArAl ON Al.id=ArAl.album_id
                                        JOIN artists Ar ON ArAl.artist_name=Ar.name
                                        WHERE Al.name = $album AND S.id IN (SELECT song_id 
                                                        FROM user_songs 
                                                        WHERE user_songs.username = $username);");
            $query1->execute();
            $user_songs_number = $query1->fetchAll();
            $query2 = $db->prepare("SELECT COUNT(S.name) as n
                                        FROM songs S JOIN songs_albums SA ON S.id = SA.song_id
                                        JOIN albums Al ON SA.album_id=Al.id
                                        JOIN artists_albums ArAl ON Al.id=ArAl.album_id
                                        JOIN artists Ar ON ArAl.artist_name=Ar.name
                                        WHERE Al.name = $album;");
            $query2->execute();
            $album_songs_number = $query2->fetchAll();
            if ($user_songs_number != $album_songs_number) {
                echo "ADD";
            } else {
                echo "ALREADY_EXIST";
            }
            break;
        case 'remove_from_library':

            break;
    }
} else {
    exit('invalid request');
}
