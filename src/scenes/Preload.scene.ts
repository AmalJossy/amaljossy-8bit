import { Scene } from "phaser";

import village_png from "../assets/tilesets/village_atlas_16x.png";
import work_png from "../assets/tilesets/work.png";
import village_map from "../assets/tilemaps/world.json";
import misa_atlas from "../assets/sprites/misa.png";
import misa_atlas_json from "../assets/sprites/misa.json";

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
  }
  create() {
    this.text = this.add.text(32, 32, "Click to start load", {
      color: "#ffffff",
    });
    setTimeout(() => {
      this.scene.start("world");
    }, 3000);
  }

}
