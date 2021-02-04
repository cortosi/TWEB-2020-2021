//Global Variables
var song = new Audio();
var queue = [];
var previous = [];
var lastsong;
var valid_input = false;
var errno;
var username = $.trim($('.user_settings_username').text());
shuffle = false;
repeat = false;
repeat_src = " ";

$(".user_and_settings").click(function() {
    $(".user_settings_wrapp").toggle();
})

//Document Ready
$(document).ready(function() {
    fill_side_playlists();
    show_song_list();
});

//Document Listeners
$(document).click(function(e) {
    // console.log(e);
    if (!$(e.target).is(".queue_icon")) {
        $(".queue_list").removeClass("show_flex")
        $(".queue_list").empty();
    }
    if (!$(e.target).is(".song_opt_dots")) {
        $(".song_opt_main").hide();
    }
});


//LISTENERS
$(".explore_btn").click(show_explore);

$(".songs_btn").click(function() {
    show_song_list();
});

$(".albums_btn").click(function() {
    show_album_list();
});

$(".artists_btn").click(show_user_artists);

$(".queue_icon").click(show_queued_songs);

$('.create_playlist_submit').click(create_new_playlist);

$(".playback_play_btn").click(play_pause);

$(".volume_slider").change(change_volume);

$(".playback_next_btn").click(play_next);

$(".recently_btn").click(show_user_recent);

$(".create_playlist_wrapp").click(function(e) {
    if ($(e.target).is(".create_playlist_wrapp"))
        $(this).fadeOut();
});

$('.create_playlist_input').keyup(function() {
    check_valid_pl_name()
        .done(function(data) {
            if (data == "OK") {
                $('.error_input_wrapp').removeClass('visible');
                $('.create_playlist_input').removeClass("wrong_input");
            } else {
                $('.create_playlist_input').addClass("wrong_input");
                $('.error_input_wrapp').addClass('visible');
            }
        })
});


