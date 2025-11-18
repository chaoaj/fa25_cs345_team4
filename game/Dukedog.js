class DukeDog {
  constructor(x, y, frameWidth, frameHeight, numFrames, spriteSheet) {
    this.x = x;
    this.y = y;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.numFrames = numFrames;
    this.spriteSheet = spriteSheet;

    this.currentFrame = 0;
    this.frameCounter = 0;
    this.frameSpeed = 6; // animation speed

    this.speed = 1.5; // follow speed
    this.verticalSpeed = 1;
    this.verticalDelay = 30;
    this.verticalTimer = 0;
    this.upwardSpeed = 0.25;
  }

  update() {
    if (player) {
      if (player.x > this.x) {
        this.x += this.speed;
      } else if (player.x < this.x) {
        this.x -= this.speed;
      }

      let dy = player.y - this.y;

      if (dy < 0) {
        this.verticalTimer++;
      } else {
        this.verticalTimer = 0;
      }

      if (Math.abs(dy) > 5) {
        if (dy < 0) {
          if (this.verticalTimer >= this.verticalDelay) {
            this.y += dy * this.upwardSpeed;
          }
        } else {
          this.y += dy * 0.05;
        }
      }
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
      this.x + this.frameWidth < p.x ||
      this.x > p.x + p.w ||
      this.y + this.frameHeight < p.y ||
      this.y > p.y + p.h
    );
  }

  display() {
    image(
      this.spriteSheet,
      this.x,
      this.y,
      this.frameWidth,
      this.frameHeight,
      this.currentFrame * (this.frameWidth / DOG_SCALE),
      0,
      this.frameWidth / DOG_SCALE,
      this.frameHeight / DOG_SCALE
    );
  }
}
