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

    this.sprite = playerSprite;
    this.frameCount = 4;
    this.frameIndex = 0;
    this.frameSpeed = 6;

    this.nextLevel = null;
    this.invincible = false;
    this.invinciblityTimer = 0;
  }
  // gravity, movement and calls collision.
  update() {
    if (this.invincible) {
      this.invinciblityTimer--;
      if (this.invinciblityTimer <= 0) {
        this.invincible = false;
      }
    }
    let frameWidth = this.sprite.width / this.frameCount;
    let sx = floor(this.frameIndex / this.frameSpeed) * frameWidth;
    let sy = 0;

    // draw sprite instead of rect
    this.drawSprite();

    if (this.vx !== 0) {
      this.frameIndex = (this.frameIndex + 1) % (this.frameCount * this.frameSpeed);
    } else {
      this.frameIndex = 0;
    }
    // Goal handler
    for (let p of this.level.goals) {
      if(p.touch(this)) {
        this.nextLevel = currentLevel + 1;
      }
    }
    // Gravity implementation
    if (!this.ground) {
      this.vy += this.grav;
      if (this.vy >= this.terminal) {
      this.vy = this.terminal;
    }
      this.y += this.vy;
  } else {
    this.vy = 0;
  }
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

  drawSprite() {
    let frameWidth = this.sprite.width / this.frameCount;
    let sx = floor(this.frameIndex / this.frameSpeed) * frameWidth;
    image(this.sprite, this.x, this.y, this.w, this.h, sx, 0, frameWidth, this.sprite.height);

    if (!this.ground) {
      this.frameIndex = 3 * this.frameSpeed;
    } else if (this.vx !== 0) {
      this.frameIndex = (this.frameIndex + 1) % (3 * this.frameSpeed);
    } else {
      this.frameIndex = 0;
    }
  }
}
