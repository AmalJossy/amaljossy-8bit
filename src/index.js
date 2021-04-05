import Phaser from "phaser";
import Preload from "./scenes/Preload.scene";

import WorldScene from "./scenes/World.scene";

const Config = {
  type: Phaser.AUTO,
  width: window.innerWidth*.52, // no definitive guides
  height:  window.innerHeight*.52, // value from trial and error
  pixelArt: true,

  // Sets game scaling
  scale: {
    mode: Phaser.Scale.FIT, // Fit to window
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

let game = new Phaser.Game(Config);

// custom config
game.config.hasTouch = false;
game.config.isStarting = false;

window.addEventListener(
  "touchstart",
  () => {
    game.config.hasTouch = true;
  },
  { once: true }
);

document.getElementById("intro__ok").onclick = () => {
  document.getElementById("intro").classList.add("not-displayed");
  game.config.isStarting = true;
};
