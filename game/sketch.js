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
let WINDOW_SCALE;
let PLAYER_SCALE;
let DUCK_SCALE;
let DOG_SCALE;
let STARSHIP_SCALE;

function preload() {
  dukeSprite = loadImage("assets/OFFICIALDukeDog.jpg");

  starshipSprite = loadImage("assets/sprint2/starship.png");

  heart3 = loadImage("assets/sprint3/fullHearts.png");
  heart2 = loadImage("assets/sprint3/2Hearts.png");
  heart1 = loadImage("assets/sprint3/1Heart.png");
  heart0 = loadImage("assets/sprint3/NoHearts.png");
  healthBar = loadImage("assets/sprint3/health-bar.png");

  bg1 = loadImage("assets/background1fixed.png");
  bg2 = loadImage("assets/background2.png");
  bg3 = loadImage("assets/background3.png");

  playerSprite = loadImage("assets/player-sprite.png");
  platform1 = loadImage("assets/platforms.png");
  platform2 = loadImage("assets/platforms2.png");
  sunglassesDuckSprite = loadImage("assets/sprint2/sunglassesDuck.png");
  topHatDuckSprite = loadImage("assets/sprint2/duckTopHat-sprite.png");
}


function setup() {
  WINDOW_SCALE = Math.min(windowWidth / 1536, windowHeight / 703);
  PLAYER_SCALE = 1.5 * WINDOW_SCALE;
  DUCK_SCALE = PLAYER_SCALE;
  DOG_SCALE = PLAYER_SCALE;
  STARSHIP_SCALE = PLAYER_SCALE;
  createCanvas(windowWidth, windowHeight);
  loadLevel(currentLevel);
  menu = new Menu();
  healthSystem = new HealthSystem(healthBar, heart3, heart2, heart1, heart0);


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  WINDOW_SCALE = Math.min(windowWidth / 1536, windowHeight / 703);
  PLAYER_SCALE = 1.5 * WINDOW_SCALE;
  DUCK_SCALE = PLAYER_SCALE;
  DOG_SCALE = PLAYER_SCALE;
  STARSHIP_SCALE = PLAYER_SCALE;
  initializedMenu = false;
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
  let dukeHeight = dukeSprite.height * DOG_SCALE;
  let dukeFrameW = dukeSprite.width / 4;
  // level 1
  if (n == 0) {
    player = new Player(level, 50 * PLAYER_SCALE, 50 * PLAYER_SCALE - 40 * PLAYER_SCALE, 30 * PLAYER_SCALE, 40 * PLAYER_SCALE, 1, 2, 10, -16, 20);
    let duckHeight = 100 * DUCK_SCALE;

    level.addPlatform(new Platform(0 * PLAYER_SCALE, 50 * PLAYER_SCALE, 120 * PLAYER_SCALE, 30 * PLAYER_SCALE, platform1));
    level.addPlatform(new Platform(80 * PLAYER_SCALE, 95 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform2));
    let duck1 = new SunglassDuck(80 * PLAYER_SCALE + 50, (95 * PLAYER_SCALE) - duckHeight + 50, 60 * DUCK_SCALE, duckHeight, 3, sunglassesDuckSprite)

    level.addPlatform(new Platform(160 * PLAYER_SCALE, 140 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform1));
    level.addPlatform(new Platform(240 * PLAYER_SCALE, 185 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform2));
    let duck2 = new SunglassDuck(240 * PLAYER_SCALE + 50, (185 * PLAYER_SCALE) - duckHeight + 50, 60 * DUCK_SCALE, duckHeight, 3, sunglassesDuckSprite);

    level.addPlatform(new Platform(320 * PLAYER_SCALE, 230 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform1));
    level.addPlatform(new Platform(400 * PLAYER_SCALE, 275 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform2));

    level.addPlatform(new Platform(480 * PLAYER_SCALE, 320 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform1));
    level.addPlatform(new Platform(560 * PLAYER_SCALE, 365 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform2));

    level.addPlatform(new Platform(640 * PLAYER_SCALE, 410 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform1));
    level.addPlatform(new Platform(720 * PLAYER_SCALE, 455 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform2));

    level.addGoal(new Goal(800 * PLAYER_SCALE, 415 * PLAYER_SCALE, 40, 40));
    sunglassesDuck = [duck1, duck2];
    dukeDog = new DukeDog(level, -30 * PLAYER_SCALE, level.platforms[0].y - dukeHeight + 66, dukeFrameW * DOG_SCALE,  dukeHeight, 4, dukeSprite, WINDOW_SCALE);
  } else if (n == 1) {
    sunglassesDuck = [];
    // level 2
    level = new Level();
    player = new Player(level, 50 * PLAYER_SCALE, 50 * PLAYER_SCALE - 40 * PLAYER_SCALE, 30 * PLAYER_SCALE, 40 * PLAYER_SCALE, 1, 2, 10, -16, 20);
    level.addPlatform(new Platform(0, 50 * PLAYER_SCALE, 120 * PLAYER_SCALE, 30 * PLAYER_SCALE, platform2));
    level.addPlatform(new Platform(80 * PLAYER_SCALE, 95 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform1));
    level.addPlatform(new Platform(160 * PLAYER_SCALE, 140 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform1));
    const starship_y = 185 * PLAYER_SCALE;
    level.addPlatform(new Platform(240 * PLAYER_SCALE, starship_y, 120 * PLAYER_SCALE, 20, platform2));
    const starship_x = 280 * PLAYER_SCALE;
    const range = 30 * PLAYER_SCALE;
    const smaller = 1.5;
    level.addPlatform(new Starship(starship_x, starship_y - (60 * smaller), 60 * smaller, 60 * smaller, starshipSprite, starship_x - range, starship_x + range));
    const tophatheight = 108 * smaller;
    const tophatwidth = 60 * smaller;
    level.addPlatform(new Platform(320 * PLAYER_SCALE, 230 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform1));
    tophatDuck = new TophatDuck(320 * PLAYER_SCALE + 30, 230 * PLAYER_SCALE - tophatheight, tophatwidth, tophatheight, 2, topHatDuckSprite);
    level.addPlatform(new Platform(400 * PLAYER_SCALE, 275 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform2))
    level.addPlatform(new Platform(480 * PLAYER_SCALE, 320 * PLAYER_SCALE, 120 * PLAYER_SCALE, 20, platform1));
    level.addGoal(new Goal(560 * PLAYER_SCALE, 280 * PLAYER_SCALE, 40, 40));
    dukeDog = new DukeDog(level, player.x - 150, 50 * PLAYER_SCALE - dukeHeight, dukeFrameW * DOG_SCALE,  dukeHeight, 4, dukeSprite, WINDOW_SCALE);
  } else if (n == 2) {
    // level 3
    level = new Level();
    player = new Player(level, 50 * PLAYER_SCALE, (50 * PLAYER_SCALE) - (40 * PLAYER_SCALE), 30 * PLAYER_SCALE, 40 * PLAYER_SCALE, 1, 2, 10, -16, 20);
    level.addPlatform(new Platform(0, 50 * PLAYER_SCALE, 150, 30, platform1));
    level.addPlatform(new Platform(100, 50 * PLAYER_SCALE + 1 * 50 * PLAYER_SCALE, 100, 20, platform2));
    level.addPlatform(new Platform(250, 50 * PLAYER_SCALE + 2 * 50 * PLAYER_SCALE, 100, 20, platform1));
    level.addPlatform(new Platform(400, 50 * PLAYER_SCALE + 3 * 50 * PLAYER_SCALE, 100, 20, platform2));
    level.addPlatform(new Platform(550, 50 * PLAYER_SCALE + 4 * 50 * PLAYER_SCALE, 100, 20, platform1));
    level.addPlatform(new Platform(700, 50 * PLAYER_SCALE + 5 * 50 * PLAYER_SCALE, 100, 20, platform2));
    level.addPlatform(new Platform(850, 50 * PLAYER_SCALE + 6 * 50 * PLAYER_SCALE, 100, 20, platform1));
    level.addGoal(new Goal(880, (50 * PLAYER_SCALE + 6 * 50 * PLAYER_SCALE) - 40, 40, 40));
    dukeDog = new DukeDog(level, -30 * PLAYER_SCALE, 50 * PLAYER_SCALE - dukeHeight + 66, dukeFrameW * DOG_SCALE,  dukeHeight, 4, dukeSprite, WINDOW_SCALE);
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
    player.ground = false;
  }
  if (key == "p" && menuID != 2 && menuID != 1) {
    menuID = 0;
    inMenu = !inMenu;
  }
  return false; //prevents scrolling via arrow key
}
