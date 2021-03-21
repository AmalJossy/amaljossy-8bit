import { sceneEvents } from "../utils/eventEmitter";

export default class HUD extends Phaser.Scene {
  text: Phaser.GameObjects.Text;
  constructor() {
    super({
      key: "HUD",
    });
  }

  create() {
    this.text = this.add.text(10, 400, "Hello ?", {
      color: "#161616",
    });
    sceneEvents.on("message/new", this.setMessage, this);
  }

  setMessage(message: string) {
    this.text.text = message;
  }
}
