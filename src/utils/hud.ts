const messageBox = document.getElementById("message-box");
const messageArea = document.getElementById("message-area");

export const writeMessage = (message: string) => {
  if (messageArea.textContent !== message) {
    console.log(message);
    messageArea.textContent = message;
    messageArea.classList.remove("typewriter");
    void messageArea.offsetWidth;
    messageArea.classList.add("typewriter");
    if (message === "") {
      messageBox.style.visibility = "hidden";
    } else {
      messageBox.style.visibility = "visible";
    }
  }
};
export type DpadDirections = {
  [key: string]: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
};
export function getDpad() {
  var held_directions: DpadDirections = {
    left: false,
    right: false,
    up: false,
    down: false,
  };
  window.addEventListener('touchstart', () =>{
    document.querySelector(".dpad").classList.remove("not-displayed");
  }, {once:true});
  const directions = {
    left: "left",
    right: "right",
    up: "up",
    down: "down",
  };

  const leftButton = document.querySelector(".dpad-left");
  const rightButton = document.querySelector(".dpad-right");
  const upButton = document.querySelector(".dpad-up");
  const downButton = document.querySelector(".dpad-down");

  let isPressed = false;
  const removePressedAll = () => {
    leftButton.classList.remove("pressed");
    rightButton.classList.remove("pressed");
    upButton.classList.remove("pressed");
    downButton.classList.remove("pressed");
  };
  document.body.addEventListener("touchstart", () => {
    // console.log("mouse is down");
    isPressed = true;
  });
  document.body.addEventListener("touchend", () => {
    // console.log("mouse is up");
    isPressed = false;
    held_directions.left = false;
    held_directions.right = false;
    held_directions.up = false;
    held_directions.down = false;
    removePressedAll();
  });
  const handleDpadPress = (direction: string, click?: boolean) => {
    if (click) {
      isPressed = true;
    }
    held_directions[direction] = isPressed;

    if (isPressed) {
      removePressedAll();
      switch (direction) {
        case "left":
          leftButton.classList.add("pressed");
          break;
        case "right":
          rightButton.classList.add("pressed");
          break;
        case "up":
          upButton.classList.add("pressed");
          break;
        case "down":
          downButton.classList.add("pressed");
          break;
      }
    }
  };
  leftButton.addEventListener("touchstart", (e) =>
    handleDpadPress(directions.left, true)
  );
  upButton.addEventListener("touchstart", (e) =>
    handleDpadPress(directions.up, true)
  );
  rightButton.addEventListener("touchstart", (e) =>
    handleDpadPress(directions.right, true)
  );
  downButton.addEventListener("touchstart", (e) =>
    handleDpadPress(directions.down, true)
  );

  leftButton.addEventListener("touchend", (e) =>
    handleDpadPress(directions.left)
  );
  upButton.addEventListener("touchend", (e) => handleDpadPress(directions.up));
  rightButton.addEventListener("touchend", (e) =>
    handleDpadPress(directions.right)
  );
  downButton.addEventListener("touchend", (e) =>
    handleDpadPress(directions.down)
  );
  return held_directions;
}
