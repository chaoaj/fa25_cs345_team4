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
        let offset = 140 * (Math.floor(frameCount / 6) % 3);
        if (Math.sin(frameCount / 20) - Math.sin((frameCount - 1) / 20) > 0) {
            image(this.sprite, this.x, this.y, this.w, this.h, 113 + offset, 82, 120, 129);
        } else {
            scale(-1, 1);
            image(this.sprite, -this.x - this.w, this.y, this.w, this.h, 113 + offset, 82, 120, 129);
        }
        pop();
    }
}
