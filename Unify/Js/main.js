var songs = ["/test/Hey Brother.mp3"];

var song = new Audio();
var currentSong = 0;

function playSong() {
    song.src = songs[0];
    song.play();
    $(".playback_play_btn").addClass("song_played");
}

$(document).ready(function() {
    playSong();
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