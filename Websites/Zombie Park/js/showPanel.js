$(function () {

    $('.show_description').hide();

    $('div.shadow_curtain').removeClass('nono')

    $('div.showElement').hover(function () {
        $('div.shadow_curtain', this).fadeOut('fast');
        $('div.show_description', this).fadeIn('fast');
    }, function () {
        $('div.shadow_curtain', this).fadeIn('fast');
        $('div.show_description', this).fadeOut('fast');
    }).toggle(function () {
        $('div.shadow_curtain', this).fadeOut('fast');
        $('div.show_description', this).fadeIn('fast');
    }, function () {
        $('div.shadow_curtain', this).fadeIn('fast');
        $('div.show_description', this).fadeOut('fast');
    });


});