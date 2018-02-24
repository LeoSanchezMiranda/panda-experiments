$(function () {
    var slide = 1;
    var total = $('#gStart').children('div').length;
    var slide_delay = 7000; //ADJUST DELAY
    var transition_delay = 1500; //TIME FOR THE FADEIN/FADEOUT EFFECT
    var autoplay = setInterval(next, slide_delay);

    function next() {
        var next = slide + 1;
        if (next > total) { next = 1; }
       var current_slide = "#slide" + slide;
        var next_slide = "#slide" + next;
        $(current_slide).fadeOut(transition_delay);
        $(next_slide).fadeIn(transition_delay);
        slide++;
        if(slide>total) { slide = 1; }
    }

    $('#gStart').click(function () {
        next();
    }).hover(function () {
        clearInterval(autoplay);
    }, function () {
        autoplay = setInterval(next, slide_delay);
    });


});