//LISTENER FUNCTIONS
function show_explore() {
    $('.content').empty();
    $loaded = $('<div>', { 'class': 'loaded explore_layout' }).appendTo('.content');
    //BUILDING ALBUMS EXPLORE SECTION
    $explore_album_wrapp = $('<div>', { 'class': 'explore_albums' }).appendTo($loaded);
    $explore_album_head = $('<div>', {
        'class': 'explore_section_head',
        'prepend': $('<p>', {
            'class': 'expolore_title',
            'html': 'Albums'
        }),
        'append': $('<p>', {
            'class': 'explore_section_see_more',
            'html': 'See More'
        }).click(function() {
            show_album_list("SET");
        })
    }).appendTo($explore_album_wrapp);
    $wrapper = $('<div>', { 'class': 'explore_albums_albums' }).appendTo($explore_album_wrapp);
    $.when($.getJSON("./php/ajax_requests.php", "username=" + username + "&type=explore_album",
        function(json) {
            json.albums.forEach(function(item) {
                $single_album = $('<div>', {
                    'class': 'explore_albums_item',
                    'append': $single_album_ill = $('<div>', {
                        'class': 'explore_albums_ill',
                        'append': $single_album_ill_hover = $('<div>', {
                            'class': 'explore_albums_ill_hover',
                            'append': $single_album_ill_buttons = $('<div>', {
                                'class': 'explore_albums_ill_buttons',
                                'append': $play_btn = $('<div>', {
                                    'class': 'explore_ill_play_bttn'
                                }).click(function(e) {
                                    e.stopPropagation();
                                    play_album(item.album, item.artist, "SET");
                                })
                            })
                        }).click(function() {
                            show_this_album(item.album, item.artist, "SET");
                        })
                    }).css({ "background": "url(\"./unify_media/" + item.artist + "/" + item.album + "/cover.jpg\") center/cover" })
                }).appendTo($wrapper);
                $album_det = $('<div>', {
                    'class': 'album_det',
                    'html': $('<div>', {
                        'class': 'album_det_name',
                        'html': item.album
                    }),
                    'append': $('<div>', {
                        'class': 'album_det_artist_name',
                        'html': item.artist
                    })
                }).appendTo($single_album);
                if (album_already_owned(item.album) == "ADD") {
                    $('<div>', { 'class': 'explore_ill_add_bttn' }).click(function(e) {
                        e.stopPropagation();
                        add_album_to_library(item.album, this);
                    }).appendTo($single_album_ill_buttons);
                }
            })
        }
    )).then(function() {
        //BUILDING SONGS EXPLORE SECTION
        $explore_songs_wrapp = $('<div>', { 'class': 'explore_songs' }).appendTo($loaded);
        $explore_songs_head = $('<div>', {
            'class': 'explore_section_head',
            'prepend': $('<p>', {
                'class': 'expolore_title',
                'html': 'Songs'
            }),
            'append': $('<p>', {
                'class': 'explore_section_see_more',
                'html': 'See More'
            }).click(function() {
                show_song_list("SET");
            })
        }).appendTo($explore_songs_wrapp);
        $wrapper = $('<div>', { 'class': 'explore_songs_songs' }).appendTo($explore_songs_wrapp);
        $.getJSON("./php/ajax_requests.php", "username=" + username + "&type=explore_songs",
            function(json) {
                json.songs.forEach(function(item) {
                    var $single_song = $('<div>', {
                        'class': 'row_song_songname',
                        'html': $ill = $('<div>', {
                            'class': 'song_illustration',
                            'prepend': $('<div>', {
                                'class': 'song_illustration',
                            }).click(function() {
                                play_this(item.name, item.artist, item.album);
                            }).css({ "background": "url(\"./unify_media/" + item.artist + "/" + item.album + "/cover.jpg\") center/cover" })
                        })
                    }).appendTo($wrapper);
                    $songname = $('<div>', {
                        'class': 'songname',
                        'html': item.name,
                    }).appendTo($single_song)
                    if (song_already_owned(item.name) != "OK") {
                        $song_add_icon = $('<div>', {
                            'class': 'song_owned_icon'
                        }).appendTo($single_song);
                    } else {
                        $song_add_icon = $('<div>', {
                            'class': 'song_add_icon',
                        }).click(function() {
                            add_song_to_library(item.name, this);
                        }).appendTo($single_song);
                    }
                });
            }
        )
    })
}

