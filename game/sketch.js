function setup() {
  createCanvas(800, 400);
  menu = new Menu();
  in_menu = true;
  // level setup
  loadLevel(0);
  currentLevel = 0;
  
}

function draw() {
  if (in_menu == true) {
    menu.menu();
  } else {
    background(255);
    // updates the player and collisions
    player.update();
    // shows the level
    level.show();
  }
}

function loadLevel(n) {
  // level 1
  if (n == 0) {
    level = new Level();
    player = new Player(level, 50, 300, 30, 40, 1, 2, 10, -16, 20);
    level.addPlatform(new Platform(0, 370, 800, 30));
    level.addPlatform(new Platform(150, 300, 100, 20));
    level.addPlatform(new Platform(300, 250, 120, 20));
    level.addPlatform(new Platform(480, 200, 100, 20));
    level.addGoal(new Goal(320, 210, 30, 40));
  } else if (n == 1) {
    // level 2
    level = new Level();
    player = new Player(level, 50, 300, 30, 40, 1, 2, 10, -16, 20);
    level.addPlatform(new Platform(0, 370, 800, 30));
    level.addPlatform(new Platform(120, 320, 80, 20));
    level.addPlatform(new Platform(280, 270, 100, 20));
    level.addPlatform(new Platform(480, 300, 80, 20));
    level.addPlatform(new Platform(630, 250, 120, 20));
    level.addPlatform(new Platform(400, 180, 80, 20));
    level.addGoal(new Goal(740, 140, 40, 40));
  } else if (n == 2) {
    // level 3
    level = new Level();
    player = new Player(level, 30, 330, 30, 40, 1, 2, 10, -16, 20);
    level.addPlatform(new Platform(0, 370, 150, 30));
    level.addPlatform(new Platform(180, 320, 100, 20));
    level.addPlatform(new Platform(320, 270, 100, 20));
    level.addPlatform(new Platform(460, 220, 100, 20));
    level.addPlatform(new Platform(360, 170, 100, 20));
    level.addPlatform(new Platform(220, 120, 100, 20));
    level.addPlatform(new Platform(80, 80, 100, 20));
    level.addPlatform(new Platform(260, 50, 100, 20));
    level.addPlatform(new Platform(440, 80, 100, 20));
    level.addPlatform(new Platform(600, 100, 100, 20));
    level.addGoal(new Goal(730, 60, 40, 40));
  } else {
    // game end
    clear();
    player = null;
    level = new Level();
    background(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text(" You Finished All Levels! ", width / 2, height / 2);
    noLoop();
  }
}

//Jumping and button to menu
function keyPressed(UP_ARROW) {
  if ((key == "ArrowUp" || key == "w") && player.ground) {
    player.leap();
  }
  player.ground = false;
  if (key == "p") {
    in_menu = !in_menu;
  }
  return false; //prevents scrolling via arrow key
}
