class Menu {
  constructor() {
    this.buttons = [];
  }
  menu() {
    if (menuID == 0) {
      this.buttons = [];
      this.buttons.push(
        new Button(300, 150, 200, 100,
          // defines what happens when the button is clicked
          function () {
            if (mouseIsPressed && this.cursorDetect()) {
              currentLevel = 0;
              loadLevel(currentLevel);
              inMenu = false;
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
      for (let i of this.buttons) {
        i.show();
        i.clicked();
      }
    }
    if (menuID == 1) {
      this.buttons = [];
      // would've done a loop to make each button but it didn't draw properly
      this.buttons.push(new Button(50, 100, 50, 50,
         function () {
          if (mouseIsPressed && this.cursorDetect() && unlockedLevels.has(0)) {
            currentLevel = 0;
            loadLevel(currentLevel);
            menuID = 0;
            inMenu = false;
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
      for (let j of this.buttons) {
        j.show();
        j.clicked();
      }
    }
  }
}
