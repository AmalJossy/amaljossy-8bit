export const createPlayerAnims = (
  anims: Phaser.Animations.AnimationManager
): void => {
  anims.create({
    key: "player-left",
    frames: anims.generateFrameNames("player_atlas", {
      prefix: "player-left.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "player-right",
    frames: anims.generateFrameNames("player_atlas", {
      prefix: "player-right.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "player-down",
    frames: anims.generateFrameNames("player_atlas", {
      prefix: "player-down.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "player-up",
    frames: anims.generateFrameNames("player_atlas", {
      prefix: "player-up.",
      start: 0,
      end: 3,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });
};
