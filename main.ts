sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    bola.setVelocity(bola.vx, -50)
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    tiles.setTileAt(location, myTiles.transparency16)
    tiles.setWallAt(location, false)
    if (bola.y >= scene.screenHeight()) {
        info.changeLifeBy(-1)
        if (info.life() == 0) {
            game.over(false)
        }
        bola.destroy()
        sacar_bola()
    } else {
        if (tiles.getTilesByType(sprites.builtin.brick).length == 0) {
            game.over(true)
        }
    }
})
function sacar_bola () {
    bola = sprites.create(img`
        . c c c c . 
        c c 5 5 c c 
        c 5 5 5 5 c 
        c 5 5 5 5 c 
        c c 5 5 c c 
        . c c c c . 
        `, SpriteKind.Projectile)
    bola.setPosition(80, 85)
    bola.setVelocity(50, 50)
    bola.setFlag(SpriteFlag.BounceOnWall, true)
}
let bola: Sprite = null
info.setLife(3)
scene.setBackgroundColor(1)
tiles.setTilemap(tiles.createTilemap(hex`0a0008000000000000000000000000010101010101010100000101010101010101000001010101010101010000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
    . . . . . . . . . . 
    . 2 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 2 2 2 . 
    . 2 2 2 2 2 2 2 2 . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    `, [myTiles.transparency16,sprites.builtin.brick], TileScale.Sixteen))
let nave = sprites.create(img`
    . c c b b b b b b b b b b c c . 
    c c c d d d d d d d d d d c c c 
    c c c d d d d d d d d d d c c c 
    c c c d d d d d d d d d d c c c 
    c c c d d d d d d d d d d c c c 
    . c c a a a a a a a a a a c c . 
    `, SpriteKind.Player)
controller.moveSprite(nave, 100, 0)
nave.setPosition(80, 110)
sacar_bola()
