import { Scene } from "phaser";

import village_png from "../assets/tilesets/village_atlas_16x.png";
import work_png from "../assets/tilesets/work.png";
import village_map from "../assets/tilemaps/world.json";
import misa_atlas from "../assets/sprites/misa.png";
import misa_atlas_json from "../assets/sprites/misa.json";
import arth_png from "../assets/textures/arth.png";
import music_png from "../assets/textures/music.png";
import aa_png from "../assets/textures/aa.png";

export default class Preload extends Scene {
  text: Phaser.GameObjects.Text;
  constructor() {
    super({ key: "preload" });
  }

  preload() {
    this.load.image("village_png", village_png);
    this.load.image("work_png", work_png);
    this.load.tilemapTiledJSON("village_map", village_map);
    this.load.atlas("misa_atlas", misa_atlas, misa_atlas_json);
    this.load.image("arth_png", arth_png);
    this.load.image("music_png", music_png);
    this.load.image("aa_png", aa_png);
  }

  update() {
    // @ts-ignore
    if (this.game.config.isStarting) {
      this.scene.start("world")};
  }
}
