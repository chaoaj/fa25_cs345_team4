class TophatDuck {
    constructor(x, y, w, h, numFrames, spriteSheet) {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.w = w;
    this.h = h;
    this.numFrames = numFrames;
    this.spriteSheet = spriteSheet;

    this.frameWidth = spriteSheet.width / numFrames;
    this.frameHeight = spriteSheet.height;
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.frameSpeed = 8;
    this.alive = true;
  }

  update() {
    if (!this.alive) {
      return;
    }
    this.y = this.baseY + Math.sin(frameCount / 20) * 5;

     this.frameCounter++;
        if (this.frameCounter >= this.frameSpeed) {
            this.currentFrame = (this.currentFrame + 1) % this.numFrames;
            this.frameCounter = 0;
        }

    }


  display() {
    if (!this.alive) {
      return;
    }
    image(this.spriteSheet, this.x, this.y, this.w, this.h,
    this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight
    );

  }

  checkCollision(player) {
    if (!this.alive) {
      return;
    }
    const touching =
      player.x < this.x + this.w &&
      player.x + player.w > this.x &&
      player.y < this.y + this.h &&
      player.y + player.h > this.y;

    if (touching) {
      healthSystem.activateHearts();
      this.alive = false;
    }
  }
}
