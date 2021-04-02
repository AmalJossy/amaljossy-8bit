import village_png from "../assets/tilesets/village_atlas_16x.png";
import work_png from "../assets/tilesets/work.png";
import village_map from "../assets/tilemaps/world.json";
import player_atlas from "../assets/sprites/player.png";
import player_atlas_json from "../assets/sprites/player.json";
import Player, { PlayerTexture } from "../Player";
import { createPlayerAnims } from "../utils/anims";
import { Scene } from "phaser";
import { writeMessage } from "../utils/hud";

export default class WorldScene extends Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  signGroup: Phaser.Physics.Arcade.StaticGroup;
  signBoards: Phaser.Types.Tilemaps.TiledObject[];
  message: string;

  constructor() {
    super({ key: "world" });
  }
  preload() {
    this.load.image("village_png", village_png);
    this.load.image("work_png", work_png);
    this.load.tilemapTiledJSON("village_map", village_map);
    this.load.atlas("player_atlas", player_atlas, player_atlas_json);
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
      "player-front"
    );
    createPlayerAnims(this.anims);
    this.physics.add.collider(this.player, worldLayer);

    this.signGroup = this.physics.add.staticGroup();

    objectLayer.objects.forEach((obj) => {
      if (obj.type === "Sign") {
        const sign = this.signGroup.create(obj.x, obj.y, null);
        sign.properties = obj.properties;
        sign.alpha = 0;
        console.log(sign);
      }
    });

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update(this.cursors);
    this.physics.world.overlap(
      this.player,
      this.signGroup,
      this.setSignMessage,
      null,
      this
    );
    if(this.message!==undefined)
      this.showSignMessage();
  }

  // @ts-ignore //TODO optimize, debounce ?
  setSignMessage(sprite, gameObject) {
    this.message = gameObject.properties.find(
      (o) => o.name === "message"
    )?.value;
  }
  showSignMessage() {
    writeMessage(this.message);
    if(this.message!=="")
      this.message=""
  }
}
