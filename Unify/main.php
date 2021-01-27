<?php
session_start();
if (isset($_SESSION['username'])) {
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./Style/main.css">
        <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
        <title>Document</title>
    </head>

    <body>
        <div class="main">
            <div class="side_menu">
                <div class="side_head">
                    <div class="logo"></div>
                    <span class="comp_name">Unify</span>
                </div>
                <div class="side_search">
                    <div class="search_wrapp">
                        <span class="search_icon"></span>
                        <input class="search_input" type="search" name="" id="" placeholder="Search">
                    </div>
                </div>
                <div class="side_section library">
                    <span class="section_name">Library</span>
                    <div class="section_list library_list">
                        <div class="section_item recently">
                            <span class="section_icon"></span>
                            <span class="recently_btn">Recently Added</span>
                        </div>
                        <div class="section_item artists">
                            <span class="section_icon"></span>
                            <span class="artists_btn">Artists</span>
                        </div>
                        <div class="section_item albums">
                            <span class="section_icon"></span>
                            <span class="albums_btn">Albums</span>
                        </div>
                        <div class="section_item songs">
                            <span class="section_icon"></span>
                            <span class="songs_btn">Songs</span>
                        </div>
                    </div>
                </div>
                <div class="side_section playlists">
                    <span class="section_name">Playlists</span>
                    <div class="section_list playlists_list">
                    </div>
                </div>
            </div>
            <div class="phone_head">
                <p>Library</p>
            </div>
            <div class="media">
                <div class="playback_controls_wrapp">
                    <div class="playback_controls">
                        <span class="playback_shuffle_btn"></span>
                        <span class="playback_back_arrow_btn"></span>
                        <span class="playback_play_btn"></span>
                        <span class="playback_next_btn"></span>
                        <span class="playback_repeat_btn"></span>
                    </div>
                </div>
                <div class="playback_wrapp">
                    <div class="playback">
                        <div class="miniplayer_img no_artwork">
                        </div>
                        <div class="actual_song_descriptor no_song">
                            <div class="actual_song_infos">
                                <div class="descriptor_logo"></div>
                                <p class="actual_song_name"></p>
                                <p class="actual_artist_album"></p>
                            </div>
                            <div class="actual_song_bar no_song"></div>
                        </div>
                    </div>
                </div>
                <div class="controls_wrapp">
                    <div class="controls">
                        <div class="queue_icon_wrapp">
                            <div class="queue_icon"></div>
                            <div class="queue_list no_queued_items">
                                <!-- <div class="queue_item">
                                <div class="queue_item_ill"></div>
                                <div class="queue_item_name">xefwxfxe</div>
                            </div> -->
                            </div>
                        </div>
                        <div class="volume_control_wrapp">
                            <span class="volume_icon"></span>
                            <input class="volume_slider" type="range" name="" id="">
                        </div>
                        <div class="user_and_settings">
                            <div class="user_settings_wrapp">
                                <div class="user_settings_username">
                                    <?php echo $_SESSION['username'] ?>
                                </div>
                                <form action="./php/logout.php">
                                    <input type="submit" class="logout_btn" value="Logout">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="loaded artists_layout">
                    <div class="artists_side">
                        <div class="artist_row">
                            <div class="artist_icon"></div>
                            <div class="artist_artist_name">
                                Coldplay
                            </div>
                        </div>
                    </div>
                    <div class="artist_content">
                        <div class="artist_album_row">
                            <div class="artist_album_ill"></div>
                            <div class="artist_album_det">
                                <div class="single_album_det">
                                    <div class="single_album_name">Living Things</div>
                                    <div class="single_album_genre">Pop ~ 2011</div>
                                    <div class="single_album_play_btn">Play</div>
                                </div>
                                <div class="artist_album_songs songs_layout">
                                    <div class="row_song">
                                        <div class="row_song_songname">
                                            <div class="songname">A Head Full Of Dreams</div>
                                        </div>
                                        <div class="row_song_songartist">Coldplay</div>
                                        <div class="row_song_songtime">00:03:43</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="create_playlist_wrapp">
                <div class="create_playlist">
                    <div class="create_playlist_head">
                        <p>New Plalylist</p>
                    </div>
                    <div class="create_playlist_input_wrapp">
                        <input id='pl_input' class="create_playlist_input" type="text" value="New Playlist" autocomplete="off">
                    </div>
                    <div class="create_playlist_submit_wrapp">
                        <div class="create_playlist_submit">
                            Create
                        </div>
                    </div>
                </div>
                <div class=error_input_wrapp>
                    Playlist Already Exist
                </div>
            </div>
            <div class="add_playlist_check_wrapp">
                <div class="add_playlist_check">
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="./Js/main.js"></script>

    </html>
<?php
} else {
    header("Location: ./index.html");
}
?>