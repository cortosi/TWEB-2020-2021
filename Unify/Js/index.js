$(".login_butt").click(function() {
    $(".login_panel").toggleClass("login_panel_open");
    $(".login_butt").toggleClass("login_butt_up")
    $(".login_butt").text(function() {
        return $(".login_butt").text() == "Back" ? "Login" : "Back";
    });
});

$(".sign_butt").click(function() {
    $(".signup_panel").toggleClass("signup_panel_open");
    $(".sign_butt").toggleClass("sign_butt_up")
    $(".sign_butt").text(function() {
        return $(".sign_butt").text() == "Back" ? "Sign-Up" : "Back";
    });
});