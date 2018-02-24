$(function () {
    var minTime = 1000;//MIN MILISECONDS FOR ZOMBIES TO WALK ACROSS
    var maxTime = 9000;//MAX MILISECONDS FOR ZOMBIES TO WALK ACROSS
    var walkingTime;
    var waitingTime;
    var end_pos;
    var loggedIn = 0;

    if (localStorage['logged']) {
        loggedIn = parseInt(localStorage['logged']);
    } else {
        localStorage['logged'] = loggedIn;
    }

    $('#logout_btn').click(function (e) {
        if (confirm("You sure?")) {
            localStorage['logged'] = 0;
        } else {
            e.preventDefault();
        }
    });

    function walk_left() {
        walkingTime = minTime + Math.floor(Math.random() * maxTime);
        waitingTime = minTime + Math.floor(Math.random() * maxTime);
        end_pos = $(window).width();
        $('#walker_img').offset({ left: -250 }).show().animate({ left: end_pos }, walkingTime).delay(waitingTime).hide(walk_right);
    }
    function walk_right() {
        walkingTime = minTime + Math.floor(Math.random() * maxTime);
        waitingTime = minTime + Math.floor(Math.random() * maxTime);
        end_pos = $(window).width();
        $('#walker_img2').offset({ left: end_pos }).show().animate({ left: -250 }, walkingTime).delay(waitingTime).hide(walk_left);
    }
    walk_left();

    //LOGIN PANEL ANIMATION
    if (loggedIn == 0) {
        $('#members_btn').toggle(function () {
            $('#login_panel').hide().removeClass('nono').slideDown('slow');
            $('#members_btn a span').removeClass('icon-user').addClass('icon-cancel-circle');
            e.preventDefault();
        }, function () {
            $('#login_panel').slideUp('slow');
            $('#members_btn a span').removeClass('icon-cancel-circle').addClass('icon-user');
        })
    } else {
        $('#members_btn').click(function (e) {
            e.preventDefault();
            window.location.replace("/members.html");
        });
    }

    //LOG IN VALIDATION, ONCE AGAIN, THANK YOU INTERNET EXPLORER
    $('#login_form').submit(function (e) {

        var email = $('#user_email').val();
        var pass = $('#user_pass').val();

        $('#user_ID_label span').html('');
        $('#user_pass_label span').html('');

        if (email=="") {
            $('#user_email').focus();
            $('#user_ID_label span').html(' - Required');
            e.preventDefault();
        } else if (pass == "") {
            $('#user_pass').focus();
            $('#user_pass_label span').html(' - Required');
            e.preventDefault();
        } else {
            
            //DUMMY SCRIPT FOR LOG IN INFORMATION, ON NORMAL CASES THIS COULD BE REPLACED BY AN AJAX REQUEST TO CHECK FOR CORRECT CREDENTIALS.
            if (localStorage['mail']) {
                var current_mail = localStorage['mail'];
                var current_pass = localStorage['pass'];
                if (email != current_mail && pass != current_pass) {
                    alert("Sorry, wrong information.");
                    $('#user_email').val('');
                    $('#user_pass').val('');
                    $('#user_email').focus();
                    
                } else {
                    alert("Welcome Master");
                    localStorage['logged'] = 1;
                }
            } else {
                e.preventDefault();
                if (confirm("Sorry, there are no users in this computer. Would you like to register?")) {
                    window.location.replace("/register.html");
                }
            }
        }
    });

    function changeLinks() {
        $('.replacehref').each(function() {
            var correct_link = $(this).attr('title');
            $(this).attr('href', correct_link);
        });
    }

    changeLinks();
});