class Platform {
  constructor(x, y, w, h, img, shape = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    // default constructor if shape not specified
    if (shape === 1) {
      this.shape = function(){fill(100); rect(this.x, this.y, this.w, this.h);}
    } else if (shape){
      this.shape = shape;
    } else {
      this.shape = function() {
        fill(200);
        rect(this.x, this.y, this.w, this.h);
      }
    }
  }
  show() {
    if (this.img) {
      image(this.img, this.x, this.y, this.w, this.h);
    } else {
      this.shape();
    }
  }
}
