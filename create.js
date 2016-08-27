var player;
var metalface;
var monster1, monster2;
var monsters;
var platforms;
var cursors;
var rewind, stop, play, fast_forward;

function create() {

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
}
