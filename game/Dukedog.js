
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
  }

  update() {
    if (!player) {
      return;
    }
    // --- FOLLOW PLAYER ---
    if (player) {
      if (player.x > this.x) {
        this.x += this.speed;
      } else if (player.x < this.x) {
        this.x -= this.speed;
      }

      let dy = player.y - this.y;
      if (Math.abs(dy) > 5) {
        this.y += dy * 0.05;
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
      this.x -= (player.x - this.x) * 0.2;

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
      this.currentFrame * this.frameWidth,
      0,
      this.frameWidth,
      this.frameHeight
    );
  }
}
