$(function () {

    if (!($.browser.msie)) {



        //GETING READY
        $('#speedy_zombie').hide();
        $('#normal_zombie1').hide();
        $('#normal_zombie2').hide();
        $('#slow_zombie').hide();



        //GAME PARAMETERS
        var end_game = 10; //LIMIT OF SCAPES
        var ended = false;

        if (localStorage['highScore']) {

        } else {
            localStorage['highScore'] = 0;
        }

        
        var highScore = localStorage['highScore'];

        var threshold1 = 50;
        var threshold2 = 100;
        var threshold3 = 200;
        var threshold4 = 500;
        var level = 1;
        var dificultyUp = 0.22; //PERCENTAGE TO INCREASE DIFICULTY. HAS TO BE LESS THAN .25

        //SCORES PER HIT
        var fast_headshot_score = 10;
        var normal_headshot_score = 6;
        var slow_headshot_score = 4

        var fast_hit_score = 3;
        var normal_hit_score = 2;
        var slow_hit_score = 1;

        //TIME VARIABLES
        var speedy_zombie_respawn_initial = 8000;
        var normal_zombie_respawn_initial = 3000;
        var slow_zombie_respawn_initial = 1000;

        var speedy_zombie_speed_initial = 500;
        var normal_zombie_speed_initial = 1500;
        var slow_zombie_speed_initial = 2500;

        //SPEEDS TO INCREASE DIFICULTY.... I KNOW I KNOW, I NEED TO STUDY SOME MORE JAVASCRIPT.
        //IN THE MEANTIME... THESE ARE NOT TO BE TOUCHED HE HE.
        var speedy_zombie_respawn = speedy_zombie_respawn_initial;
        var normal_zombie_respawn = normal_zombie_respawn_initial;
        var slow_zombie_respawn = slow_zombie_respawn_initial;

        var speedy_zombie_speed = speedy_zombie_speed_initial;
        var normal_zombie_speed = normal_zombie_speed_initial;
        var slow_zombie_speed = slow_zombie_speed_initial;

        var speedy_respawn_increase = speedy_zombie_respawn_initial * dificultyUp;
        var normal_respawn_increase = normal_zombie_respawn * dificultyUp;
        var slow_respawn_increase = slow_zombie_respawn * dificultyUp;

        var speedy_speed_increase = speedy_zombie_speed * dificultyUp;
        var normal_speed_increase = normal_zombie_speed * dificultyUp;
        var slow_speed_increase = slow_zombie_speed * dificultyUp;

        //GAME SCORE KEEPERS
        var score = 0;
        var headshot = 0;
        var hits = 0;
        var shots = 0;
        var escaped = 0;

        var final_score = 0;
        var final_headshot = 0;
        var final_hits = 0;
        var final_shots = 0;
        var final_escaped = 0;

        //AUDIO FILES
        var gunShot_sound = document.createElement('audio');
        gunShot_sound.setAttribute('src', 'sounds/gun.ogg');

        var zombie_sound = document.createElement('audio');
        zombie_sound.setAttribute('src', 'sounds/zShot.ogg');

        var ricochet_sound = document.createElement('audio');
        ricochet_sound.setAttribute('src', 'sounds/ricochet.ogg');

        var hahaSound = document.createElement('audio');
        hahaSound.setAttribute('src', 'sounds/haha.ogg');

        var poltergeistSound = document.createElement('audio');
        poltergeistSound.setAttribute('src', 'sounds/poltergeist.ogg');

        //GUN SHOT PLAY
        function gunSound(hit) {
            gunShot_sound.currentTime = 0;
            gunShot_sound.play();
            if (hit == 0) {
                ricochetSound();
            } else {
                switch (hit) {
                    case 1:
                        shoot_zombie(hit);
                        zombieSound();
                        break;
                    case 2:
                        shoot_zombie(hit);
                        zombieSound();
                        break;
                    case 3:
                        shoot_zombie(hit);
                        zombieSound();
                        break;
                    case 4:
                        shoot_zombie(hit);
                        zombieSound();
                        break;
                }
            }
        }
        //NO HIT SOUND
        function ricochetSound() {
            ricochet_sound.currentTime = 0;
            ricochet_sound.play();
        }
        //HIT SOUND
        function zombieSound() {
            zombie_sound.currentTime = 0;
            zombie_sound.play();
        }

        //RESTART BUTTON
        $('#restart').click(function () {

            $('#speedy_zombie').removeClass('stoped');
            $('#normal_zombie1').removeClass('stoped');
            $('#normal_zombie2').removeClass('stoped');
            $('#slow_zombie').removeClass('stoped');

            $('#score').html('0');
            $('#headshots_count').html('0');
            $('#hits_count').html('0');
            $('#shots_count').html('0');
            $('#escape_count').html('0');

            $('#game_over').html('');

            score = 0;
            headshot = 0;
            hits = 0;
            shots = 0;
            escaped = 0;

            final_score = 0;
            final_headshot = 0;
            final_hits = 0;
            final_shots = 0;
            final_escaped = 0;
            ended = false;
            $('#restart').addClass('nono');
        });

        //START THE GAME
        $('#zombie_range').click(function () { if (ended == false) { shots++; gunSound(0); submit_score(); } });

        $('#slow_zombie .headshot').mousedown(function (e) { e.stopPropagation(); score = score + slow_headshot_score; hits++; headshot++; shots++; gunSound(4); submit_score(); }).click(function (e) { e.stopPropagation(); });
        $('#normal_zombie2 .headshot').mousedown(function (e) { e.stopPropagation(); score = score + normal_headshot_score; hits++; headshot++; shots++; gunSound(3); submit_score(); }).click(function (e) { e.stopPropagation(); });
        $('#normal_zombie1 .headshot').mousedown(function (e) { e.stopPropagation(); score = score + normal_headshot_score; hits++; headshot++; shots++; gunSound(2); submit_score(); }).click(function (e) { e.stopPropagation(); });
        $('#speedy_zombie .headshot').mousedown(function (e) { e.stopPropagation(); score = score + fast_headshot_score; hits++; headshot++; shots++; gunSound(1); submit_score(); }).click(function (e) { e.stopPropagation(); });

        $('#slow_zombie .hit').mousedown(function (e) { e.stopPropagation(); score = score + slow_hit_score; hits++; shots++; gunSound(4); submit_score(); return false; }).click(function (e) { e.stopPropagation(); });
        $('#normal_zombie2 .hit').mousedown(function (e) { e.stopPropagation(); score = score + normal_hit_score; hits++; shots++; gunSound(3); submit_score(); return false; }).click(function (e) { e.stopPropagation(); });
        $('#normal_zombie1 .hit').mousedown(function (e) { e.stopPropagation(); score = score + normal_hit_score; hits++; shots++; gunSound(2); submit_score(); return false; }).click(function (e) { e.stopPropagation(); });
        $('#speedy_zombie .hit').mousedown(function (e) { e.stopPropagation(); score = score + fast_hit_score; hits++; shots++; gunSound(1); submit_score(); return false; }).click(function (e) { e.stopPropagation(); });

        //FUNCTION TO INCREASE DIFICULTY
        function increaseDificulty() {
            speedy_zombie_respawn = speedy_zombie_respawn - speedy_respawn_increase; if (speedy_zombie_respawn < 1000) { speedy_zombie_respawn = 1000; }
            normal_zombie_respawn = normal_zombie_respawn - normal_respawn_increase; if (normal_zombie_respawn < 1000) { normal_zombie_respawn = 1000; }
            slow_zombie_respawn = slow_zombie_respawn - slow_respawn_increase; if (slow_zombie_respawn < 1000) { slow_zombie_respawn = 1000; }

            speedy_zombie_speed = speedy_zombie_speed - speedy_speed_increase;
            normal_zombie_speed = normal_zombie_speed - normal_speed_increase;
            slow_zombie_speed = slow_zombie_speed - slow_speed_increase;

            level++;
        }

        //DISPLAY SCORE FUNCTION AND INCREASE DIFICULTY
        function submit_score() {

            if (score > threshold4) {
                if (level < 5) {
                    increaseDificulty();
                }
            } else if (score > threshold3) {
                if (level < 4) {
                    increaseDificulty();
                }
            } else if (score > threshold2) {
                if (level < 3) {
                    increaseDificulty();
                }
            } else if (score > threshold1) {
                if (level < 2) {
                    increaseDificulty();
                }
            }

            if (escaped == end_game) {
                highScore=localStorage['highScore'];
                if (score > highScore) {
                    highScore = score;
                    localStorage['highScore']=highScore;
                }

                var gameOvermessage = "Brains! Top Score: " + highScore;

                $('#speedy_zombie').addClass('stoped').stop();
                $('#normal_zombie1').addClass('stoped').stop();
                $('#normal_zombie2').addClass('stoped').stop();
                $('#slow_zombie').addClass('stoped').stop();
                final_escaped = escaped;
                final_headshot = headshot;
                final_hits = hits;
                final_score = score;
                final_shots = shots;
                ended = true;
                $('#restart').removeClass('nono');
                $('#game_over').html(gameOvermessage);
                $('#game_over_message').html('Zombies are hungry. Don&#39;t let them escape');
            }
            if (ended) {
                $('#score').html(final_score);
                $('#headshots_count').html(final_headshot);
                $('#hits_count').html(final_hits);
                $('#shots_count').html(final_shots);
                $('#escape_count').html(final_escaped);
            } else {
                $('#score').html(score);
                $('#headshots_count').html(headshot);
                $('#hits_count').html(hits);
                $('#shots_count').html(shots);
                $('#escape_count').html(escaped);
            }
        }

        //FUNCTIONS FOR THE ZOMBIES TO APPEAR

        function get_zombie(zombie) {
            var w = $(window).width();
            w = w - 159;
            var posI = Math.floor(Math.random() * w) + 0;
            var posF = Math.floor(Math.random() * w) + 0;
            var respawn = Math.floor(Math.random() * speedy_zombie_respawn) + 1000;
            var zombieName;
            switch (zombie) {
                case 1:
                    zombieName = '#speedy_zombie';
                case 2:
                    zombieName = '#normal_zombie1';
                case 3:
                    zombieName = '#normal_zombie2';
                case 4:
                    zombieName = '#slow_zombie';
            }
            $(zombieName).offset({ left: posI }).delay(respawn).fadeIn('50').animate({ left: posF }, speedy_zombie_speed, escape_zombie(zombie));
        }


        //FUNCTIONS WHEN THE ZOMBIES GET SHOT... I know I know... this can be easier taking a different aproach. I need to study XD

        function shoot_zombie(zombie) {
            switch (zombie) {
                case 1:
                    zombieName = '#speedy_zombie';
                case 2:
                    zombieName = '#normal_zombie1';
                case 3:
                    zombieName = '#normal_zombie2';
                case 4:
                    zombieName = '#slow_zombie';
            }
            $(zombieName).stop().fadeOut('50', get_zombie(zombie));
        }

        //functions for scaped zombies

        function escape_zombie(zombie) {
            switch (zombie) {
                case 1:
                    zombieName = '#speedy_zombie';
                case 2:
                    zombieName = '#normal_zombie1';
                case 3:
                    zombieName = '#normal_zombie2';
                case 4:
                    zombieName = '#slow_zombie';
            }
            escaped++;
            submit_score();
            $(zombieName).stop().fadeOut('50', get_zombie(zombie));
        }

        //START

        get_zombie(1);
        get_zombie(2);
        get_zombie(3);
        get_zombie(4);

        $('#zombie_range').removeClass('nono');

        //EXTRAS?
        var co = "";
        $('body').keydown(function (event) {
            co = co + event.which;
            var codeC = co.search("38384040373937396566");
            if (codeC != -1) {
                if (end_game != 100) {
                    hahaSound.currentTime = 0;
                    hahaSound.play();
                    end_game = 100
                    co = "";
                }
            }
        });

        //RESET HIGH SCORE
        var resetHC = "";
        $('body').keydown(function (event) {
            resetHC = resetHC + event.which;
            //$('#copy_404 h4').html(resetHC)
            var codeR = resetHC.search("8269836984727371728367798269");
            if (codeR != -1) {
                resetHC = "";
                if (localStorage['highScore']!=0) {
                    localStorage['highScore'] = 0;
                    poltergeistSound.currentTime = 0;
                    poltergeistSound.play();
                    alert("High Score Resete! ... Noooo");
                }
            }
        });
        


    }//erase for ie 
    else {
        alert("Internet Explorer?  Seriously... please reconsider.");
        $('#copy_404 h4').html("Oh no. Internet explorer. Why? May I suggest Chrome? <a href='https://www.google.com/intl/en/chrome/browser/' target='_blank'>CLICK HERE</a>")
    }
});