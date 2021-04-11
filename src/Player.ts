import { DpadDirections } from "./utils/hud";

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
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBodySize(30, 10).setOffset(0, 20).setScale(.7);

    // this.body.onCollide = true;
    // scene.physics.world.on(Phaser.Physics.Arcade.Events.COLLIDE, this.handleTileCollision, this);
  }

  // private handleTileCollision(gameObject: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile) {
  //   if(gameObject != this) return;
  //   console.log(tile);
  // }

  update(
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    dpadDirections: DpadDirections
  ) {
    if (!cursors) return;
    const speed = 175;
    const prevVelocity = this.body.velocity.clone();

    // Stop any previous movement from the last frame
    this.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown || dpadDirections.left) {
      this.setVelocityX(-speed);
    } else if (cursors.right.isDown || dpadDirections.right) {
      this.setVelocityX(speed);
    }

    // Vertical movement
    if (cursors.up.isDown || dpadDirections.up) {
      this.setVelocityY(-speed);
    } else if (cursors.down.isDown || dpadDirections.down) {
      this.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (cursors.left.isDown || dpadDirections.left) {
      this.anims.play("player-left", true);
    } else if (cursors.right.isDown || dpadDirections.right) {
      this.anims.play("player-right", true);
    } else if (cursors.up.isDown || dpadDirections.up) {
      this.anims.play("player-up", true);
    } else if (cursors.down.isDown || dpadDirections.down) {
      this.anims.play("player-down", true);
    } else {
      this.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0) this.setTexture(this.texture.key, "player-left.000");
      else if (prevVelocity.x > 0)
        this.setTexture(this.texture.key, "player-right.000");
      else if (prevVelocity.y < 0)
        this.setTexture(this.texture.key, "player-up.000");
      else if (prevVelocity.y > 0)
        this.setTexture(this.texture.key, "player-down.000");
    }
  }
}
