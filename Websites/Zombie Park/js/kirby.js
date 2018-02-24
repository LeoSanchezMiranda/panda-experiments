$(function () {
    var kirby = ["<(^-^<)", "(>^-^)>","<(^-^<)", "(>^-^)>", "(>^-^<)", "^(^-^)^", "(>^-^<)", "^(^-^)^"];
    var move = 1;
    var autoplay = setInterval(dance, '500');
    function dance() {
        $('#kirby-dance').html(kirby[move]);
        move++;
        if (move > 7) { move = 0; }
    }

    if (localStorage['highScore']) {
        $('#stat-headshots').html(localStorage['headshotsTotal']);
        $('#stat-shots').html(localStorage['shotsTotal']);
        $('#stat-hits').html(localStorage['hitsTotal']);
        $('#stat-escaped').html(localStorage['escapedTotal']);
        $('#stat-hScore').html(localStorage['highScore']);

        $('#speedy-score span').html(localStorage['speedyHits']);
        $('#norm1-score span').html(localStorage['normAhits']);
        $('#norm2-score span').html(localStorage['normBhits']);
        $('#slow-score span').html(localStorage['slowHits']);
    }

    $('#clear_all_data').click(function () {
        if (confirm("You sure you want to erase all data?")){
            localStorage['highScore'] = 0;

            localStorage['speedyHits'] = 0;
            localStorage['normAhits'] = 0;
            localStorage['normBhits'] = 0;
            localStorage['slowHits'] = 0;

            localStorage['headshotsTotal'] = 0;
            localStorage['hitsTotal'] = 0;
            localStorage['shotsTotal'] = 0;
            localStorage['escapedTotal'] = 0;
            alert("Ready, you can start from 0 now.");
            location.reload();
        }
    });
});