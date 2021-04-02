export const createPlayerAnims = (
  anims: Phaser.Animations.AnimationManager
): void => {
  anims.create({
    key: "player-left-walk",
    frames: anims.generateFrameNames("player_atlas", {
      prefix: "player-left-walk.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "player-right-walk",
    frames: anims.generateFrameNames("player_atlas", {
      prefix: "player-right-walk.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "player-front-walk",
    frames: anims.generateFrameNames("player_atlas", {
      prefix: "player-front-walk.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "player-back-walk",
    frames: anims.generateFrameNames("player_atlas", {
      prefix: "player-back-walk.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
};
