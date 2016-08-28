var player;
var metalface;
var monster1, monster2;
var monsters;
var platforms;

var level_one = {
    preload: function () {

        game.stage.backgroundColor = '#85b5e1';

        game.load.baseURL = 'http://examples.phaser.io/assets/';
        game.load.crossOrigin = 'anonymous';

        game.load.image('player', 'sprites/phaser-dude.png');
        game.load.image('platform', 'sprites/platform.png');

        game.load.spritesheet('monster', 'sprites/metalslug_monster39x40.png', 39, 40);
        game.load.spritesheet('metalface', 'sprites/metalface78x92.png', 78, 92);

    },
    create: function () {

        player = game.add.sprite(100, 200, 'player');
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;

        monsters = game.add.physicsGroup();

        function add_monster (x, y) {
            monster = game.add.sprite(x, y, 'monster');
            monster.anchor.setTo(.5, 1);
            monster.animations.add('walk');
            monster.animations.play('walk', 15, true);
            game.physics.arcade.enable(monster);
            monster.body.collideWorldBounds = true;
            monster.body.gravity.y = 500;
            monsters.add(monster);
            return monster;
        }

        monster1 = add_monster(700, 100);
        monster1.body.velocity.x = 50;
        monster2 = add_monster(700, 400);
        monster2.body.velocity.x = 50;

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

        cursors = game.input.keyboard.createCursorKeys();
        rewind = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        stop = game.input.keyboard.addKey(Phaser.Keyboard.X);
        play = game.input.keyboard.addKey(Phaser.Keyboard.C);
        fast_forward = game.input.keyboard.addKey(Phaser.Keyboard.V);

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

        rewind.onDown.add(_play);
        rewind.onDown.add(_reverse);
        rewind.onDown.add(_accelerate);

        rewind.onUp.add(_reverse);
        rewind.onUp.add(_stop);

        stop.onDown.add(_stop);

        play.onDown.add(_play);

        fast_forward.onDown.add(_play);
        fast_forward.onDown.add(_accelerate);

        fast_forward.onUp.add(_stop);
    },
    update: function () {

        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(monsters, platforms);

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
    }
};
