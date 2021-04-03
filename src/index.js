import Phaser from "phaser";
import Preload from "./scenes/Preload.scene";

import WorldScene from "./scenes/World.scene";

const Config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  pixelArt: true,

  // Sets game scaling
  scale: {
    mode: Phaser.Scale.ENVELOP, // Fit to window
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center vertically and horizontally
    parent: "game-area",
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [Preload, WorldScene],
};

new Phaser.Game(Config);
