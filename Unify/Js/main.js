var songs = ["/unify/test/Hey Brother.mp3"];

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
    $.getJSON("/unify/php/ajax_requests.php", "type=songs", function(json) {
        json.songs.forEach(function(item) {
            var $wrapper = $('<div>', { 'class': 'row_song' });
            $('<div>', {
                'class': 'row_song_songname',
                'html': item.name,
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