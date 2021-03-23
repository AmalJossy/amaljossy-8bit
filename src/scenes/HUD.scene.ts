import { Scene } from "phaser";
import { sceneEvents } from "../utils/eventEmitter";

export default class HUD extends Scene {
  text: Phaser.GameObjects.Text;
  textBox: Phaser.GameObjects.Rectangle;
  constructor() {
    super({
      key: "HUD",
    });
  }

  create() {
    var style = { fill: '#161616', align: 'left', wordWrap: { width: 600, useAdvancedWrap: true } };
    this.textBox = this.add.rectangle(400,410,640,60,0xffffff,0);
    this.text = this.add.text(100, 400, "", style);
    sceneEvents.on("message/new", this.setMessage, this);
  }

  setMessage(message: string) {
    this.text.text = message;
    if(message){
      this.textBox.fillAlpha=.8
    }else{
      this.textBox.fillAlpha=0;
    }
  }
}
