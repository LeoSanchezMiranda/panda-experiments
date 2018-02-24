$(function () {

    if (localStorage['name']) {
        var step = 1;
        var reg_mail = localStorage['mail'];
        var reg_question = localStorage['question'];
        var reg_answer = localStorage['answer'];
        var wrong_times = 0;
        var times_limit = 5;
        var mail;
        var question;
        var answer;

        $('.nono').hide().removeClass('nono');

        $('#register-form').submit(function (e) {
            e.preventDefault();
            switch (step) {
                case 1:
                    mail = $('#reg-mail').val();
                    if (mail == reg_mail) {
                        $('#reg-mail').attr("readonly", "true").addClass('grey');
                        $('#reg-que').val(reg_question);
                        $('#forget-pass-1').slideDown();
                        $('#reg-ans').focus();
                        step++;
                    } else {
                        if (confirm("Sorry, there are no users with this email. Would you like to register?")) {
                            window.location.replace("/register.html");
                        }
                    }
                    break;
                case 2:
                    answer = $('#reg-ans').val();
                    if (answer == reg_answer) {
                        $('#reg-ans').attr("readonly", "true").addClass('grey');
                        $('#reg-que').attr("readonly", "true").addClass('grey');
                        $('#forget-pass-2').slideDown();
                        $('#reg-pass').focus();
                        step++;
                    } else {
                        wrong_times++;
                        if (wrong_times < times_limit) {
                            $('#reg-ans').focus().val("").attr("placeholder", 5 - wrong_times + "Tries left out of " + times_limit);

                        } else {
                            alert("Sorry, 5 atempts. Try again later on.");
                            window.location.replace("/index.html");
                        }
                    }
                    break;
                case 3:
                    pass = $('#reg-pass').val();
                    if (pass != '') {
                        localStorage['pass'] = pass;
                        alert("Thank you, you can login now. (sorry, no security confirmation)");
                        window.location.replace("/index.html");
                    } else {
                        alert("Ehm... your password needs to be diferent than well... nothing :D");
                        $('#reg-pass').focus();
                    }
                    break;
            }
            
        });


    } else {
        $('#forget-next').click(function () {
            if (confirm("Sorry, there are no users registered. Would you like to register?")) {
                window.location.replace("/register.html");
            }
        });
    }
});