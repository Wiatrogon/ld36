var player;
var metalface;
var monster1, monster2;
var monsters;
var platforms;
var exit;

var music;
var time;
var position;

var marker;

var level_one = {
    preload: function () {
        game.stage.backgroundColor = '#182d3b';
        
    },
    create: function () {

        time = game.add.text(0, 0, 'foo');
        position = game.add.text(0, 20, 'bar');

        if (typeof music === 'undefined' || music === null) {
            music = game.add.audio('neon_skies');
        }

        music.play();
        marker = 0;

        sfx_play = game.add.audio('sfx_play');
        sfx_stop = game.add.audio('sfx_stop');
        sfx_rew = sfx_ff = game.add.audio('sfx_rew_ff');

        player = game.add.sprite(100, 200, 'player');
        player.anchor.setTo(.5, -1);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;

        monsters = game.add.physicsGroup();

        function add_monster (x, y) {

            monster = game.add.sprite(x, y, 'monster');
            monster.anchor.setTo(.5, 1);
            game.physics.arcade.enable(monster);
            monster.body.collideWorldBounds = true;
            monster.body.velocity.x = 50;
            monster.body.gravity.y = 500;
            monsters.add(monster);

            return monster;

        }

        monster1 = add_monster(700, 100);
        monster2 = add_monster(700, 400);

        platforms = game.add.physicsGroup();

        platforms.create(500, 150, 'platform');
        platforms.create(-200, 300, 'platform');
        platforms.create(400, 450, 'platform');

        metalface = game.add.sprite(310, 100, 'metalface');
        blink = metalface.animations.add('blink');
        metalface.animations.play('blink', 1, false);
        platforms.add(metalface);

        platforms.setAll('body.immovable', true);

        metalface.body.velocity.y = 50;

        function _reverse () {
            metalface.body.velocity.y *= -1;
            monster1.body.velocity.x *= -1;
            monster2.body.velocity.x *= -1;
        }

        function _accelerate () {
            metalface.body.velocity.y *= 10;
            monster1.body.velocity.x *= 10;
            monster2.body.velocity.x *= 10;
        }

        var _dir_metalface = Math.sign(metalface.body.velocity.y);

        function _play () {
            metalface.body.velocity.y = _dir_metalface * 50;
            monster1.body.velocity.x = monster1.scale.x * 50;
            monster2.body.velocity.x = monster2.scale.x * 50;
        }

        function _stop () {
            if (metalface.body.velocity.y != 0) {
                _dir_metalface = Math.sign(metalface.body.velocity.y);
            }
            metalface.body.velocity.y = 0;
            monster1.body.velocity.x = 0;
            monster2.body.velocity.x = 0;
        }

        function _pause_music () {
            if (music.isPlaying) {
                sfx_stop.play();
                music.pause();
                marker += music.currentTime;
            }
        }

        function _play_music () {
            if (!music.isPlaying) {
                sfx_play.play();
                var _marker = marker / 1000;
                music.addMarker('resume', _marker, music.duration - _marker);
                music.stop();
                music.play('resume');
            }
        }

        rewind.onDown.add(_pause_music);
        rewind.onDown.add(_play);
        rewind.onDown.add(_reverse);
        rewind.onDown.add(_accelerate);

        rewind.onUp.add(_reverse);
        rewind.onUp.add(_stop);

        stop.onDown.add(_stop);
        stop.onDown.add(_pause_music);

        play.onDown.add(_play);
        play.onDown.add(_play_music);

        fast_forward.onDown.add(_pause_music);
        fast_forward.onDown.add(_play);
        fast_forward.onDown.add(_accelerate);

        fast_forward.onUp.add(_stop);

        exit = game.add.sprite(700, 567, 'exit');
        game.physics.arcade.enable(exit);
        exit.body.immovable = true;
    },
    update: function () {
        time.text = game.time.now;
        position.text = marker;

        function next_level () {
            game.state.start('level_two');
        }

        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(monsters, platforms);
        game.physics.arcade.collide(player, exit, next_level);

        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -250;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 250;
        }

        if (cursors.up.isDown && (player.body.onFloor() || player.body.touching.down))
        {
            player.body.velocity.y = -400;
        }

        if (Math.sign(player.body.velocity.x) * player.scale.x < 0)
        {
            player.scale.x = Math.sign(player.body.velocity.x);
        }

        if (metalface.bottom > 500 && metalface.body.velocity.y > 0
            || metalface.top < 100 && metalface.body.velocity.y < 0) {
            metalface.body.velocity.y *= -1;
        }

        if (monster1.left < 600 && monster1.body.velocity.x < 0
            || monster1.right > 700 && monster1.body.velocity.x > 0) {
            monster1.body.velocity.x *= -1;
            monster1.scale.x *= -1;
        }

        if (monster2.left < 500 && monster2.body.velocity.x < 0
            || monster2.right > 700 && monster2.body.velocity.x > 0) {
            monster2.body.velocity.x *= -1;
            monster2.scale.x *= -1;
        }

        if (rewind.isDown) {
            marker -= 2*game.time.physicsElapsedMS;
            marker = Math.max(marker, 0);
        }

        if (fast_forward.isDown) {
            marker += 2*game.time.physicsElapsedMS;
            marker = Math.min(marker, music.durationMS);
        }
    },
    shutdown: function() {
        music.stop();
    }
};
