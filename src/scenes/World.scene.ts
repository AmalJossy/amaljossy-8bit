import village_png from "../assets/tilesets/village_atlas_16x.png";
import work_png from "../assets/tilesets/work.png";
import village_map from "../assets/tilemaps/world.json";
import misa_atlas from "../assets/sprites/misa.png";
import misa_atlas_json from "../assets/sprites/misa.json";
import Player, { PlayerTexture } from "../Player";
import { createPlayerAnims } from "../utils/anims";
import { sceneEvents } from "../utils/eventEmitter";
import { Scene } from "phaser";

export default class WorldScene extends Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  signGroup: Phaser.Physics.Arcade.StaticGroup;
  signBoards: Phaser.Types.Tilemaps.TiledObject[];

  constructor() {
    super({});
  }
  preload() {
    this.load.image("village_png", village_png);
    this.load.image("work_png", work_png);
    this.load.tilemapTiledJSON("village_map", village_map);
    this.load.atlas("misa_atlas", misa_atlas, misa_atlas_json);
  }
  create() {
    this.scene.run("HUD");
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
    const objectLayer = map.getObjectLayer("Objects");

    aboveLayer.setDepth(5);

    worldLayer.setCollisionByProperty({ collides: true });
    aboveLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );
    this.player = new Player(
      this,
      spawnPoint.x,
      spawnPoint.y,
      "misa_atlas",
      "misa-front"
    );
    createPlayerAnims(this.anims);
    this.physics.add.collider(this.player, worldLayer);

    this.signGroup = this.physics.add.staticGroup();

    objectLayer.objects.forEach((obj) => {
      if (obj.type === "Sign") {
        const sign = this.signGroup.create(obj.x, obj.y, null);
        sign.properties = obj.properties;
        sign.alpha = 0;
      }
    });

    // this.initNarration();

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update(this.cursors);
    this.physics.world.overlap(this.player, this.signGroup, this.showSignMessage);
  }

  // initNarration() {
  //   this.narration = {
  //     currentMessage: null,
  //     messageQueue: [],
  //     text: this.add.text(
  //       this.player.sprite.x,
  //       this.player.sprite.y - 32,
  //       "Hi I am amal"
  //     ),
  //     push(message: string) {
  //       this.messageQueue.push(message);
  //     },
  //     show() {
  //       this.currentMessage=this.messageQueue[0] || null;
  //       setTimeout(() => {
  //         this.messageQueue.shift();
  //       }, 3000);
  //     },
  //   };
  // }
  
  showSignMessage(sprite,gameObject) {
    const message=gameObject.properties.find((o) => o.name === "message")?.value;
    sceneEvents.emit("message/new",message)
    console.log({ message });
  }
}
