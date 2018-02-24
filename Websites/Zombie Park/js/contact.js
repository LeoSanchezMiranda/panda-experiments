$(function () {
    var anim_speed = 400;
    var current_section = 1;
    var selected_section = 1;
    //THE WHOLE VALIDATION IS FOR IE. THANK YOU IE, FOR NOT SUPORTING HTML5 FORM VALIDATION o_O
    $('#contact_us').submit(function (e) {
        var name = $('#name_field').val();
        var email = $('#email_field').val();
        var phone = $('#phone_field').val();

        var other = $('#other').val();

        var dateW = $('#date_wanted').val();
        var persons = $('#no_persons').val();

        var zName = $('#zombie_name').val();
        var iDate = $('#infection_date').val();

        var message = $('#message_field').val();

        $('#name_message').html('*');
        $('#mail_message').html('*');
        $('#phone_message').html('*');
        $('#date_message').html('*');
        $('#persons_message').html('*');
        $('#date_message').html('*');
        $('#persons_message').html('*');
        $('#z_name_message').html('*');
        $('#i_date_message').html('*');
        $('#other_message').html('*');
        $('#message_message').html('*');

        if (name == "") {
            $('#name_message').html(' -  Plese enter your name.');
            $('#name_field').focus();
            e.preventDefault();
        } else if (email == "") {
            $('#mail_message').html(' -  Plese enter your e-Mail.');
            $('#mail_field').focus();
            e.preventDefault();
        } else if (phone == "") {
            $('#phone_message').html(' -  Plese enter your phone number.');
            $('#phone_field').focus();
            e.preventDefault();
        } else if (current_section == 2) {
            if (dateW == "") {
                $('#date_message').html(' ??');
                $('#date_wanted').focus();
                e.preventDefault();
            } else if (persons == "") {
                $('#persons_message').html(' ??');
                $('#no_persons').focus();
                e.preventDefault();
            }
        } else if (current_section == 3) {
            if (zName == "") {
                $('#z_name_message').html(' ??');
                $('#zombie_name').focus();
                e.preventDefault();
            } else if (iDate == "") {
                $('#i_date_message').html(' ??');
                $('#infection_date').focus();
                e.preventDefault();
            }
        } else if (current_section == 4) {
            if (other == "") {
                $('#other_message').html(' ??');
                $('#other').focus();
                e.preventDefault();
            } 
        } else if (message == "") {
            $('#message_message').html(' - Nothing to say?');
                $('#message_field').focus();
                e.preventDefault();
        } else {
            alert(" Ajax atack! ... well, maybe not. (Mental note: learn how to use C# Leo!)");
            e.preventDefault();
        }
    });
    $('#other_container').hide().removeClass('nono');
    $('#date_selection_container').hide().removeClass('nono');
    $('#donate_zombie_container').hide().removeClass('nono');

    $('#topic').change(function (e) {
        selected_section = $('#topic').val();
            
        hide(current_section);
            
        if (selected_section == "Just to say Hi") {
            $('#message_field').animate({ height: 200 }, anim_speed)
            current_section = 1;
        } else if (selected_section == "Date request") {
            if (current_section == 1) {
                $('#date_selection_container').slideDown(anim_speed);
            } else {
                $('#date_selection_container').delay(anim_speed).slideDown(anim_speed);
                $('#message_field').animate({ height: 150 }, anim_speed)
            }
            current_section = 2;
        } else if (selected_section == "Zombie sign up") {
            if (current_section == 1) {
                $('#donate_zombie_container').slideDown(anim_speed);
            } else {
                $('#donate_zombie_container').delay(anim_speed).slideDown(anim_speed);
                $('#message_field').animate({ height: 150 }, anim_speed)
            }
            current_section = 3;
        } else if (selected_section == "Other") {
            if (current_section == 1) {
                $('#other_container').slideDown(anim_speed);
            } else {
                $('#other_container').delay(anim_speed).slideDown(anim_speed);
                $('#message_field').animate({ height: 150 }, anim_speed)
            }
            current_section = 4;
        }

    });

    function hide(panelNO) {

        if (current_section == 1 && selected_section != "Just to say Hi") {
            $('#message_field').animate({ height: 150 }, anim_speed)
        } else {
            $('#message_field').animate({ height: 200 }, anim_speed)
        }

        switch (panelNO) {
            case 2:
                $('#date_selection_container').slideUp(anim_speed);
                break;
            case 3:
                $('#donate_zombie_container').slideUp(anim_speed);
                break;
            case 4:
                $('#other_container').slideUp(anim_speed);
                break;
        }
    }

});