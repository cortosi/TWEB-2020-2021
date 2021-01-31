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

$('.isnotreg').click(function() {
    $(".login_panel").toggleClass("login_panel_open");
    $(".login_butt").toggleClass("login_butt_up")
    $(".login_butt").text("Login");
    $(".signup_panel").toggleClass("signup_panel_open");
    $(".sign_butt").toggleClass("sign_butt_up")
    $(".sign_butt").text(function() {
        return $(".sign_butt").text() == "Back" ? "Sign-Up" : "Back";
    });
})

$('.alrdreg').click(function() {
    $(".signup_panel").toggleClass("signup_panel_open");
    $(".sign_butt").toggleClass("sign_butt_up")
    $(".sign_butt").text("Sign-Up");
    $(".login_panel").toggleClass("login_panel_open");
    $(".login_butt").toggleClass("login_butt_up")
    $(".login_butt").text(function() {
        return $(".login_butt").text() == "Back" ? "Login" : "Back";
    });
})

$('.login_form').submit(function() {
    $.get("./php/login.php", 'username=' + $('#login_username').val() +
        "&password=" + $('#login_password').val(),
        function(data) {
            switch (data) {
                case 'PSW_ERR':
                    $('.login_error').addClass('error_show').text("Wrong Password");
                    break;
                case 'USR_ERR':
                    $('.login_error').addClass('error_show').text("User doesn't exist");
                    break;
                case 'LOGGED':
                    window.location = "./main.php";
                    break;
            }
        },
    );
})

$('.signup_input_fields').submit(function() {
    $.get("./php/signup.php", 'username=' + $('#signup_username').val() +
        "&email=" + $('#signup_email').val() +
        "&password=" + $('#signup_password').val() +
        "&gender=" + $(".signup_input_fields input[type='radio']:checked").val(),
        function(data) {
            switch (data) {
                case 'USERNAME_EXIST':
                    $('.signup_error').addClass('error_show').text("Username Already Exist");
                    break;
                case 'EMAIL_EXIST':
                    $('.signup_error').addClass('error_show').text("Email already used");
                    break;
                case 'REGISTERED':
                    window.location = "./php/signup_success.php";
                    break;
            }
        });
})