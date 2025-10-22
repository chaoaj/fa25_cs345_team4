class Goal {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  show() {
    push();
    fill(0);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
  touch(obj) {
    return (
      this.x < obj.x + obj.w &&
      this.x + this.w > obj.x &&
      this.y < obj.y + obj.h &&
      this.y + this.h > obj.y
    );
  }
}