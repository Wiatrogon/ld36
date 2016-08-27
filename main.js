var game;

function main() {
    game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        create : function() {
            var labels = [
                'use arrow keys to move',
                'hold z == rewind',
                'press x == stop',
                'press c == play',
                'hold v == fast forward'
            ];
            var label_config = {
                font: '14px Arial',
                fill: '#ccc'
            };
            for (var i in labels) {
                game.add.text(100, 100+20*i, labels[i], label_config);
            }
            var play = game.input.keyboard.addKey(Phaser.Keyboard.C);

            function _play () {
                game.state.start('play');
            }
            play.onDown.addOnce(_play);
        }
    });

    game.state.add('play', {preload:preload, create:create, update:update});
}
