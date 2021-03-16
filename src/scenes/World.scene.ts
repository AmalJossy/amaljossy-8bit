import village_png from "../assets/tilesets/village_atlas_16x.png";
import work_png from "../assets/tilesets/work.png";
import village_map from "../assets/tilemaps/world.json";
import misa_atlas from "../assets/sprites/misa.png";
import misa_atlas_json from "../assets/sprites/misa.json";
import Player, { PlayerTexture } from "../Player";

const misaTexture: PlayerTexture = {
  key: "misa_atlas",
  front: "misa-front",
  back: "misa-back",
  right: "misa-right",
  left: "misa-left",
  walkFront: "misa-front-walk",
  walkBack: "misa-back-walk",
  walkRight: "misa-right-walk",
  walkLeft: "misa-left-walk",
};

export default class WorldScene extends Phaser.Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  signGroup: Phaser.Physics.Arcade.StaticGroup;
  constructor() {
    super({});
  }
  preload() {
    this.load.image("village_png", village_png);
    this.load.image("work_png", work_png);
    this.load.tilemapTiledJSON("village_map", village_map);
    this.load.atlas(misaTexture.key, misa_atlas, misa_atlas_json);
  }
  create() {
    const map = this.make.tilemap({ key: "village_map" });
    const village_tileset = map.addTilesetImage(
      "village_atlas_16x",
      "village_png"
    );
    const work_tileset = map.addTilesetImage("work", "work_png");
    const belowLayer = map.createLayer(
      "Below Player",
      [village_tileset, work_tileset],
      0,
      0
    );
    const worldLayer = map.createLayer(
      "World",
      [village_tileset, work_tileset],
      0,
      0
    );
    const aboveLayer = map.createLayer(
      "Above Player",
      [village_tileset, work_tileset],
      0,
      0
    );

    aboveLayer.setDepth(5);

    worldLayer.setCollisionByProperty({ collides: true });
    aboveLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );

    this.player = new Player(this, misaTexture, spawnPoint.x, spawnPoint.y);

    // this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player.sprite, worldLayer);

    this.signGroup = this.physics.add.staticGroup();
    worldLayer.forEachTile((tile) => {
      if (tile.index == 60) {
        const x = tile.getCenterX();
        const y = tile.getCenterY();

        const sign = this.signGroup.create(x, y, null);
        sign.alpha = 0;
        sign.text = "" + x;
        // worldLayer.removeTileAt(tile.x, tile.y);
      }
    });

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // worldLayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    // });

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

    camera.startFollow(this.player.sprite);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update();
    if (this.physics.world.overlap(this.player.sprite, this.signGroup)) {
      console.log(this.signGroup);
      // this.player.destroy();
      // this.scene.restart();
    }
  }
}
