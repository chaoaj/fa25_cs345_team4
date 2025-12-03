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
        let offset = 370 * (Math.floor(frameCount / 6) % 3);
        if (Math.sin(frameCount / 20) - Math.sin((frameCount - 1) / 20) > 0) {
            image(this.sprite, this.x, this.y, this.w, this.h, offset, 0, 370, 370);
        } else {
            scale(-1, 1);
            image(this.sprite, -this.x - this.w, this.y, this.w, this.h, offset, 0, 370, 370);
        }
        pop();
    }
}
