class Menu {
  constructor() {
    this.buttons = [];
  }
  menu() {
    // Default menu
    if (menuID == 0) {
      if (!initializedMenu) {
      this.buttons = [];
      this.buttons.push(
        new Button(300, 150, 200, 100,
          // defines what happens when the button is clicked
          function () {
            if (mouseIsPressed && this.cursorDetect()) {
              currentLevel = 0;
              loadLevel(currentLevel);
              inMenu = false;
              initializedMenu = false;
              clear();
          }
        },
          // defines what drawing elements are used in a button
          function () {
            push();
            this.cursorDetect() ? fill(255) : fill(200);
            rect(300, 150, 200, 100);
            pop();
            textSize(32);
            textAlign(CENTER);
            text("PLAY", 400, 210);
          }
        )
      );
      this.buttons.push(
        new Button(300, 250, 200, 100,
          // defines what happens when the button is clicked
          function () {
            if (mouseIsPressed && this.cursorDetect()) {
              menuID = 1;
              initializedMenu = false;
              clear();
            }
          },
          // defines what drawing elements are used in a button
          function () {
            push();
            this.cursorDetect() ? fill(255) : fill(200);
            rect(300, 250, 200, 100);
            pop();
            textSize(32);
            textAlign(CENTER);
            text("Level Select", 400, 310);
          }
        )
      );
      initializedMenu = true;
    }
    }
    // Level select menu
    if (menuID == 1) {
      if (!initializedMenu) {
      this.buttons = [];
      // would've done a loop to make each button but it didn't draw properly
      this.buttons.push(new Button(50, 100, 50, 50,
         function () {
          if (mouseIsPressed && this.cursorDetect() && unlockedLevels.has(0)) {
            currentLevel = 0;
            loadLevel(currentLevel);
            menuID = 0;
            inMenu = false;
            initializedMenu = false;
            clear();
          }
        },
        function () {
          push();
          if(unlockedLevels.has(0)) {
            this.cursorDetect() ? fill(255) : fill(200);
          } else {
            fill(0);
          }
           rect(50, 100, 50, 50);
          pop();
          textSize(32);
          textAlign(CENTER);
          text(1, 75, 135);
        }
      ));
      this.buttons.push(new Button(150, 100, 50, 50,
         function () {
          if (mouseIsPressed && this.cursorDetect() && unlockedLevels.has(1)) {
            currentLevel = 1;
            loadLevel(currentLevel);
            menuID = 0;
            inMenu = false;
            initializedMenu = false;
            clear();
          }
        },
        function () {
          push();
          if(unlockedLevels.has(1)) {
            this.cursorDetect() ? fill(255) : fill(200);
          } else {
            fill(0);
          }
           rect(150, 100, 50, 50);
          pop();
          textSize(32);
          textAlign(CENTER);
          text(2, 175, 135);
        }
      ));
      this.buttons.push(new Button(250, 100, 50, 50,
         function () {
          if (mouseIsPressed && this.cursorDetect() && unlockedLevels.has(2)) {
            currentLevel = 2;
            loadLevel(currentLevel);
            menuID = 0;
            inMenu = false;
            initializedMenu = false;
            clear();
          }
        },
        function () {
          push();
          if(unlockedLevels.has(2)) {
            this.cursorDetect() ? fill(255) : fill(200);
          } else {
            fill(0);
          }
           rect(250, 100, 50, 50);
          pop();
          textSize(32);
          textAlign(CENTER);
          text(3, 275, 135);
        }
      ));
      textAlign(CENTER, CENTER);
      textSize(32);
      fill(0);
      initializedMenu = true;
      }
      text("Have to get to a level to unlock the level select button for it.", width/2, height/2, 400);
    }
    // Game over menu
    if (menuID == 2) {
      background(0);
      textSize(48);
      textAlign(CENTER);
      fill(255, 0, 0);
      text("GAME OVER", width / 2, 80);
      // Initialize buttons only once
      if (!initializedMenu) {
        this.buttons = [];

        let buttonY = 200;
        let spacing = 220;

        // PLAY AGAIN button (left)
        this.buttons.push(new Button(200, buttonY, 200, 100,
        function () {
          if (mouseIsPressed && this.cursorDetect()) {
            currentLevel = 0;
            loadLevel(currentLevel);
            inMenu = false;
            menuID = 0;
            initializedMenu = false;

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
            inMenu = true;
            menuID = 0;
            initializedMenu = false;
            clear();
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

      initializedMenu = true;
    }
    }
    // Show the buttons and check for clicking
    for (let i of this.buttons) {
        i.show();
        i.clicked();
    }
  }
}
