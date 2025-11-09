let dukeSprite;
let dukeDog;
let heart3;
let heart2;
let heart1;
let heart0;
let healthBar;

let bg1, bg2, bg3;

function preload() {
  dukeSprite = loadImage("assets/OFFICIALDukeDog.jpg");

  heart3 = loadImage("assets/sprint3/fullHearts.png");
  heart2 = loadImage("assets/sprint3/2Hearts.png");
  heart1 = loadImage("assets/sprint3/1Heart.png");
  heart0 = loadImage("assets/sprint3/NoHearts.png");
  healthBar = loadImage("assets/sprint3/health-bar.png");

  bg1 = loadImage("assets/background3.png");
  bg2 = loadImage("assets/background2.png");
  bg3 = loadImage("assets/background1fixed.png");

  bg1.resize(800, 400);
  bg2.resize(800, 400);
  bg3.resize(800, 400);

  playerSprite = loadImage("assets/player-sprite.png");
}


function setup() {
  createCanvas(800, 400);
  dukeDog = new DukeDog(50, 200, dukeSprite.width / 4, dukeSprite.height, 4, dukeSprite);
  menu = new Menu();
  inMenu = true;
  // level setup
  loadLevel(0);
  currentLevel = 0;
  unlockedLevels = new Set([0]);
  menuID = 0;

  healthSystem = new HealthSystem(healthBar, heart3, heart2, heart1, heart0);

}

function draw() {
  if (inMenu == true) {
    menu.menu();
  } else {

    background(255);
    if (currentLevel == 0) {
      image(bg1, 0, 0, width, height);
    } else if (currentLevel == 1) {
      image(bg2, 0, 0, width, height);
    } else if (currentLevel == 2) {
      image(bg3, 0, 0, width, height);
    }
    // updates the player and collisions
    player.update();
    // shows the level
    level.show();

    dukeDog.update();
    dukeDog.display();
    healthSystem.display();
  }


}

function loadLevel(n) {

  currentLevel = n;
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
    inMenu = !inMenu;
  }
  return false; //prevents scrolling via arrow key
}
