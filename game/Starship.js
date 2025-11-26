class Starship extends Platform {
    constructor(x, y, w, h, sprite, start, end) {
        super(x, y, w, h, sprite, 1);
        this.sprite = sprite;
        this.start = start;
        this.end = end;
    }
    show() {
        this.x = this.start + Math.sin(frameCount / 20) * (this.end - this.start) / 2;

        push();
        image(this.sprite, this.x, this.y, this.w, this.h, 113, 82, 120, 129);
        pop();
    }
}
