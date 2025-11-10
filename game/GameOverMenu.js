class GameOverMenu {
  constructor() {
    this.buttons = [];
    this.initialized = false;
  }

  menu() {
    background(0);
    textSize(48);
    textAlign(CENTER);
    fill(255, 0, 0);
    text("GAME OVER", width / 2, 80);

    // Initialize buttons only once
    if (!this.initialized) {
      this.buttons = [];

      const buttonY = 200;
      const spacing = 220;

      // PLAY AGAIN button (left)
      this.buttons.push(new Button(200, buttonY, 200, 100,
        function () {
          if (mouseIsPressed && this.cursorDetect()) {
            restartGame();
            gameOverMenu.reset();
          }
        },
        function () {
          push();
          this.cursorDetect() ? fill(255) : fill(200);
          rect(this.x, this.y, this.w, this.h);
          pop();
          textSize(32);
          textAlign(CENTER);
          fill(0);
          text("PLAY AGAIN", this.x + this.w / 2, this.y + this.h / 2);
        }
      ));

      // MAIN MENU button (right)
      this.buttons.push(new Button(200 + spacing, buttonY, 200, 100,
        function () {
          if (mouseIsPressed && this.cursorDetect()) {
            menuID = 0;
            inMenu = true;
            gameOverMenu.reset();
          }
        },
        function () {
          push();
          this.cursorDetect() ? fill(255) : fill(200);
          rect(this.x, this.y, this.w, this.h);
          pop();
          textSize(32);
          textAlign(CENTER);
          fill(0);
          text("MAIN MENU", this.x + this.w / 2, this.y + this.h / 2);
        }
      ));

      this.initialized = true;
    }

    // Always draw and check buttons
    for (let btn of this.buttons) {
      btn.show();
      btn.clicked();
    }
  }

  reset() {
    this.initialized = false;
  }
}
