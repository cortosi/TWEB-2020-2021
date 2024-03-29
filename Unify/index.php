<?php
session_start();
if (!isset($_SESSION['username'])) {
?>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./Style/index.css">
        <link rel="stylesheet" href="./Style/fonts.css">
        <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
        <link rel="icon" href="./Imgs/logo.png">
        <title>Unify</title>
    </head>

    <body>
        <div class="site">
            <div class="head">
                <div class="head-left">
                    <div class="logo_wrapp">
                        <div class="logo"></div>
                    </div>
                    <div class="comp_name_wrapp">
                        <p class="comp_name">Unify</p>
                    </div>
                </div>
                <div class="head-right">
                    <div class="navbar">
                        <span class="login_butt">Login</span>
                        <span class="sign_butt">Sign-up</span>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="bars"></div>
                <h1 class="intro">Tutta la musica che vuoi nelle tue mani <br> Ti basta registrarti! O se sei già registrato, accedi per scoprire i contenuti.</h1>
                <p class="cit">“Un giorno anche la guerra s'inchinerà al suono di una chitarra.”</p>
                <p class="cit_name">Jim Morrison</p>
            </div>
            <div class="login_panel">
                <div class="login_wrapp">
                    <form class="login_form" action="javascript:void(0);">
                        <div class="form_head">
                            <span class="form_welcome">Welcome</span>
                            <div class="form_logo"></div>
                        </div>
                        <div class="login_input_fields">
                            <input id="login_username" name="username" autocomplete="new-user" type="text" placeholder="Username">
                            <input id="login_password" name="password" type="password" placeholder="Password">
                            <div class="login_error">Wrong Password</div>
                            <input id="login_submit" type="submit" value="LOGIN">
                        </div>
                        <div class="isnotreg">
                            <p>Don’t have an account? Sign Up</p>
                        </div>
                    </form>
                </div>
            </div>
            <div class="signup_panel">
                <div class="signup_wrapp">
                    <div class="signup_form" action="#">
                        <div class="form_head">
                            <span class="form_welcome">Welcome</span>
                            <div class="form_logo"></div>
                        </div>
                        <form class="signup_input_fields" action="javascript:void(0);">
                            <input id="signup_email" autocomplete="off" type="  " name="" placeholder="E-mail" required>
                            <input id="signup_username" maxlength="20" autocomplete="new-user" type="text" placeholder="Username" required>
                            <input id="signup_password" type="password" placeholder="Password" required>
                            <div class="gender">
                                <label for="gender_m">Male</label>
                                <input type="radio" name="gender" value="M">
                                <label for="gender_f">Female</label>
                                <input type="radio" name="gender" value="F">
                            </div>
                            <div class="signup_error">Wrong Password</div>
                            <input id="signup_submit" type="submit" value="SIGN UP">
                        </form>
                        <div class="alrdreg">
                            <p>Already registered? Log-in</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="./Js/index.js"></script>
    </body>

    </html>
<?php
} else {
    header("Location: ./main.php");
}
?>