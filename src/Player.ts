export interface PlayerTexture {
  key: string;
  front: string;
  back: string;
  right: string;
  left: string;
  walkFront: string;
  walkBack: string;
  walkRight: string;
  walkLeft: string;
}
export default class Player {
  scene: Phaser.Scene;
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  texture: PlayerTexture;

  constructor(
    scene: Phaser.Scene,
    texture: PlayerTexture,
    x: number,
    y: number
  ) {
    this.scene = scene;
    this.texture = texture;

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .sprite(x, y, texture.key, texture.front)
      .setSize(30, 40)
      .setOffset(0, 24)
      .setScale(0.5);

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // Create the animations we need from the player spritesheet
    const anims = this.scene.anims;
    anims.create({
      key: texture.walkLeft,
      frames: anims.generateFrameNames(texture.key, {
        prefix: `${texture.walkLeft}.`,
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: texture.walkRight,
      frames: anims.generateFrameNames(texture.key, {
        prefix: `${texture.walkRight}.`,
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: texture.walkFront,
      frames: anims.generateFrameNames(texture.key, {
        prefix: `${texture.walkFront}.`,
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: texture.walkBack,
      frames: anims.generateFrameNames(texture.key, {
        prefix: `${texture.walkBack}.`,
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    const speed = 175;
    const prevVelocity = this.sprite.body.velocity.clone();

    // Stop any previous movement from the last frame
    this.sprite.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.sprite.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.sprite.body.setVelocityX(speed);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.sprite.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.sprite.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.sprite.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.sprite.anims.play(this.texture.walkLeft, true);
    } else if (this.cursors.right.isDown) {
      this.sprite.anims.play(this.texture.walkRight, true);
    } else if (this.cursors.up.isDown) {
      this.sprite.anims.play(this.texture.walkBack, true);
    } else if (this.cursors.down.isDown) {
      this.sprite.anims.play(this.texture.walkFront, true);
    } else {
      this.sprite.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0)
        this.sprite.setTexture(this.texture.key, this.texture.left);
      else if (prevVelocity.x > 0)
        this.sprite.setTexture(this.texture.key, this.texture.right);
      else if (prevVelocity.y < 0)
        this.sprite.setTexture(this.texture.key, this.texture.back);
      else if (prevVelocity.y > 0)
        this.sprite.setTexture(this.texture.key, this.texture.front);
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
