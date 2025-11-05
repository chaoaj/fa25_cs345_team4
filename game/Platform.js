class Platform {
  constructor(x, y, w, h, shape = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // default constructor if shape not specified
    if (shape == 1) {
      this.shape = function(){fill(0); rect(this.x, this.y, this.w, this.h);}
    } else {
      this.shape = shape;
    }
  }
  show() {
    push();
    this.shape();
    pop();
  }
}
