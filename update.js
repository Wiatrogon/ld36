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
        || monster2.right > 750 && monster2.body.velocity.x > 0) {
        monster2.body.velocity.x *= -1;
        monster2.scale.x *= -1;
    }
}
