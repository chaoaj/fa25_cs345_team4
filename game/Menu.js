class Menu {
  constructor() {
    this.buttons = [];
  }
  menu() {
    // Default menu
    let widthFactor = windowWidth / 800;
    let heightFactor = windowHeight / 400;
    if (menuID == 0) {
      background('#D7BFDC');
      if (!initializedMenu) {
      this.buttons = [];
      this.buttons.push(
        new Button(300 * widthFactor, 150 * heightFactor, 200 * widthFactor, 100 * heightFactor,
          // defines what happens when the button is clicked
          function () {
            if (mouseIsPressed && this.cursorDetect() && !buttonPressed) {
              currentLevel = 0;
              loadLevel(currentLevel);
              inMenu = false;
              initializedMenu = false;
              buttonPressed = true;
              clear();
          }
        },
          // defines what drawing elements are used in a button
          function () {
            push();
            this.cursorDetect() ? fill(255) : fill(255,250,180);
            rect(300 * widthFactor, 150 * heightFactor, 200 * widthFactor, 100 * heightFactor);
            pop();
            push();
            fill(0);
            textSize(32 * WINDOW_SCALE);
            textAlign(CENTER);
            text("PLAY", 400 * widthFactor, 210 * heightFactor);
            pop();
          }
        )
      );
      this.buttons.push(
        new Button(300 * widthFactor, 250 * heightFactor, 200 * widthFactor, 100 * heightFactor,
          // defines what happens when the button is clicked
          function () {
            if (mouseIsPressed && this.cursorDetect() && !buttonPressed) {
              menuID = 1;
              initializedMenu = false;
              buttonPressed = true;
              clear();
            }
          },
          // defines what drawing elements are used in a button
          function () {
            push();
            this.cursorDetect() ? fill(255) : fill(255,250,180);
            rect(300 * widthFactor, 250 * heightFactor, 200 * widthFactor, 100 * heightFactor);
            pop();
            push();
            fill(0);
            textSize(32 * WINDOW_SCALE);
            textAlign(CENTER);
            text("Level Select", 400 * widthFactor, 310 * heightFactor);
            pop();
          }
        )
      );
      initializedMenu = true;
    }
    }
    // Level select menu
    if (menuID == 1) {
      background('#D7BFDC');
      if (!initializedMenu) {
      this.buttons = [];
      // would've done a loop to make each button but it didn't draw properly
      this.buttons.push(new Button(50 * widthFactor, 100 * heightFactor, 50 * widthFactor, 50 * heightFactor,
         function () {
          if (mouseIsPressed && this.cursorDetect() && !buttonPressed && unlockedLevels.has(0)) {
            currentLevel = 0;
            loadLevel(currentLevel);
            menuID = 0;
            inMenu = false;
            initializedMenu = false;
            buttonPressed = true;
            clear();
          }
        },
        function () {
          push();
          if(unlockedLevels.has(0)) {
            this.cursorDetect() ? fill(255,255,255) : fill(255,250,180);
          } else {
            fill(0);
          }
           rect(50 * widthFactor, 100 * heightFactor, 50 * widthFactor, 50 * heightFactor);
          pop();
          textSize(32 * WINDOW_SCALE);
          textAlign(CENTER);
          text(1, 75 * widthFactor, this.y + 25 * heightFactor);
        }
      ));
      this.buttons.push(new Button(150 * widthFactor, 100 * heightFactor, 50 * widthFactor, 50 * heightFactor,
         function () {
          if (mouseIsPressed && this.cursorDetect() && !buttonPressed && unlockedLevels.has(1)) {
            currentLevel = 1;
            loadLevel(currentLevel);
            menuID = 0;
            inMenu = false;
            initializedMenu = false;
            buttonPressed = true;
            clear();
          }
        },
        function () {
          push();
          if(unlockedLevels.has(1)) {
            this.cursorDetect() ? fill(255,255,255) : fill(255,250,180);
          } else {
            fill(0);
          }
           rect(150 * widthFactor, 100 * heightFactor, 50 * widthFactor, 50 * heightFactor);
          pop();
          textSize(32 * WINDOW_SCALE);
          textAlign(CENTER);
          text(2, 175 * widthFactor, this.y + 25 * heightFactor);
        }
      ));
      this.buttons.push(new Button(250 * widthFactor, 100 * heightFactor, 50 * widthFactor, 50 * heightFactor,
         function () {
          if (mouseIsPressed && this.cursorDetect() && !buttonPressed && unlockedLevels.has(2)) {
            currentLevel = 2;
            loadLevel(currentLevel);
            menuID = 0;
            inMenu = false;
            initializedMenu = false;
            buttonPressed = true;
            clear();
          }
        },
        function () {
          push();
          if(unlockedLevels.has(2)) {
            this.cursorDetect() ? fill(255,255,255) : fill(255,250,180);
          } else {
            fill(0);
          }
           rect(250 * widthFactor, 100 * heightFactor, 50 * widthFactor, 50 * heightFactor);
          pop();
          textSize(32 * WINDOW_SCALE);
          textAlign(CENTER);
          text(3, 275 * widthFactor, this.y + 25 * heightFactor);
        }
      ));
      textAlign(CENTER, CENTER);
      textSize(32 * WINDOW_SCALE);
      fill(0);
      initializedMenu = true;
      }
      text("Can't access some levels? That means you need to play those levels first!", width/2, height/2, 400);
    }
    // Game over menu
    if (menuID == 2) {
      background(0);
      textSize(48 * WINDOW_SCALE);
      textAlign(CENTER);
      fill(255, 0, 0);
      text("GAME OVER", width / 2, 80);
      // Initialize buttons only once
      if (!initializedMenu) {
        this.buttons = [];

        let buttonY = 200 * heightFactor;
        let spacing = 220 * widthFactor;

        // PLAY AGAIN button (left)
        this.buttons.push(new Button(200 * widthFactor, 200 * heightFactor, 200 * widthFactor, 100 * heightFactor,
        function () {
          if (mouseIsPressed && this.cursorDetect() && !buttonPressed) {
            currentLevel = 0;
            loadLevel(currentLevel);
            inMenu = false;
            menuID = 0;
            initializedMenu = false;
            buttonPressed = true;
            clear();
          }
        },
        function () {
          push();
          this.cursorDetect() ? fill(255) : fill(200);
          rect(this.x, this.y, this.w, this.h);
          pop();
          textSize(32 * WINDOW_SCALE);
          textAlign(CENTER);
          fill(0);
          text("PLAY AGAIN", this.x + this.w / 2, this.y + this.h / 2);
        }
      ));

      // MAIN MENU button (right)
      this.buttons.push(new Button(200 * widthFactor + spacing, 200 * heightFactor, 200 * widthFactor, 100 * heightFactor,
        function () {
          if (mouseIsPressed && this.cursorDetect() && !buttonPressed) {
            inMenu = true;
            initializedMenu = false;
            menuID = 0;
            buttonPressed = true;
            clear();
          }
        },
        function () {
          push();
          this.cursorDetect() ? fill(255) : fill(200);
          rect(this.x, this.y, this.w, this.h);
          pop();
          textSize(32 * WINDOW_SCALE);
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
