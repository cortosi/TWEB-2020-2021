var song = new Audio();
var queue = [];
var currentSong = 0;
var lastsong;
var valid_input = false;

$(".user_and_settings").click(function() {
    $(".user_settings_wrapp").toggle();
})

$(document).ready(function() {
    fillPlaylist();
});

$(document).click(function(e) {
    console.log(e.target);
    // console.log(e);
    if (!$(e.target).is(".queue_icon")) {
        $(".queue_list").removeClass("show_flex")
        $(".queue_list").empty();
    }
    if (!$(e.target).is(".song_opt_dots")) {
        $(".song_opt_main").hide();
    }
});

$(".songs_btn").click(function() {
    $(".content").empty();
    var $library_header = $('<div>', { 'class': 'library_header' }).appendTo(".content");
    $('<div>', { 'class': 'column_header_name', 'html': 'Name' }).appendTo($library_header);
    $('<div>', { 'class': 'column_header_artist', 'html': 'Artist' }).appendTo($library_header);
    $('<div>', { 'class': 'column_header_album', 'html': 'Album' }).appendTo($library_header);
    $('<div>', { 'class': 'column_header_time', 'html': 'Lenght' }).appendTo($library_header);
    $('<div>', { 'class': 'loaded' }).addClass("songs_layout").appendTo(".content");
    $.getJSON("./php/ajax_requests.php", "type=songs", function(json) {
        json.songs.forEach(function(item) {
            var $single_row_song = $('<div>', { 'class': 'row_song' });
            var $songname = $('<div>', {
                'class': 'row_song_songname',
                'prepend': $('<div>', {
                    'class': 'song_illustration',
                }).click(play_this).css({ "background": "url(\"./unify_media/" + item.artist + "/" + item.album + "/cover.jpg\") center/cover" }),
                'append': $('<div>', {
                    'class': 'songname',
                    'html': item.name,
                })
            })
            $('<div>', {
                'class': 'song_opt_dots',
                'html': $('<div>', {
                    'class': 'song_opt_main',
                    'html': $('<div>', {
                        'class': 'song_opt_item add_queue_item',
                        'html': 'Add to queue',
                        'append': $('<div>', {
                            'class': 'song_opt_item_icon add_queue_icon',
                        })
                    }).click(add_song_queue),
                    'append': $('<div>', {
                        'class': 'song_opt_item add_playlist_item',
                        'html': 'Add to playlist',
                        'append': $('<div>', {
                            'class': 'song_opt_playlist_main'
                        })
                    }).hover(show_playlist)
                })
            }).click(opt_menu).appendTo($songname);
            $songname.appendTo($single_row_song);
            $('<div>', { 'class': 'row_song_songartist', 'html': item.artist }).appendTo($single_row_song);
            $('<div>', { 'class': 'row_song_songalbum', 'html': item.album }).appendTo($single_row_song);
            $('<div>', { 'class': 'row_song_songtime', 'html': item.lenght }).appendTo($single_row_song);
            $single_row_song.appendTo(".loaded");
        });
    });
});

$(".artists_btn").click(function() {
    $(".content").empty();
});

$(".albums_btn").click(function() {
    $(".content").empty();
    var $wrapper = $('<div>', { 'class': 'loaded album_layout' }).appendTo(".content");
    $.getJSON("./php/ajax_requests.php", "type=album", function(json) {
        json.albums.forEach(function(item) {
            var $single_album_window = $('<div>', {
                'class': 'album',
                'prepend': $('<div>', {
                    'class': 'album_ill',
                    'html': $('<div>', {
                        'class': 'ill_hover',
                        'html': $('<div>', {
                            'class': 'ill_buttons',
                            'html': $('<div>', {
                                'class': 'ill_play_bttn',
                            }).click(function(e) {
                                e.stopPropagation();
                                play_album($(this).parents(".album_ill").next().children(".album_det_name").text(),
                                    $(this).parents(".album_ill").next().children(".album_det_artist_name").text());
                            })
                        })
                    }).click(show_album)
                }).css({ "background": "url(\"./unify_media/" + item.artist + "/" + item.album + "/cover.jpg\") center/cover" }),
                'append': $('<div>', {
                    'class': 'album_det',
                    'html': $('<p>', {
                        'class': 'album_det_name',
                        'html': item.album
                    }),
                    'append': $('<p>', {
                        'class': 'album_det_artist_name',
                        'html': item.artist
                    })
                })
            }).appendTo($wrapper);
        });
    });
    $wrapper.appendTo(".loaded");
});

$(".recently_btn").click(function() {
    $(".content").empty();
});

