class DukeDog {
  constructor(level, x, y, width, height, numFrames, spriteSheet, windowScale) {
    this.level = level;
    this.windowScale = windowScale;
    this.x = x;
    this.y = y;
    this.numFrames = numFrames;
    this.spriteSheet = spriteSheet;

    this.w = width;
    this.h = height;

    this.currentFrame = 0;
    this.frameCounter = 0;
    this.frameSpeed = 6; // animation speed

    this.speed = 1.5; // follow speed
    this.vy = 0;
    this.grav = 4;
    this.terminal = 50;
    this.ground = false;
    this.isDukeDog = true;
    this.direction = true;
  }
  update() {
    if (player) {
      if (player.x > this.x) {
        this.x += this.speed;
        this.direction = true;
      } else if (player.x < this.x) {
        this.x -= this.speed;
        this.direction = false;
      }

      this.vy += this.grav;
      if (this.vy > this.terminal) {
        this.vy = this.terminal;
      }
      this.y += this.vy;

      this.level.collision(this);
    }

    // --- ANIMATION ---
    this.frameCounter++;
    if (this.frameCounter >= this.frameSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.numFrames;
      this.frameCounter = 0;
    }

    // --- INTERACTION / COLLISION with PLAYER ---
    if (this.touch(player)) {
      healthSystem.dogDamage();
      // Push dog back slightly so it doesn't hit every frame
      if (healthSystem.dogDamageCooldown <= 0 && !player.invincible) {
        healthSystem.dogDamage();
      }
    }
  }

  // collision check
  touch(p) {
    return !(
      this.x + this.w < p.x ||
      this.x > p.x + p.w ||
      this.y + this.h < p.y ||
      this.y > p.y + p.h
    );
  }

  display() {
    push();
    if (this.direction) {
      image(
        this.spriteSheet,
        this.x,
        this.y,
        this.w,
        this.h,
        this.currentFrame * 49,
        0,
        49,
        49
      );
    } else {
      scale(-1, 1);
      image(
        this.spriteSheet,
        -this.x - this.w/2,
        this.y,
        this.w,
        this.h,
        this.currentFrame * 49,
        0,
        49,
        49
      );
    }
    pop();
  }
}