function show_song_list($all = "NULL") {
    $(".content").empty();
    $library_header = $('<div>', { 'class': 'library_header' });
    $('<div>', { 'class': 'column_header_name', 'html': 'Name' }).appendTo($library_header);
    $('<div>', { 'class': 'column_header_artist', 'html': 'Artist' }).appendTo($library_header);
    $('<div>', { 'class': 'column_header_album', 'html': 'Album' }).appendTo($library_header);
    $('<div>', { 'class': 'column_header_time', 'html': 'Lenght' }).appendTo($library_header);
    $.getJSON("./php/ajax_requests.php", "type=song_list&username=" + username + "&song_explore=" + $all, function(json) {
        if (json.songs.length > 0) {
            $library_header.appendTo(".content");
            $('<div>', { 'class': 'loaded' }).addClass("songs_layout").appendTo(".content");
            json.songs.forEach(function(item) {
                var $single_row_song = $('<div>', { 'class': 'row_song' }).appendTo(".loaded");;
                var $songname = $('<div>', {
                    'class': 'row_song_songname',
                    'prepend': $('<div>', {
                        'class': 'song_illustration',
                    }).click(function() {
                        play_this(item.name, item.artist, item.album);
                    }).css({ "background": "url(\"./unify_media/" + item.artist + "/" + item.album + "/cover.jpg\") center/cover" }),
                    'append': $('<div>', {
                        'class': 'songname',
                        'html': item.name,
                    })
                }).appendTo($single_row_song);
                if ($all == "NULL") {
                    $song_dots = $('<div>', {
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
                            'prepend': $('<div>', {
                                'class': 'song_opt_item add_queue_item',
                                'html': 'Remove from library',
                                'append': $('<div>', {
                                    'class': 'song_opt_item_icon',
                                })
                            }).click(function() {
                                remove_this_from_library(item.name);
                            }),
                            'append': $('<div>', {
                                'class': 'song_opt_item add_playlist_item',
                                'html': 'Add to playlist',
                                'append': $('<div>', {
                                    'class': 'song_opt_playlist_main'
                                })
                            }).hover(show_playlist_menu)
                        })
                    }).click(opt_menu).appendTo($songname);
                }
                $('<div>', { 'class': 'row_song_songartist', 'html': item.artist }).appendTo($single_row_song);
                $('<div>', { 'class': 'row_song_songalbum', 'html': item.album }).appendTo($single_row_song);
                $('<div>', { 'class': 'row_song_songtime', 'html': item.length }).appendTo($single_row_song);
                if ($all != "NULL") {
                    if (song_already_owned(item.name) != "OK") {
                        $('<div>', {
                            'class': 'row_song_songicon',
                            'html': $('<div>', {
                                'class': 'song_owned_icon'
                            })
                        }).appendTo($single_row_song);
                    } else {
                        $('<div>', {
                            'class': 'row_song_songicon',
                            'html': $('<div>', {
                                'class': 'song_add_icon',
                            }).click(function(e) {
                                e.stopPropagation();
                                add_song_to_library(item.name, this);
                            })
                        }).appendTo($single_row_song);
                    }
                }
            });
        } else {
            show_empty_section();
        }
    });
}

function show_empty_section() {
    var $wrapper = $('<div>', { 'class': 'loaded empty_section' }).appendTo(".content");
    $wrapper.append($('<div>', {
        'class': 'empty_section_message',
        'html': $('<div>', {
            'class': 'empty_section_text',
            'html': 'There is no songs in your library, explore to add songs'
        }),
        'append': $('<div>', {
            'class': 'empty_section_explore_btn',
            'html': 'Explore'
        }).click(show_explore),
    }))
}

function show_user_artists() {
    $(".content").empty();
    $.getJSON("./php/ajax_requests.php", "type=user_artists&username=" + username,
        function(json) {
            if (json.artists.length > 0) {
                var $wrapper = $('<div>', { 'class': 'loaded artists_layout' }).appendTo(".content");
                var $side = $('<div>', { 'class': 'artists_side' }).appendTo($wrapper);
                var $artist_content = $('<div>', { 'class': 'artist_content' }).appendTo($wrapper);
                json.artists.forEach(function(item) {
                    $single_art_row = $('<div>', {
                        'class': 'artist_row',
                        'prepend': $('<div>', {
                            'class': 'artist_icon',
                        }).css({ "background": "url(\"./unify_media/" + item.name + "/artist.jpg\") center/cover" }),
                        'append': $('<div>', {
                            'class': 'artist_artist_name',
                            'html': item.name
                        }),
                    }).appendTo($side).click(show_this_artist);
                });
            } else {
                show_empty_section();
            }
        }
    );
}

