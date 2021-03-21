import Phaser from "phaser";
import HUD from "./scenes/HUD.scene";

import WorldScene from "./scenes/World.scene";

const Config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  parent: "game-container",
  pixelArt: true,

  // Sets game scaling
  scale: {
      mode: Phaser.Scale.FIT,               // Fit to window
      autoCenter: Phaser.Scale.CENTER_BOTH  // Center vertically and horizontally
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [WorldScene, HUD],
};

export default new Phaser.Game(Config);
