var player;
var metalface;
var platforms;
var exit;

var music;
var time;
var position;

var marker;

var level_two = {
    preload: function () {
        game.stage.backgroundColor = '#182d3b';
    },
    create: function () {

        time = game.add.text(0, 0, 'foo');
        position = game.add.text(0, 20, 'bar');

        if (typeof music === 'undefined' || music === null) {
            music = game.add.audio('star_song');
        }

        music.play();
        marker = 0;

        player = game.add.sprite(100, 300, 'player');
        player.anchor.setTo(.5, -1);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;

        platforms = game.add.physicsGroup();

        platforms.create(-200, 400, 'platform');
        platforms.create(400, 200, 'platform');

        metalface = game.add.sprite(310, 100, 'metalface');
        blink = metalface.animations.add('blink');
        metalface.animations.play('blink', 1, false);
        platforms.add(metalface);

        platforms.setAll('body.immovable', true);

        metalface.body.velocity.y = 5;

        function _reverse () {
            metalface.body.velocity.y *= -1;
        }

        function _accelerate () {
            metalface.body.velocity.y *= 10;
        }

        var _dir_metalface = Math.sign(metalface.body.velocity.y);

        function _play () {
            metalface.body.velocity.y = _dir_metalface * 5;
        }

        function _stop () {
            if (metalface.body.velocity.y != 0) {
                _dir_metalface = Math.sign(metalface.body.velocity.y);
            }
            metalface.body.velocity.y = 0;
        }

        function _pause_music () {
            if (music.isPlaying) {
                music.pause();
                marker += music.currentTime;
            }
        }

        function _play_music () {
            var _marker = marker / 1000;
            music.addMarker('resume', _marker, music.duration - _marker);
            music.stop();
            music.play('resume');
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

        exit = game.add.sprite(700, 168, 'exit');
        game.physics.arcade.enable(exit);
        exit.body.immovable = true;
    },
    update: function () {
        time.text = game.time.now;
        position.text = marker;

        function next_level () {
            game.state.start('level_two');
        }

        if (Math.sign(player.body.velocity.x) * player.scale.x < 0)
        {
            player.scale.x = Math.sign(player.body.velocity.x);
        }

        game.physics.arcade.collide(player, platforms);
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

        if (metalface.bottom > 500 && metalface.body.velocity.y > 0
            || metalface.top < 100 && metalface.body.velocity.y < 0) {
            metalface.body.velocity.y *= -1;
        }

        if (rewind.isDown) {
            marker -= 2*game.time.physicsElapsedMS;
            marker = Math.max(marker, 0);
        }

        if (fast_forward.isDown) {
            marker += 2*game.time.physicsElapsedMS;
            marker = Math.min(marker, music.durationMS);
        }
    }
};
