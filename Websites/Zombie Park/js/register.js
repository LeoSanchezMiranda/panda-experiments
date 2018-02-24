$(function () {
    
    $('#register-form').submit(function (e) {
        var name = $('#reg-name').val();
        var mail = $('#reg-mail').val();
        var pass = $('#reg-pass').val();
        var question = $('#reg-que').val();
        var answer = $('#reg-ans').val();

        if (name=="") {
            $('#reg-name-er').html();
            $('#reg-name').focus();
        } else if (mail == "") {
            $('#reg-mail-er').html();
            $('#reg-mail').focus();
        } else if (pass == "") {
            $('#reg-pass-er').html();
            $('#reg-pass').focus();
        } else if (question == "") {
            $('#reg-que-er').html();
            $('#reg-que').focus();
        } else if (answer == "") {
            $('#reg-ans-er').html();
            $('#reg-ans').focus();
        } else {
            localStorage['name'] = name;
            localStorage['mail'] = mail;
            localStorage['pass'] = pass;
            localStorage['question'] = question;
            localStorage['answer'] = answer;
            alert("Thank you, you can login now. (sorry, no security confirmation)");
            window.location.replace("/index.html");
        }
        e.preventDefault();
    });

});