var song = new Audio();
var queue = [];
var currentSong = 0;
var lastsong;

function playlist_check() {
    $(".add_playlist_check_wrapp").addClass("playlist_add_checked");
    setTimeout(function() {
        $(".add_playlist_check_wrapp").removeClass("playlist_add_checked");
    }, 2000);
};

$(document).ready(function() {
    $(".queue_list").hide();
});

$(document).click(function(e) {
    // console.log(e.target);
    if (!$(e.target).is(".queue_icon")) {
        $(".queue_list").hide();
        $(".queue_list").empty();
    }
    if (!$(e.target).is(".song_opt")) {
        $(".song_opt_menu").hide();
    }
});

$(".songs_btn").click(function() {
    $(".content").empty();
    var $wrapper = $('<div>', { 'class': 'library_header' });
    $('<div>', {
        'class': 'column_header_name',
        'html': 'Name',
    }).appendTo($wrapper);
    $('<div>', {
        'class': 'column_header_artist',
        'html': 'Artist',
    }).appendTo($wrapper);
    $('<div>', {
        'class': 'column_header_album',
        'html': 'Album',
    }).appendTo($wrapper);
    $('<div>', {
        'class': 'column_header_time',
        'html': 'Lenght',
    }).appendTo($wrapper);
    $wrapper.appendTo(".content");
    $('<div>', {
        'class': 'loaded',
    }).appendTo(".content").addClass("songs_layout");
    $.getJSON("./php/ajax_requests.php", "type=songs", function(json) {
        json.songs.forEach(function(item) {
            var $wrapper = $('<div>', { 'class': 'row_song' });
            var $songname = $('<div>', {
                'class': 'row_song_songname',
                'prepend': $('<div>', {
                    'class': 'song_illustration',
                }).click(play_this).css({ "background": "url(\"./unify_media/" + item.artist + "/" + item.album + "/cover.jpg\") center/cover" }),
            })
            $('<div>', {
                'class': 'songname',
                'html': item.name,
            }).appendTo($songname);
            $('<div>', {
                'class': 'song_opt',
                'html': $('<div>', {
                    'class': 'song_opt_menu',
                    'html': $('<div>', {
                        'class': 'song_opt_menu_item add_queue_item',
                        'html': 'Add to queue',
                        'append': $('<div>', {
                            'class': 'song_opt_menu_item_icon add_queue_icon',
                        })
                    }).click(add_queue),
                    'append': $('<div>', {
                        'class': 'song_opt_menu_item add_playlist_item',
                        'html': 'Add to playlist',
                        'append': $('<div>', {
                            'class': 'song_opt_menu_playlist_wrapp'
                        }).click(playlist_check)
                    }).hover(show_playlist)
                })
            }).click(opt_menu).appendTo($songname);
            $songname.appendTo($wrapper);
            $('<div>', {
                'class': 'row_song_songartist',
                'html': item.artist,
            }).appendTo($wrapper);
            $('<div>', {
                'class': 'row_song_songalbum',
                'html': item.album,
            }).appendTo($wrapper);
            $('<div>', {
                'class': 'row_song_songtime',
                'html': item.lenght,
            }).appendTo($wrapper);
            $wrapper.appendTo(".loaded");
        });
    });
});

$(".artists_btn").click(function() {
    $(".content").empty();
});

$(".albums_btn").click(function() {
    $(".content").empty();
    var $wrapper = $('<div>', {
        'class': 'loaded album_layout',
    }).appendTo(".content");
    $.getJSON("./php/ajax_requests.php", "type=album", function(json) {
        json.albums.forEach(function(item) {
            var $album = $('<div>', {
                'class': 'album',
                'prepend': $('<div>', {
                    'class': 'album_ill',
                    'html': $('<div>', {
                        'class': 'ill_hover',
                        'html': $('<div>', {
                            'class': 'ill_buttons',
                            'html': $('<div>', {
                                'class': 'ill_play_bttn',
                            })
                        })
                    })
                }).css({ "background": "url(\"./unify_media/" + item.artist + "/" + item.album + "/cover.jpg\") center/cover" }),
                'append': $('<div>', {
                    'class': 'album_det',
                    'html': $('<p>', {
                        'html': item.album,
                    }),
                }).append($('<p>', {
                    'html': item.artist,
                }))
            }).appendTo($wrapper);
        });
    });
    $wrapper.appendTo(".loaded");
});

