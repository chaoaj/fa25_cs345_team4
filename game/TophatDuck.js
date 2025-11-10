class TophatDuck {
    constructor(x, y, w, h, numFrames, spriteSheet) {
    this.x = x;
    this.y = y;
    this.frameWidth = w;
    this.frameHeight = h;
    this.numFrames = numFrames;
    this.spriteSheet = spriteSheet;
  }

  display() {
    image(this.sprite, this.x, this.y, this.w, this.h);

  }

  checkCollision(player) {
    const touching =
      player.x < this.x + this.w &&
      player.x + player.w > this.x &&
      player.y < this.y + this.h &&
      player.y + player.h > this.y;

    if (touching) {
      player.activateInvincibility();
    }
  }

  placement() {
    this.x = random(0, width - this.w);
    this.y = random(0, height - this.h);
  }
}
