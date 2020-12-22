var songs = ["./test/Hey Brother.mp3"];

var song = new Audio();
var currentSong = 0;

$(document).ready(function() {
    song.src = songs[0];
});


$(".playback_play_btn").click(function playOrPauseSong() {
    if (song.paused) {
        song.play();
        $(".playback_play_btn").addClass("song_played");
    } else {
        song.pause();
        $(".playback_play_btn").removeClass("song_played");
    }
});

$(".songs_btn").click(function() {
    $(".loaded").empty();
    $.getJSON("./php/ajax_requests.php", "type=songs", function(json) {
        json.songs.forEach(function(item) {
            var $wrapper = $('<div>', { 'class': 'row_song' });
            var $songname = $('<div>', {
                'class': 'row_song_songname',
                'prepend': $('<img>', {
                    'class': 'song_illustration',
                    'src': './unify_media/' + item.artist + '/' + item.album + '/cover.jpg',
                }).click(prova),
                'append': item.name,
            });
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
    $(".loaded").empty();

});

$(".albums_btn").click(function() {
    $(".loaded").empty();

});

$(".recently_btn").click(function() {
    $(".loaded").empty();

});

function prova() {
    console.log($(this).next().text());
};