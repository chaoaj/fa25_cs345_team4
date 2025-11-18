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

const PLAYER_SCALE = 2;
const DUCK_SCALE = 2;
const DOG_SCALE = 2;
const STARSHIP_SCALE = 2;
let WINDOW_SCALE = 0.9;

function preload() {
  dukeSprite = loadImage("assets/OFFICIALDukeDog.jpg");

  starshipSprite = loadImage("assets/sprint2/starship.png");

  heart3 = loadImage("assets/sprint3/fullHearts.png");
  heart2 = loadImage("assets/sprint3/2Hearts.png");
  heart1 = loadImage("assets/sprint3/1Heart.png");
  heart0 = loadImage("assets/sprint3/NoHearts.png");
  healthBar = loadImage("assets/sprint3/health-bar.png");

  bg1 = loadImage("assets/background3.png");
  bg2 = loadImage("assets/background2.png");
  bg3 = loadImage("assets/background1fixed.png");

  playerSprite = loadImage("assets/player-sprite.png");
  platform1 = loadImage("assets/platforms.png");
  platform2 = loadImage("assets/platforms2.png");
  sunglassesDuckSprite = loadImage("assets/sprint2/sunglassesDuck.png");
  topHatDuckSprite = loadImage("assets/sprint2/duckTopHat-sprite.png");
}


function setup() {
  createCanvas(windowWidth * WINDOW_SCALE, windowHeight * WINDOW_SCALE);
  loadLevel(currentLevel);
  menu = new Menu();
  healthSystem = new HealthSystem(healthBar, heart3, heart2, heart1, heart0);


}

function draw() {
  if (inMenu) {
    clear();
    menu.menu();
  } else {
    pause = new Button(740, 60, 40, 40,
      function () {
        if (mouseIsPressed && this.cursorDetect()) {
          menuID = 0;
          inMenu = !inMenu;
          clear();
        }
      },
      function () {
        push();
        fill(0);
        rect(740, 60, 10, 40);
        rect(760, 60, 10, 40);
        pop();
      }
    );

    background(255);
    if (currentLevel == 0) {
      image(bg1, 0, 0, width, height);
    } else if (currentLevel == 1) {
      image(bg2, 0, 0, width, height);
    } else if (currentLevel == 2) {
      image(bg3, 0, 0, width, height);
    }
    pause.show();
    pause.clicked();
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
    player = new Player(level, 50 * PLAYER_SCALE, 370 * PLAYER_SCALE - 40 * PLAYER_SCALE, 30 * PLAYER_SCALE, 40 * PLAYER_SCALE, 1, 2, 10, -16, 20);
    let duckHeight = 100 * DUCK_SCALE;

    let duck1 = new SunglassDuck(260, (320 * DUCK_SCALE) - duckHeight + 50, 60 * DUCK_SCALE, duckHeight, 3, sunglassesDuckSprite);
    let duck2 = new SunglassDuck(500, (270 * DUCK_SCALE) - duckHeight + 50, 60 * DUCK_SCALE, duckHeight, 3, sunglassesDuckSprite);
    sunglassesDuck = [duck1, duck2];
    level.addPlatform(new Platform(0, 370 * PLAYER_SCALE, 1200 * PLAYER_SCALE, 30 * PLAYER_SCALE, null));
    level.addPlatform(new Platform(250, 320 * PLAYER_SCALE, 150, 20, platform2));
    level.addPlatform(new Platform(500, 270 * PLAYER_SCALE, 150, 20, platform1));
    level.addPlatform(new Platform(800, 220 * PLAYER_SCALE, 120, 20, platform2));
    level.addGoal(new Goal(900, 200 * PLAYER_SCALE - 40, 40, 40));
  } else if (n == 1) {
    sunglassesDuck = [];
    // level 2
    level = new Level();
    player = new Player(level, 50 * PLAYER_SCALE, (370 * PLAYER_SCALE) - (40 * PLAYER_SCALE), 30 * PLAYER_SCALE, 40 * PLAYER_SCALE, 1, 2, 10, -16, 20);
    level.addPlatform(new Platform(0, 370 * PLAYER_SCALE, 800, 30, null));
    level.addPlatform(new Platform(120, 320 * PLAYER_SCALE, 80, 20, platform2));
    level.addPlatform(new Starship(250, 270 * PLAYER_SCALE, 60 * STARSHIP_SCALE, 60 * STARSHIP_SCALE, starshipSprite, 250, 400));
    level.addPlatform(new Platform(450, 270 * PLAYER_SCALE, 100, 20, platform1));
    level.addPlatform(new Platform(600, 220 * PLAYER_SCALE, 80, 20, platform2));
    level.addPlatform(new Platform(750, 170 * PLAYER_SCALE, 120, 20, platform1))
    tophatDuck = new TophatDuck(750, (170 * PLAYER_SCALE) - (108 * DUCK_SCALE * 0.8) + 5, 60 * DUCK_SCALE * 0.8, 108 * DUCK_SCALE * 0.8, 2, topHatDuckSprite);
    level.addPlatform(new Platform(550, 120 * PLAYER_SCALE, 80, 20, platform1));
    level.addGoal(new Goal(560, (120 * PLAYER_SCALE) - 40, 40, 40));
  } else if (n == 2) {
    // level 3
    level = new Level();
    player = new Player(level, 50 * PLAYER_SCALE, (370 * PLAYER_SCALE) - (40 * PLAYER_SCALE), 30 * PLAYER_SCALE, 40 * PLAYER_SCALE, 1, 2, 10, -16, 20);
    level.addPlatform(new Platform(0, 370 * PLAYER_SCALE, 150, 30, null));
    level.addPlatform(new Platform(100, 320 * PLAYER_SCALE, 100, 20, platform2));
    level.addPlatform(new Platform(250, 270 * PLAYER_SCALE, 100, 20, platform1));
    level.addPlatform(new Platform(400, 220 * PLAYER_SCALE, 100, 20, platform2));
    level.addPlatform(new Platform(550, 170 * PLAYER_SCALE, 100, 20, platform1));
    level.addPlatform(new Platform(700, 120 * PLAYER_SCALE, 100, 20, platform2));
    level.addPlatform(new Platform(850, 70 * PLAYER_SCALE, 100, 20, platform1));
    level.addGoal(new Goal(880, (70 * PLAYER_SCALE) - 40, 40, 40));
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
  let dukeFrameW = dukeSprite.width / 4;
  dukeDog = new DukeDog(player.x - 150, player.y, dukeFrameW * DOG_SCALE,  dukeSprite.height * DOG_SCALE, 4, dukeSprite);


}

//Jumping and button to menu
function keyPressed(UP_ARROW) {
  if ((key == "ArrowUp" || key == "w") && player.ground) {
    player.leap();
    player.ground = false;
  }
  if (key == "p" && menuID != 2 && menuID != 1) {
    menuID = 0;
    inMenu = !inMenu;
  }
  return false; //prevents scrolling via arrow key
}
