let dukeSprite;
let dukeDog;
let heart3;
let heart2;
let heart1;
let heart0;
let healthBar;

let bg1, bg2, bg3;

let menu;
let menuID = 0;
let inMenu = true;
let initializedMenu = false
let currentLevel = 0;
let unlockedLevels = new Set([0]);
let sunglassesDuck;
let sunglassesDuckSprite;
let tophatDuck;

function preload() {
  dukeSprite = loadImage("assets/OFFICIALDukeDog.jpg");

  starshipSprite = loadImage("assets/sprint2/starship.jpg");

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
  platform1 = loadImage("assets/platforms.png");
  platform2 = loadImage("assets/platforms2.png");
  sunglassesDuckSprite = loadImage("assets/sprint2/sunglassesDuck.png");
  topHatDuckSprite = loadImage("assets/sprint2/duckTopHat-sprite.png");
}


function setup() {
  createCanvas(800, 400);
  loadLevel(currentLevel);
  dukeDog = new DukeDog(player.x - 150, player.y, dukeSprite.width / 4, dukeSprite.height, 4, dukeSprite);
  menu = new Menu();
  healthSystem = new HealthSystem(healthBar, heart3, heart2, heart1, heart0);


}

function draw() {
  if (inMenu) {
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

    if (player.nextLevel !== null) {
      if (player.nextLevel <= 2) {
        currentLevel = player.nextLevel;
        unlockedLevels.add(currentLevel);
        loadLevel(currentLevel);
        player.nextLevel = null;
        return;
      } else {
        clear();
        textAlign(CENTER, CENTER);
        textSize(32);
        fill(0);
        text("You Finished All Levels!", width/2, height/2);
        noLoop();
        return;
      }
    }

    level.show();
    if (sunglassesDuck) {
      for (let duck of sunglassesDuck) {
        duck.update();
        duck.display();
        duck.checkCollision(player);
      }
    }

    if (tophatDuck) {
      tophatDuck.update();
      tophatDuck.display();
      tophatDuck.checkCollision(player);
    }

    dukeDog.update();
    dukeDog.display();
    healthSystem.update();
    healthSystem.display();

    if (healthSystem.isDead()) {
      inMenu = true;
      menuID = 2;
      initializedMenu = false;
    }
  }
}


function loadLevel(n) {

  sunglassesDuck = [];
  tophatDuck = null;
  level = new Level();
  // level 1
  if (n == 0) {
    player = new Player(level, 50, 300, 30, 40, 1, 2, 10, -16, 20);

    let duck1 = new SunglassDuck(170, 200, 60, 100, 3, sunglassesDuckSprite);
    let duck2 = new SunglassDuck(500, 100, 60, 100, 3, sunglassesDuckSprite);
    sunglassesDuck = [duck1, duck2];
    level.addPlatform(new Platform(0, 370, 800, 30, null));
    level.addPlatform(new Platform(150, 300, 100, 20, platform2));
    level.addPlatform(new Platform(300, 250, 120, 20, platform1));
    level.addPlatform(new Platform(480, 200, 100, 20, platform2));
    level.addGoal(new Goal(320, 210, 30, 40));
  } else if (n == 1) {
    sunglassesDuck = [];
    // level 2
    level = new Level();
    player = new Player(level, 50, 300, 30, 40, 1, 2, 10, -16, 20);
    level.addPlatform(new Platform(0, 370, 800, 30));
    level.addPlatform(new Platform(0, 370, 800, 30, null));
    level.addPlatform(new Platform(120, 320, 80, 20, platform2));
    level.addPlatform(new Starship(200, 320, 60, 60, starshipSprite, shape = 1, 200, 300));
    level.addPlatform(new Platform(280, 270, 100, 20, platform1));
    level.addPlatform(new Platform(480, 300, 80, 20, platform2));
    tophatDuck = new TophatDuck(630, 150, 60, 108, 2, topHatDuckSprite);
    level.addPlatform(new Platform(630, 250, 120, 20, platform1));
    level.addPlatform(new Platform(400, 180, 80, 20, platform2));
    level.addGoal(new Goal(740, 140, 40, 40));
    console.log(level.platforms);
  } else if (n == 2) {
    // level 3
    level = new Level();
    player = new Player(level, 30, 330, 30, 40, 1, 2, 10, -16, 20);
    level.addPlatform(new Platform(0, 370, 150, 30, null));
    level.addPlatform(new Platform(180, 320, 100, 20, platform2));
    level.addPlatform(new Platform(320, 270, 100, 20, platform1));
    level.addPlatform(new Platform(460, 220, 100, 20, platform2));
    level.addPlatform(new Platform(360, 170, 100, 20, platform1));
    level.addPlatform(new Platform(220, 120, 100, 20, platform2));
    level.addPlatform(new Platform(80, 80, 100, 20, platform1));
    level.addPlatform(new Platform(260, 50, 100, 20, platform2));
    level.addPlatform(new Platform(440, 80, 100, 20, platform1));
    level.addPlatform(new Platform(600, 100, 100, 20, platform2));
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
