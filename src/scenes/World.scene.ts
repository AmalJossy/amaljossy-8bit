import Player, { PlayerTexture } from "../Player";
import { createPlayerAnims } from "../utils/anims";
import { Scene } from "phaser";
import { DpadDirections, initDpadForTouch, writeMessage } from "../utils/hud";

export default class WorldScene extends Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  signGroup: Phaser.Physics.Arcade.StaticGroup;
  signBoards: Phaser.Types.Tilemaps.TiledObject[];
  message: string;
  dpadDirections: DpadDirections;
  screenGroup: Phaser.Physics.Arcade.StaticGroup;
  messageType: any;

  constructor() {
    super({ key: "world" });
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
      "player_atlas",
      "player-front.000"
    );
    createPlayerAnims(this.anims);
    this.physics.add.collider(this.player, worldLayer);

    this.signGroup = this.physics.add.staticGroup();
    this.screenGroup = this.physics.add.staticGroup();

    objectLayer.objects.forEach((obj) => {
      if (obj.type === "Sign") {
        const sign: Phaser.Physics.Arcade.Sprite = this.signGroup.create(
          obj.x + 8,
          obj.y + 8,
          null
        );
        // @ts-ignore
        sign.properties = obj.properties;
        sign.alpha = 0;
      }
      if (obj.type == "Screen") {
        let texture = null;

        switch (obj.name) {
          case "Screen1":
            texture = "arth_png";
            break;
          case "Screen2":
            texture = "music_png";
            break;
          case "Screen3":
            texture = "aa_png";
            break;
        }
        console.log({ obj, texture });
        const screen: Phaser.Physics.Arcade.Sprite = this.screenGroup
          .create(obj.x, obj.y, texture)
          .setDisplaySize(60, 26)
          .setDisplayOrigin(0.5, 0.5);
        if (!texture) screen.alpha = 0;
        // console.log(screen);
        screen.depth = 6;
      }
    });

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();
    // @ts-ignore
    this.dpadDirections = initDpadForTouch(this.game.config.hasTouch);
  }

  update() {
    this.player.update(this.cursors, this.dpadDirections);
    this.physics.world.overlap(
      this.player,
      this.signGroup,
      this.setSignMessage,
      null,
      this
    );
    if (this.message !== undefined) this.showSignMessage();
  }

  // @ts-ignore //TODO optimize, debounce ?
  setSignMessage(sprite, gameObject) {
    this.message = gameObject.properties.find(
      // @ts-ignore
      (o) => o.name === "message"
    )?.value;
    this.messageType = gameObject.properties.find(
      // @ts-ignore
      (o) => o.name === "contentType"
    )?.value;
  }
  showSignMessage() {
    writeMessage(this.message, this.messageType);
    if (this.message !== "") {
      this.message = "";
      this.messageType = "text";
    }
  }
}
