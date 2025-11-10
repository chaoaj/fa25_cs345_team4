class Platform {
  constructor(x, y, w, h, img = null, shape = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    // default constructor if shape not specified
    if (shape == 1) {
      this.shape = function(){
        push();
        fill(100);
        rect(this.x, this.y, this.w, this.h);
        if(img != null) {
          image(this.img, this.x, this.y, this.w, this.h);
        }
        pop();
      }
    } 
    else {
      this.shape = shape;
    }
  }
  show() {
      this.shape();
  }
}
