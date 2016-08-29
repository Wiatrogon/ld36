var loading = {
    preload: function(){

        game.load.image('player', 'sprites/player.png');
        game.load.image('platform', 'sprites/platform.png');
        game.load.image('monster', 'sprites/monster.png');
        game.load.spritesheet('metalface', 'sprites/metalface78x92.png', 78, 92);
        game.load.image('exit', 'sprites/exit.png');

        game.load.audio('neon_skies', 'music/Lee_Rosevere_-_02_-_Neon_Skies.mp3');
        game.load.audio('star_song', 'music/Lee_Rosevere_-_05_-_Star_Song.mp3');

        cursors = game.input.keyboard.createCursorKeys();
        rewind = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        stop = game.input.keyboard.addKey(Phaser.Keyboard.X);
        play = game.input.keyboard.addKey(Phaser.Keyboard.C);
        fast_forward = game.input.keyboard.addKey(Phaser.Keyboard.V);

    },
    create: function() {

        var labels = [
            'you came into possession of a piece of ancient technology',
            'known as portable audio cassette player',
            'which gives you the power to control time',
            '',
            'use arrow keys to move',
            'hold z to rewind',
            'press x to stop',
            'press c to play',
            'hold v to fast forward',
            '',
            'music is composed by Lee Rosevere',
            '(http://freemusicarchive.org/music/Lee_Rosevere/)',
            'and is used under permise of creative commons license',
            'https://creativecommons.org/licenses/by-nc/4.0/'
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