function show_album_list($all = "NULL") {
    $(".content").empty();
    $.getJSON("./php/ajax_requests.php", "type=album_list&username=" + username + "&albums_explore=" + $all, function(json) {
        if (json.albums.length > 0) {
            $wrapper = $('<div>', { 'class': 'loaded album_layout' }).appendTo(".content");
            json.albums.forEach(function(item) {
                var $single_album_window = $('<div>', {
                    'class': 'album',
                    'prepend': $('<div>', {
                        'class': 'album_ill',
                        'html': $('<div>', {
                            'class': 'ill_hover',
                            'html': $ill_buttons = $('<div>', {
                                'class': 'ill_buttons',
                                'html': $('<div>', {
                                    'class': 'ill_play_bttn',
                                }).click(function(e) {
                                    e.stopPropagation();
                                    play_album(item.album, item.artist, "SET");
                                })
                            })
                        }).click(function() {
                            show_this_album(item.album, item.artist);
                        })
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
                if ($all != "NULL" && album_already_owned(item.album) == "ADD") {
                    $('<div>', { 'class': 'explore_ill_add_bttn' }).click(function(e) {
                        e.stopPropagation();
                        add_album_to_library(item.album, this);
                    }).appendTo($ill_buttons);
                }
            });
        } else {
            show_empty_section();
        }
    });
    $wrapper.appendTo(".loaded");
}

function show_queued_songs() {
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
        $list.addClass('no_queued_items');
        $list.append($('<div>', {
            'html': "There are no songs in the queue."
        }));
    }
}

function create_new_playlist() {
    check_valid_pl_name()
        .done(function(data) {
            if (data == "OK") {
                $('.error_input_wrapp').removeClass('visible');
                $('.create_playlist_input').removeClass("wrong_input");
                $.get("./php/ajax_requests.php", "username=" + username + "&type=insert_new_pl&pl_name=" + $('#pl_input').val(),
                    function(data) {
                        if (data === "ok") {
                            $('.create_playlist_wrapp').fadeOut();
                            fill_side_playlists();
                            setTimeout(function() {
                                playlist_check();
                            }, 1000);
                        } else {
                            $('.create_playlist_input').addClass("wrong_input");
                            $('.error_input_wrapp').addClass('visible');
                        }
                    }
                );
            } else {
                $('.create_playlist_input').addClass("wrong_input");
                $('.error_input_wrapp').addClass('visible');
            }
        })
}

function reset_queue() {
    $(".queue_list").addClass("no_queued_items");
    queue = [];
    previous = [];
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
};

function show_this_album($album, $artist, $all = "NULL") {
    $('.content').empty();
    $loaded = $('<div>', { 'class': 'loaded single_album_layout' });
    $('<div>', {
        'class': 'single_album_ill_wrapp',
        'html': $('<div>', {
            'class': 'single_album_ill'
        }).css({ "background": "url(\"./unify_media/" + $artist + "/" + $album + "/cover.jpg\") center/cover" })
    }).appendTo($loaded);
    $w1 = $('<div>', {
        'class': 'single_album_det_wrapp',
        'html': $('<div>', {
            'class': 'single_album_det',
            'html': $('<div>', {
                'class': 'single_album_artist',
                'html': $artist
            }),
            'prepend': $('<div>', {
                'class': 'single_album_name',
                'html': $album
            }),
            'append': $('<div>', {
                'class': 'single_album_genre',
                'html': "pop"
            })
        })
    }).appendTo($loaded);
    $('<div>', { 'class': 'single_album_play_btn', 'html': 'Play' })
        .click(function() {
            play_album($album, $artist, $all);
        })
        .appendTo($w1.children(".single_album_det"));
    var $wrapper = $('<div>', { 'class': 'single_album_songs songs_layout' });
    $.getJSON("./php/ajax_requests.php", "album_explore=" + $all + "&username=" + username + "&type=album_songs&album=" + $album,
        function(json) {
            $i = 1;
            json.songs.forEach(function(item) {
                var $single_row_song = $('<div>', {
                    'class': 'album_row_song',
                    'html': $('<div>', {
                        'class': 'row_song_songname',
                        'html': item.name
                    }),
                    'prepend': $('<div>', {
                        'class': 'row_song_songnumber',
                        'html': $i
                    }).click(function() {
                        play_this(item.name, $artist, $album);
                    }),
                    'append': $('<div>', {
                        'class': 'row_song_songtime',
                        'html': item.length
                    }),
                });
                if ($all == "SET") {
                    if (song_already_owned(item.name) != "OK") {
                        $('<div>', {
                            'class': 'row_song_songicon',
                            'html': $('<div>', {
                                'class': 'song_owned_icon'
                            })
                        }).appendTo($single_row_song);
                    } else {
                        $('<div>', {
                            'class': 'row_song_songicon',
                            'html': $('<div>', {
                                'class': 'song_add_icon',
                            }).click(function(e) {
                                e.stopPropagation();
                                add_song_to_library(item.name, this);
                            })
                        }).appendTo($single_row_song);
                    }
                }
                $single_row_song.appendTo($wrapper);
                $i++;
            });
        }
    );
    $wrapper.appendTo($w1);
    $loaded.appendTo(".content");
}

function play_album($songalbum, $songartist, $all = "NULL") {
    play_pause();
    reset_queue();
    $.getJSON("./php/ajax_requests.php", "album_explore=" + $all + "&username=" + username + "&type=album_songs&album=" + $songalbum, function(json) {
        json.songs.forEach(function(item) {
            queue.push({
                'name': item.name,
                'artist': $songartist,
                'album': $songalbum
            });
        });
        if (shuffle) {
            shuffle_queue(queue);
        }
        play_next();
    });
}

function show_this_artist() {
    $('.artist_content').empty();
    $art_name = $(this).children('.artist_artist_name').text();
    $alb_name = "";
    $.getJSON("./php/ajax_requests.php", "username=" + username + "&artist=" + $art_name + "&type=album_artist_per_user",
        function(json) {
            json.albums.forEach(function(item) {
                $alb_name = item.albumname
                $album = $('<div>', {
                    'class': 'artist_album_row',
                    'prepend': $('<div>', {
                        'class': 'artist_album_ill'
                    }).css({ "background": "url(\"./unify_media/" + $art_name + "/" + item.albumname + "/cover.jpg\") center/cover" })
                });
                $album_det = $('<div>', { 'class': 'artist_album_det' }).appendTo($album);
                $('<div>', {
                    'class': 'single_album_det',
                    'html': $('<div>', {
                        'class': 'single_album_genre',
                        'html': item.genre
                    }),
                    'prepend': $('<div>', {
                        'class': 'single_album_name',
                        'html': $alb_name
                    }),
                    'append': $('<div>', {
                        'class': 'single_album_play_btn',
                        'html': "Play"
                    }).click(function() {
                        play_album($alb_name, $art_name);
                    })
                }).appendTo($album_det);
                $songs = $('<div>', { 'class': 'single_album_songs songs_layout' }).appendTo($album_det);
                $i = 1;
                item.songs.forEach(function(songs) {
                    var $single_row_song = $('<div>', {
                        'class': 'album_row_song',
                        'html': $('<div>', {
                            'class': 'row_song_songname',
                            'html': songs.songname
                        }),
                        'prepend': $('<div>', {
                            'class': 'row_song_songnumber',
                            'html': $i
                        }).click(function() {
                            play_this(songs.songname, $art_name, $alb_name);
                        }),
                        'append': $('<div>', {
                            'class': 'row_song_songtime',
                            'html': item.length
                        }),
                    });
                    $single_row_song.appendTo($songs);
                    $i++;
                });
                $album.appendTo('.artist_content');
            });
        });
}

function show_user_recent() {
    $(".content").empty();
}

function song_already_owned($songname) {
    $result = "";
    $.ajax({
        type: "GET",
        url: "./php/ajax_requests.php",
        data: "username=" + username + "&songname=" + $songname + "&type=check_owned_song",
        dataType: "text",
        async: false,
        success: function(response) {
            $result = response;
        }
    });
    return $result;
}

function album_already_owned($album) {
    $result = "";
    $.ajax({
        type: "GET",
        url: "./php/ajax_requests.php",
        data: "username=" + username + "&album=" + $album + "&type=check_owned_album",
        dataType: "text",
        async: false,
        success: function(response) {
            $result = response;
        }
    });
    return $result;
}

function fill_side_playlists() {
    $wrapper = $('.playlists_list').empty();
    $.getJSON("./php/ajax_requests.php", "type=user_playlists&username=" + username,
        function(json) {
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
    );
};

function show_playlist_menu() {
    $song_selected = $(this).parents(".row_song_songname ").children(".songname").text();
    $list = $(this).children(1);
    $list.empty().append($('<div>', {
        'class': 'song_opt_item new_pl',
        'html': 'Create New',
        'append': $('<div>', {
            'class': 'song_opt_playlist_create_icon'
        })
    }).click(create_playlist));
    $.getJSON("./php/ajax_requests.php", "type=user_playlists&username=" + username, function(json) {
        json.playlists.forEach(function(item) {
            $list.append($('<div>', {
                'class': 'song_opt_item alrd_ex_pls',
                'html': item.name
            }).click(function() {
                add_to_playzlist($song_selected, item.name);
            }));
        });
    });
};

function playlist_check() {
    $(".add_playlist_check_wrapp").addClass("playlist_add_checked");
    setTimeout(function() {
        $(".add_playlist_check_wrapp").removeClass("playlist_add_checked");
    }, 2000);
};

function add_to_playlist($songname, $pl_name) {
    $.get("./php/ajax_requests.php", "username=" + username + "&type=insert_song_into_pl&pl_name=" + $pl_name +
        "&songname=" + $songname,
        function(data) {
            if (data == "ok") {

            } else {

            }
        }
    )
};

function create_playlist() {
    $('.create_playlist_wrapp').fadeIn().css("display", "flex");
};

function check_valid_pl_name() {
    return $.get("./php/ajax_requests.php", "username=" + username + "&type=check_pl_exist&new_pl_name=" + $('#pl_input').val());
}

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
                            'html': ''
                        }),
                        'append': $('<div>', {
                            'class': 'tot_time_pl',
                            'html': ''
                        })
                    })
                })
            })
        })
    }).appendTo('.content').append($pl_content);
    $pl_name = $(this).text();
    $.getJSON("./php/ajax_requests.php", "username=" + username + "&type=songs_into_pl&pl_name=" + $pl_name,
        function(json) {
            json.songs.forEach(function(item) {
                var $single_row_song = $('<div>', { 'class': 'row_song' });
                $('<div>', {
                    'class': 'row_song_songname',
                    'prepend': $('<div>', {
                        'class': 'song_illustration',
                    }).click(function() {
                        play_this(item.name, item.artist, item.album);
                    }).css({ "background": "url(\"./unify_media/" + item.artist + "/" + item.album + "/cover.jpg\") center/cover" }),
                    'append': $('<div>', {
                        'class': 'songname',
                        'html': item.name,
                    })
                }).appendTo($single_row_song);
                $('<div>', { 'class': 'row_song_songartist', 'html': item.artist }).appendTo($single_row_song);
                $('<div>', { 'class': 'row_song_songalbum', 'html': item.album }).appendTo($single_row_song);
                $('<div>', { 'class': 'row_song_songtime', 'html': item.length }).appendTo($single_row_song);
                $single_row_song.appendTo($pl_content);
            });
            $('.n_songs_pl').text(json.nsongs + " songs");
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

function add_song_to_library($songname, $div) {
    $($div).removeClass('song_add_icon').addClass('loader');
    setTimeout(() => {
        $.get("./php/ajax_requests.php", "type=add_song_to_lib&username=" + username + "&songname=" + $songname,
            function(data) {
                if (data == "OK") {
                    $($div).removeClass('loader').addClass('song_owned_icon');
                } else {
                    $($div).removeClass('loader').addClass('song_add_icon');
                }
            }
        );
    }, 2000);
}

function add_album_to_library($album, $div) {
    $($div).removeClass('explore_ill_add_bttn').addClass('album_loader');
    setTimeout(() => {
        console.log($album);
        $.get("./php/ajax_requests.php", 'username=' + username + "&type=add_album_to_library&album=" + $album,
            function(data) {
                if (data == "ADDED") {
                    $($div).removeClass('album_loader');
                } else {
                    $($div).removeClass('album_loader').addClass('explore_ill_add_bttn');
                }
            }
        );
    }, 2000);
}

function remove_this_from_library($songname) {
    $.get("./php/ajax_requests.php", "type=remove_from_library&username=" + username + "&songname=" + $songname,
        function(data) {
            if (data == "REMOVED") {
                show_song_list();
            } else {
                console.log(data);
            }
        }
    );
}

//PLAYBACK HANDLING

$('.playback_shuffle_btn').click(function() {
    $(this).toggleClass('shuffle_active');
    shuffle = !shuffle;
    if (shuffle && queue.length > 1) {
        shuffle_queue(queue);
    }
})

$(".playback_repeat_btn").click(function() {
    $(this).toggleClass('repeat_active');
    repeat = !repeat;
    if (repeat) {
        repeat_src = song.src;
    }
})

$(".playback_back_arrow_btn").click(play_previous);

function play_this($songname, $songartist, $songalbum) {
    $newsrc = "./unify_media/" + $songartist + "/" + $songalbum + "/" + $songname + ".mp3";
    if (lastsong != $newsrc) {
        if (check_remotely_exist($newsrc)) {
            lastsong = $newsrc;
            song.src = $newsrc;
            song.play();
            $(".actual_song_name").text($songname);
            $(".actual_artist_album").text($songartist + " -- " + $songalbum);
            $(".miniplayer_img").removeClass("no_artwork").css({
                "background": "url('./unify_media/" + $songartist + "/" + $songalbum + "/cover.jpg') center/cover"
            });
            $(".playback_play_btn").addClass("song_played");
        } else {

        }
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

function play_next() {
    song.pause();
    $(".playback_play_btn").removeClass("song_played");
    if (repeat) {
        song.src = repeat_src;
        play_pause();
    } else if (queue.length > 0) {
        song.src = "./unify_media/" + queue[0].artist +
            "/" + queue[0].album + "/" + queue[0].name + ".mp3";
        $(".actual_song_name").text(queue[0].name);
        $(".actual_artist_album").text(queue[0].artist + " -- " + queue[0].album);
        $(".miniplayer_img").removeClass("no_artwork").css({
            "background": "url('./unify_media/" + queue[0].artist +
                "/" + queue[0].album + "/cover.jpg') center/cover"
        });
        previous.push({
            'name': queue[0].name,
            'artist': queue[0].artist,
            'album': queue[0].album
        })
        queue.shift();
        play_pause();
    } else {
        $(".miniplayer_img").addClass("no_artwork");
        $(".actual_song_name").text("");
        $(".actual_artist_album").text("");
    }
}

function play_previous() {
    song.pause();
    $(".playback_play_btn").removeClass("song_played");
    if (previous.length > 0) {
        $prev = previous.pop();
        queue.unshift({
            'name': queue[0].name,
            'artist': queue[0].artist,
            'album': queue[0].album
        })
        song.src = "./unify_media/" + $prev.artist +
            "/" + $prev.album + "/" + $prev.name + ".mp3";
        $(".actual_song_name").text($prev.name);
        $(".actual_artist_album").text($prev.artist + " -- " + $prev.album);
        $(".miniplayer_img").removeClass("no_artwork").css({
            "background": "url('./unify_media/" + $prev.artist +
                "/" + $prev.album + "/cover.jpg') center/cover"
        });
        play_pause();
    } else {
        $(".miniplayer_img").addClass("no_artwork");
        $(".actual_song_name").text("");
        $(".actual_artist_album").text("");
    }
}

function change_volume() {
    song.volume = parseFloat(this.value / 100);
}

function shuffle_queue(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

song.onended = function() {
    play_next();
};