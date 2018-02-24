$(function () {
    
    var image_show;
    var image_title;

    $('.tumb_images a').click(function (e) {
        image_show = $('img', this).attr('src');
        image_title = $('img', this).attr('title');
        $('.main_display img').attr('src', image_show);
        $('div.text_container_IG').html('<p>' + image_title + '</p>');
        e.preventDefault();
    });

    $('.tumb_images a:first-child').click();
});