$(".recently_btn").click(function() {
    $(".content").empty();
});

$(".queue_wrapp").click(function() {
    $wrapper = $(".queue_list").empty().toggle();
    if (queue.length > 0) {
        $wrapper.removeClass('no_queue_list');
        for ($i = 0; $i < queue.length; $i++) {
            $wrapper.append($('<div>', {
                'class': 'queue_item',
                'html': $('<div>', {
                    'class': 'queue_item_ill',
                }).css({ "background": "url(\"./unify_media/" + queue[$i].artist + "/" + queue[$i].album + "/cover.jpg\") center/cover" }),
                'append': $('<div>', {
                    'class': 'queue_item_name',
                    'html': queue[$i].name + " -- " + queue[$i].artist
                })
            }))
        }
        $wrapper.append($('<div>', {
            'class': 'queue_reset_btn',
            'html': 'Reset Queue'
        }))
    } else {
        $wrapper.append($('<div>', {
            'html': "There are no songs in the queue."
        }));
    }
});



function opt_menu() {
    $(this).children(1).show();
};

function show_playlist() {
    $list = $(this).children(1);
    $list.empty().append($('<div>', {
        'class': 'song_opt_menu_playlist_wrapp_item',
        'html': 'Create New',
        'append': $('<div>', {
            'class': '.song_opt_menu_playlist_wrapp_item_icon'
        }).addClass("song_opt_menu_playlist_wrapp_item_icon").click(create_playlist)
    })).click(create_playlist);
    $.getJSON("./php/ajax_requests.php", "type=playlist", function(json) {
        json.playlists.forEach(function(item) {
            $list.append($('<div>', {
                'class': 'song_opt_menu_playlist_wrapp_item',
                'html': item.name
            })).click(add_to_playlist);
        });
    });
};

function add_to_playlist() {

};

function create_playlist() {

};

function add_queue() {
    $songname = $(this).parents(".row_song_songname").children(".songname").text();
    $songartist = $(this).parents(".row_song_songname").nextAll(".row_song_songartist").text();
    $songalbum = $(this).parents(".row_song_songname").nextAll(".row_song_songalbum").text();
    queue.push({
        'name': $songname,
        'artist': $songartist,
        'album': $songalbum
    });
    console.log(queue);
}


//PLAYBACK HANDLING

$(".playback_play_btn").click(play_pause);

function play_this() {
    $newsrc = "./unify_media/" + $(this).parent().nextAll(".row_song_songartist").text() +
        "/" + $(this).parent().nextAll(".row_song_songalbum").text() + "/" + $(this).nextAll(".songname").text() + ".mp3";
    if (lastsong != $newsrc) {
        if (check_remotely_exist($newsrc)) {
            lastsong = $newsrc;
            song.src = $newsrc;
            song.play();
            $(".actual_song_name").text($(this).nextAll(".songname").text());
            $(".actual_artist_album").text($(this).parent().nextAll(".row_song_songartist").text() + " -- " + $(this).nextAll(".row_song_songalbum").text());
            $(".miniplayer_img").removeClass("no_artwork").css({
                "background": "url('./unify_media/" + $(this).parent().nextAll(".row_song_songartist").text() +
                    "/" + $(this).parent().nextAll(".row_song_songalbum").text() + "/cover.jpg') center/cover"
            });
            $(".playback_play_btn").addClass("song_played");
        } else {}
    } else {
        song.currentTime = 0;
    }
};

function play_pause() {
    if (song.paused) {
        if (!$(".miniplayer_img").hasClass("no_artwork")) {
            song.play();
            $(".playback_play_btn").addClass("song_played");
        }
    } else {
        song.pause();
        $(".playback_play_btn").removeClass("song_played");
    }
}

$(".volume_slider").change(function() {
    song.volume = parseFloat(this.value / 100);
});

function check_remotely_exist(url) {
    $flag = 0;
    $.ajax({
        async: false,
        type: "HEAD",
        url: url,
        success: function(response) {
            $flag = 1;
        }
    });
    if ($flag == 1) {
        return true;
    } else {
        return false;
    }
}

$(".playback_next_btn").click(function() {
    play_pause;
    if (queue.lenght != currentSong) {
        currentSong++;
        song.src = queue[currentSong];
        play_pause;
    }
});