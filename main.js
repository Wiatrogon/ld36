var game;
var cursors;
var rewind, stop, play, fast_forward;

function main() {
    game = new Phaser.Game(800, 600, Phaser.AUTO, '');

    game.state.add('loading', loading);
    game.state.add('level_one', level_one);
    game.state.add('level_two', level_one);

    game.state.start('loading');
}
