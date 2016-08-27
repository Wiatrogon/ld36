function update () {

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

    if (metalface.bottom > 500) {
        metalface.body.velocity.y = -50;
    }
    else if (metalface.top < 100) {
        metalface.body.velocity.y = 50;
    }

    if (monster1.left < 600) {
        monster1.body.velocity.x = 50;
        monster1.scale.x = 1;
    }
    else if (monster1.right > 700) {
        monster1.body.velocity.x = -50;
        monster1.scale.x = -1;
    }

    if (monster2.left < 500) {
        monster2.body.velocity.x = 50;
        monster2.scale.x = 1;
    }
    else if (monster2.right > 750) {
        monster2.body.velocity.x = -50;
        monster2.scale.x = -1;
    }
}
