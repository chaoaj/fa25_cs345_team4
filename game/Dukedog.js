let dukeDog;
let dukeSprite;

function preload() {
  // Load the sprite sheet
  dukeSprite = loadImage("assets/OFFICIALDukeDog.jpg");
}

function setup() {
  createCanvas(800, 400);
  // frameWidth = sprite width / 4
  dukeDog = new DukeDog(50, 200, dukeSprite.width / 4, dukeSprite.height, 4, dukeSprite);
}

function draw() {
  background(255);
  dukeDog.update();
  dukeDog.display();
}

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
    this.frameSpeed = 6; // Lower = faster
    this.speedX = 2; // Movement speed
  }

  update() {
    // Move horizontally
    this.x += this.speedX;

    // Bounce off walls
    if (this.x > width - this.frameWidth || this.x < 0) {
      this.speedX *= -1;
    }

    // Animate
    this.frameCounter++;
    if (this.frameCounter >= this.frameSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.numFrames;
      this.frameCounter = 0;
    }
  }

  display() {
    // Draw one frame from the sprite sheet
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