$(".queue_icon").click(function() {
    $list = $(".queue_list").empty().toggleClass("show_flex");
    if (queue.length > 0) {
        $list.removeClass('no_queued_items');
        for ($i = 0; $i < queue.length; $i++) {
            $list.append($('<div>', {
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
        $list.append($('<div>', {
            'class': 'queue_reset_btn',
            'html': 'Reset Queue'
        }).click(reset_queue));
    } else {
        $list.append($('<div>', {
            'html': "There are no songs in the queue."
        }));
    }
});

function reset_queue() {
    $(".queue_list").addClass("no_queued_items");
    queue = [];
    currentSong = 0;
}


function opt_menu() {
    $(this).children(1).show();
};

function add_song_queue() {
    $songname = $(this).parents(".row_song_songname").children(".songname").text();
    $songartist = $(this).parents(".row_song_songname").nextAll(".row_song_songartist").text();
    $songalbum = $(this).parents(".row_song_songname").nextAll(".row_song_songalbum").text();
    queue.push({
        'name': $songname,
        'artist': $songartist,
        'album': $songalbum
    });
    currentSong++;
};

// ALBUM

function show_album() {
    $('.content').empty();
    $alb_name = $(this).parents('.album').children('.album_det').children(".album_det_name").text();
    $art_name = $(this).parents('.album').children('.album_det').children(".album_det_artist_name").text();
    $loaded = $('<div>', { 'class': 'loaded single_album_layout' });
    $('<div>', {
        'class': 'single_album_ill_wrapp',
        'html': $('<div>', {
            'class': 'single_album_ill'
        }).css({ "background": "url(\"./unify_media/" + $art_name + "/" + $alb_name + "/cover.jpg\") center/cover" })
    }).appendTo($loaded);
    $w1 = $('<div>', {
        'class': 'single_album_det_wrapp',
        'html': $('<div>', {
            'class': 'single_album_det',
            'html': $('<div>', {
                'class': 'single_album_artist',
                'html': $art_name
            }),
            'prepend': $('<div>', {
                'class': 'single_album_name',
                'html': $alb_name
            }),
            'append': $('<div>', {
                'class': 'single_album_genre',
                'html': "pop"
            })
        })
    }).appendTo($loaded);
    $('<div>', { 'class': 'single_album_play_btn', 'html': 'Play' })
        .click(function() {
            play_album($('.single_album_name').text(), $('.single_album_artist').text());
        })
        .appendTo($w1.children(".single_album_det"));
    var $wrapper = $('<div>', { 'class': 'single_album_songs songs_layout' });
    $.getJSON("./php/ajax_requests.php", "type=album_songs&name=" + $alb_name,
        function(json, textStatus, jqXHR) {
            json.songs.forEach(function(item) {
                var $single_row_song = $('<div>', {
                    'class': 'row_song',
                    'append': $('<div>', {
                        'class': 'row_song_songname',
                        'append': $('<div>', {
                            'class': 'songname',
                            'html': item.name,
                        })
                    })
                });
                $('<div>', { 'class': 'row_song_songartist', 'html': $art_name }).appendTo($single_row_song);
                $('<div>', { 'class': 'row_song_songalbum', 'html': item.album }).appendTo($single_row_song);
                $('<div>', { 'class': 'row_song_songtime', 'html': item.lenght }).appendTo($single_row_song);
                $single_row_song.appendTo($wrapper);
            });
        }
    );
    $wrapper.appendTo($w1);
    $loaded.appendTo(".content");
}

function play_album($songalbum, $songartist) {
    play_pause();
    reset_queue();
    $.getJSON("./php/ajax_requests.php", "type=album_songs&name=" + $songalbum,
        function(json, textStatus, jqXHR) {
            json.songs.forEach(function(item) {
                queue.push({
                    'name': item.name,
                    'artist': $songartist,
                    'album': $songalbum
                });
            });
            play_next();
        }
    );
}

// Playlists

function fillPlaylist() {
    $wrapper = $('.playlists_list').empty();
    $.ajax({
        type: "GET",
        url: "./php/ajax_requests.php",
        data: "type=playlist",
        dataType: "json",
        success: function(json) {
            json.playlists.forEach(function(item) {
                $('<div>', {
                    'class': 'section_item playlist_item',
                    'prepend': $('<span>', {
                        'class': 'section_icon playlist_icon',
                    }),
                    'append': $('<div>', {
                        'class': 'playlist_item_name',
                        'html': item.name
                    }).click(show_this_pl)
                }).appendTo($wrapper);
            });
        }
    });
};

function show_playlist() {
    $list = $(this).children(1);
    $list.empty().append($('<div>', {
        'class': 'song_opt_item new_pl',
        'html': 'Create New',
        'append': $('<div>', {
            'class': 'song_opt_playlist_create_icon'
        })
    }).click(create_playlist));
    $.getJSON("./php/ajax_requests.php", "type=playlist", function(json) {
        json.playlists.forEach(function(item) {
            $list.append($('<div>', {
                'class': 'song_opt_item alrd_ex_pls',
                'html': item.name
            }).click(add_to_playlist));
        });
    });
};

function playlist_check() {
    $(".add_playlist_check_wrapp").addClass("playlist_add_checked");
    setTimeout(function() {
        $(".add_playlist_check_wrapp").removeClass("playlist_add_checked");
    }, 2000);
};

function add_to_playlist() {
    $.get("./php/ajax_requests.php", "type=insert_into_pl&pl_name=" + $(this).text() +
        "&name=" + $(this).parents(".row_song_songname ").children(".songname ").text(),
        function(data, textStatus, jqXHR) {
            if (data == "ok") {

            } else {

            }
        },
        "text"
    )
};

function create_playlist() {
    $('.create_playlist_wrapp').fadeIn().css("display", "flex");
};

$(".create_playlist_wrapp").click(function(e) {
    if (!($(e.target).is(".create_playlist_wrapp"))) {

    } else {
        $(this).fadeOut();
    }
});

function check_valid_pl_name(sync_val) {
    $.ajax({
        asyn: sync_val,
        type: "GET",
        url: "./php/ajax_requests.php",
        data: 'type=check_pl_exist&new_pl_text=' + $('#pl_input').val(),
        dataType: "json",
        success: function(json) {
            if (json.playlists.length == 0) {
                $('.error_input_wrapp').removeClass('visible');
                $('.create_playlist_input').removeClass("wrong_input");
                valid_input = true;
            } else {
                $('.create_playlist_input').addClass("wrong_input");
                $('.error_input_wrapp').addClass('visible');
                valid_input = false;
            }
        }
    });
}

$('.create_playlist_input').keyup(function() {
    check_valid_pl_name(true);
});

$('.create_playlist_submit').click(function() {
    check_valid_pl_name(false);
    if (valid_input) {
        $.ajax({
            type: "GET",
            url: "./php/ajax_requests.php",
            data: 'type=new_pl&name=' + $('#pl_input').val(),
            dataType: "text",
            success: function(response) {
                if (response === "ok") {
                    $('.create_playlist_wrapp').fadeOut();
                    fillPlaylist();
                    setTimeout(function() {
                        playlist_check();
                    }, 1000);
                } else {
                    $('.create_playlist_input').addClass("wrong_input");
                    $('.error_input_wrapp').addClass('visible');
                }
            }
        });
    }
})

function show_this_pl() {
    $(".content").empty();
    $pl_content = $('<div>', { 'class': 'playlist_content songs_layout' });
    $('<div>', {
        'class': 'loaded playlist_layout',
        'html': $('<div>', {
            'class': 'playlist_head_wrapp',
            'html': $('<div>', {
                'class': 'playlist_head',
                'html': $('<div>', {
                    'class': 'pl_img no_artwork'
                }),
                'append': $('<div>', {
                    'class': 'pl_infos',
                    'html': $('<div>', {
                        'class': 'pl_name',
                        'html': $(this).text()
                    }),
                    'append': $('<div>', {
                        'class': 'other_pl_infos',
                        'html': $('<div>', {
                            'class': 'n_songs_pl',
                            'html': '22'
                        }),
                        'append': $('<div>', {
                            'class': 'tot_time_pl',
                            'html': '22'
                        })
                    })
                })
            })
        })
    }).appendTo('.content').append($pl_content);
    $pl_name = $(this).text();
    $.getJSON("./php/ajax_requests.php", "type=songs_into_pl&pl_name=" + $pl_name,
        function(json, textStatus, jqXHR) {
            json.songs.forEach(function(item) {
                var $single_row_song = $('<div>', { 'class': 'row_song' });
                $('<div>', {
                    'class': 'row_song_songname',
                    'prepend': $('<div>', {
                        'class': 'song_illustration',
                    }).click(play_this).css({ "background": "url(\"./unify_media/" + item.artist + "/" + item.album + "/cover.jpg\") center/cover" }),
                    'append': $('<div>', {
                        'class': 'songname',
                        'html': item.name,
                    })
                }).appendTo($single_row_song);
                $('<div>', { 'class': 'row_song_songartist', 'html': item.artist }).appendTo($single_row_song);
                $('<div>', { 'class': 'row_song_songalbum', 'html': item.album }).appendTo($single_row_song);
                $('<div>', { 'class': 'row_song_songtime', 'html': item.lenght }).appendTo($single_row_song);
                $single_row_song.appendTo($pl_content);
            });
        }
    );

}

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
        } else if (queue.length != 0) {
            play_next();
        }
    } else {
        song.pause();
        $(".playback_play_btn").removeClass("song_played");
    }
}

$(".volume_slider").change(function() {
    song.volume = parseFloat(this.value / 100);
});

$(".playback_next_btn").click(play_next);

function play_next() {
    song.pause();
    if (queue.length > 0) {
        song.src = "./unify_media/" + queue[0].artist +
            "/" + queue[0].album + "/" + queue[0].name + ".mp3";
        $(".actual_song_name").text(queue[0].name);
        $(".actual_artist_album").text(queue[0].artist + " -- " + queue[0].album);
        $(".miniplayer_img").removeClass("no_artwork").css({
            "background": "url('./unify_media/" + queue[0].artist +
                "/" + queue[0].album + "/cover.jpg') center/cover"
        });
        queue.shift();
        play_pause();
    }
}