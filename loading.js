var loading = {
    create : function() {
        var labels = [
            'use arrow keys to move',
            'hold z to rewind',
            'press x to stop',
            'press c to play',
            'hold v to fast forward'
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
            game.state.start('level_one');
        }
        play.onDown.addOnce(_play);
    }
}
