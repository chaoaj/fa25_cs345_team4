  class Player {
  // Default values for player
  constructor(
    level,
    x = 0,
    y = 0,
    w = 20,
    h = 20,
    grav = 1,
    speed = 2,
    movelimit = 10,
    jump = -16,
    terminal = 20,
  ) {
    this.level = level;
    this.x = x; // player x position
    this.y = y; // player y position
    this.vx = 0; // player x velocity
    this.vy = 0; // player y velocity
    this.w = w; // player width
    this.h = h; // player height
    this.grav = grav;  // Gravity acceleration
    this.speed = speed; // Horizontal movement speed
    this.movelimit = movelimit; // How fast player can move sideways
    this.jump = jump; // jump speed
    this.terminal = terminal; // vertical terminal velocity
    this.ground = true;
  }
  // gravity, movement and calls collision.
  update() {
    push();
    rect(this.x, this.y, this.w, this.h);
    pop();
    // Goal handler
    for (let p of this.level.goals) {
      if(p.touch(this)) {
        currentLevel += 1;
        loadLevel(currentLevel);
      }
    }
    // Gravity implenetation
    this.vy += this.grav;
    if (this.vy >= this.terminal) {
      this.vy = this.terminal;
    }
    this.y += this.vy;
    // collision call
    this.level.collision(this);
    // horizontal movement
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.vx += 2;
      if (this.vx > 10) {
        this.vx = 10;
      }
    } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.vx -= 2;
      if (this.vx < -10) {
        this.vx = -10;
      }
    }
    if (this.vx > 0) {
      this.vx -= 1;
    } else if (this.vx < 0) {
      this.vx += 1;
    }
    this.x += this.vx;
  }
  // jumping function
  leap() {
    this.vy = this.jump;
  }
}