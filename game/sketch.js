let player;
let platforms = [];
let gravity = 0.8;
let jumpForce = -15;
let currentLevel = 0;
let goal;

function setup() {
  createCanvas(800, 400);
  loadLevel(0);
}

function draw() {
  background(255);

  for (let p of platforms) p.show();
  if (goal) goal.show();

  player.update();
  player.show();

  player.onGround = false; // reset each frame

  for (let p of platforms) player.checkPlatform(p);

  if (goal && player.touches(goal)) nextLevel();
}

function keyPressed() {
  if ((key === 'w' || key === 'W') && player.onGround) {
    player.vy = jumpForce;
    player.onGround = false;
  }
}

function loadLevel(num) {
  platforms = [];
  if (num === 0) {
    // Level 1
    player = new Player(50, 300, 30, 40);
    platforms.push(new Platform(0, 370, 800, 30));    // ground
    platforms.push(new Platform(150, 300, 100, 20));  // platform 1
    platforms.push(new Platform(300, 250, 120, 20));  // platform 2 <- goal here
    platforms.push(new Platform(480, 200, 100, 20));  // platform 3
    goal = new Goal(320, 210, 30, 40);                // goal on 3rd platform
  } 
  else if (num === 1) {
    // Level 2
    player = new Player(50, 300, 30, 40);
    platforms.push(new Platform(0, 370, 800, 30));
    platforms.push(new Platform(120, 320, 80, 20));
    platforms.push(new Platform(280, 270, 100, 20));
    platforms.push(new Platform(480, 300, 80, 20));
    platforms.push(new Platform(630, 250, 120, 20));
    platforms.push(new Platform(400, 180, 80, 20));
    goal = new Goal(740, 140, 40, 40);
  } 
  else if (num === 2) {
    // Level 3
    player = new Player(30, 330, 30, 40);
    platforms.push(new Platform(0, 370, 150, 30));
    platforms.push(new Platform(180, 320, 100, 20));
    platforms.push(new Platform(320, 270, 100, 20));
    platforms.push(new Platform(460, 220, 100, 20));
    platforms.push(new Platform(360, 170, 100, 20));
    platforms.push(new Platform(220, 120, 100, 20));
    platforms.push(new Platform(80, 80, 100, 20));
    platforms.push(new Platform(260, 50, 100, 20));
    platforms.push(new Platform(440, 80, 100, 20));
    platforms.push(new Platform(600, 100, 100, 20));
    goal = new Goal(730, 60, 40, 40);
  } 
  else {
    player = null;
    platforms = [];
    goal = null;
    background(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text(" You Finished All Levels! ", width / 2, height / 2);
    noLoop();
  }
}

function nextLevel() {
  currentLevel++;
  loadLevel(currentLevel);
}


class Player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.onGround = false;
  }

  update() {
    if (keyIsDown(65)) this.vx = -this.speed;
    else if (keyIsDown(68)) this.vx = this.speed;
    else this.vx = 0;

    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.h > height) {
      this.y = height - this.h;
      this.vy = 0;
      this.onGround = true;
    }
  }

  checkPlatform(p) {
    let withinX = this.x + this.w > p.x && this.x < p.x + p.w;
    let falling = this.vy >= 0;
    let above = this.y + this.h <= p.y + 5;

    if (withinX && falling && above && this.y + this.h + this.vy >= p.y) {
      this.y = p.y - this.h;
      this.vy = 0;
      this.onGround = true;
    }
  }

  touches(obj) {
    return (
      this.x < obj.x + obj.w &&
      this.x + this.w > obj.x &&
      this.y < obj.y + obj.h &&
      this.y + this.h > obj.y
    );
  }

  show() {
    fill(0);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  show() {
    fill(0);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Goal {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  show() {
    fill(0);
    rect(this.x, this.y, this.w, this.h);
  }
}