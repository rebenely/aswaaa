class MainMenuScene extends Phaser.Scene {

    constructor () {
        super('MainMenuScene');
    }

    preload () {
      this.load.image('forest', 'assets/map/tilesets.png');
      this.load.spritesheet('human_walk', 'assets/spritesheets/baseZwalkcycle.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {

      var level = [ ];

      for(let i = 0; i < 30; i++) {
        var row = [];
          for(let j = 0; j < 45; j++) {
            row.push(0);
          }
        level.push(row);
      }

      for(let j = 0; j < 200; j++) {
        let y = Phaser.Math.FloorTo(Math.random() * 45);
        let x = Phaser.Math.FloorTo(Math.random() * 30);
        level[x][y] = 2;
      }

      this.physics.world.setBounds(0, 0, 1440, 960);

      var map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
      var tiles = map.addTilesetImage('forest');
      var layer = map.createStaticLayer(0, tiles, 0, 0);

      var hello = this.add.text(game.config.width/2, game.config.height/2, 'Hello').setOrigin(0.5);

      this.anims.create( {
        key: 'right',
        frames: this.anims.generateFrameNumbers('human_walk'),
        frameRate: 12,
        yoyo: false,
        repeat: -1
      });


      this.player = this.physics.add.sprite(75, 75, 'human_walk').setOrigin(0.5);
      this.player.anims.play('right');

      this.cursors = this.input.keyboard.createCursorKeys();
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

      map.setCollision(2);
      this.physics.add.collider(this.player, layer);

      this.player.setCollideWorldBounds(true);
      this.player.setSize(16, 25, true);
      this.cameras.main.zoom = 1.5;

      var BetweenPoints = Phaser.Math.Angle.BetweenPoints;
      var SetToAngle = Phaser.Geom.Line.SetToAngle;
      var velocityFromRotation = this.physics.velocityFromRotation;

      this.gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 1, color: 0xffdd00, alpha: 0.5 } });
      this.line = new Phaser.Geom.Line(100, 500, 700, 100);
      this.input.on('pointermove', function (pointer) {

      }, this);

      // var debugGraphics = this.add.graphics();
      // map.renderDebug(debugGraphics, {
      //      tileColor: null, // Non-colliding tiles
      //      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
      //      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
      //  });


    }

      update (time, delta) {

        let cursor = game.input.mousePointer;
        console.log((cursor.worldX), (cursor.worldY ));
        let angle = Phaser.Math.Angle.Between(this.player.x , this.player.y, (cursor.worldX), (cursor.worldY));

        Phaser.Geom.Line.SetToAngle(this.line, this.player.x, this.player.y, angle,Phaser.Math.Distance.Between(cursor.worldX, cursor.worldY, this.player.x, this.player.y));

        this.gfx.clear().strokeLineShape(this.line);



        this.player.body.setVelocity(0);
        this.line.x1 = this.player.x;
        this.line.y1 = this.player.y;
        this.gfx.clear().strokeLineShape(this.line);
        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-100);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(100);
        }
        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-100);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(100);
        }

        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown) {
            this.player.flipX = true;
            this.player.anims.play('right', true);
        } else if (this.cursors.right.isDown) {
            this.player.flipX = false;
            this.player.anims.play('right', true);
        } else  if (this.cursors.up.isDown) {
            this.player.anims.play('right', true);
        } else  if (this.cursors.down.isDown) {
            this.player.anims.play('right', true);
        } else {
            this.player.anims.stop();
        }
      }

}
