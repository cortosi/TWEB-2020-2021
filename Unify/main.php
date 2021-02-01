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
                        <div class="section_item explore">
                            <span class="section_icon"></span>
                            <span class="explore_btn">Explore</span>
                        </div>
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
                <div class="explore_albums">
                    <div class="explore_section_head">
                        <p class="expolore_title">Albums</p>
                        <p class="explore_section_see_more">See More</p>
                    </div>
                    <div class="explore_albums_albums">
                        <div class="explore_albums_item">
                            <div class="explore_albums_ill" style="background: url(&quot;./unify_media/Coldplay/A Head Full Of Dreams/cover.jpg&quot;) center center / cover;">
                                <div class="explore_albums_ill_hover">
                                    <div class="explore_albums_ill_buttons">
                                        <div class="explore_ill_play_bttn"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="album_det">
                                <p class="album_det_name">A Head Full Of Dreams</p>
                                <p class="album_det_artist_name">Coldplay</p>
                            </div>
                        </div>
                        <div class="explore_albums_item">
                            <div class="explore_albums_ill" style="background: url(&quot;./unify_media/Linkin Park/Living Things/cover.jpg&quot;) center center / cover;">
                                <div class="explore_albums_ill_hover">
                                    <div class="explore_albums_ill_buttons">
                                        <div class="explore_ill_play_bttn"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="album_det">
                                <p class="album_det_name">Living Things</p>
                                <p class="album_det_artist_name">Linkin Park</p>
                            </div>
                        </div>
                        <div class="explore_albums_item">
                            <div class="explore_albums_ill" style="background: url(&quot;./unify_media/Avicii/The Days _Nights (EP)/cover.jpg&quot;) center center / cover;">
                                <div class="explore_albums_ill_hover">
                                    <div class="explore_albums_ill_buttons">
                                        <div class="explore_ill_play_bttn"></div>
                                        <div class="explore_ill_add_bttn"></div>
                        
                                    </div>
                                </div>
                            </div>
                            <div class="album_det">
                                <p class="album_det_name">The Days _Nights (EP)</p>
                                <p class="album_det_artist_name">Avicii</p>
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