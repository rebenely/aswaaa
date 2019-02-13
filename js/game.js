var config = {
    type: Phaser.AUTO,
    parent: "content",
    width: 720,
    height: 480,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
          debug: true,
           debugShowBody: true,
           debugShowStaticBody: true,
            debugShowVelocity: true,
            gravity: { y: 0 }
        }
    },
    scene: [ MainMenuScene ]
};

var game = new Phaser.Game(config);
