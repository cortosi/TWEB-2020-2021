var song = new Audio();
var currentSong = 0;

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
    }).appendTo(".content");
    $.getJSON("./php/ajax_requests.php", "type=songs", function(json) {
        json.songs.forEach(function(item) {
            var $wrapper = $('<div>', { 'class': 'row_song' });
            var $songname = $('<div>', {
                'class': 'row_song_songname',
                'prepend': $('<div>', {
                    'class': 'song_illustration',
                }).css({ "background": "url(\"./unify_media/" + item.artist + "/" + item.album + "/cover.jpg\") center/cover" }),
                'append': $('<div>', {
                    'class': 'songname',
                    'html': item.name,
                })
            }).click(play_this);
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
    var $wrapper = $('<div>', { 'class': 'all_album_wrapp' });
    $('<div>', {
        'class': 'loaded',
    }).appendTo(".content");
    $.getJSON("./php/ajax_requests.php", "type=album", function(json) {
        json.albums.forEach(function(item) {
            var $album = $('<div>', {
                'class': 'album',
                'prepend': $('<div>', {
                    'class': 'album_ill',
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

//PLAYBACK HANDLING

$(".playback_play_btn").click(play_pause);

function play_this() {
    song.src = "./unify_media/" + $(this).nextAll(".row_song_songartist").text() +
        "/" + $(this).nextAll(".row_song_songalbum").text() + "/" + $(this).children()[1].textContent + ".mp3";
    if (check_remotely_exist(song.src)) {
        song.play();
        $(".actual_song_name").text($(this).children()[1].textContent);
        $(".actual_artist_album").text($(this).nextAll(".row_song_songartist").text() + " -- " + $(this).nextAll(".row_song_songalbum").text());
        $(".miniplayer_img").removeClass("no_artwork").css({
            "background": "url('./unify_media/" + $(this).nextAll(".row_song_songartist").text() +
                "/" + $(this).nextAll(".row_song_songalbum").text() + "/cover.jpg') center/cover"
        });
        $(".playback_play_btn").addClass("song_played");
    } else {}
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