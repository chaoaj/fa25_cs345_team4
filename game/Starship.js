class Starship extends Platform {
    constructor(x, y, w, h, sprite, shape = null, start, end) {
        super(x, y, w, h, sprite, shape);
        this.start = start; // x coordinate to start from
        this.end = end; // x coordinate to move to
        this.sprite = sprite; // the sprite used
        this.shape = function() {
            push();
            fill(color(255, 255, 255, 0));
            stroke(color(255, 255, 255, 0));
            this.x = start + Math.sin(frameCount/20)*30; rect(this.x, this.y, this.w, this.h);
            image(this.sprite, this.x, this.y, this.w, this.h, 113, 82, 120, 129);
            if (this.x <= mouseX && mouseX <= this.x + w && this.y <= mouseY && mouseY <= this.y + h)
            pop();
        }
    }
}
