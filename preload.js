function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/platform.png');

    game.load.spritesheet('monster', 'sprites/metalslug_monster39x40.png', 39, 40);
    game.load.spritesheet('metalface', 'sprites/metalface78x92.png', 78, 92);

}
