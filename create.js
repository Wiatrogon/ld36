var player;
var platforms;
var cursors;
var jumpButton;

function create() {

    player = game.add.sprite(100, 200, 'player');

    monster1 = game.add.sprite(700, 100, 'monster');
    monster2 = game.add.sprite(700, 400, 'monster');

    game.physics.arcade.enable(player);
    game.physics.arcade.enable(monster1);
    game.physics.arcade.enable(monster2);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    monster1.body.collideWorldBounds = true;
    monster1.body.gravity.y = 500;

    monster2.body.collideWorldBounds = true;
    monster2.body.gravity.y = 500;

    platforms = game.add.physicsGroup();

    platforms.create(500, 150, 'platform');
    platforms.create(-200, 300, 'platform');
    platforms.create(400, 450, 'platform');
    platforms.create(100, 100, 'metalface');

    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}
