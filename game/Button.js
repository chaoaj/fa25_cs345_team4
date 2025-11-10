class Button {
  constructor(x, y, w, h,
    // just an example function for click detection
    clicked = function () {
      if (mouseIsPressed && this.cursorDetect()) console.log("hi");
    },
    shape = function () {
      rect(100, 100, 20, 20);
    }
  ) {
    // dimension variables
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // hitbox helper variables
    this.x2 = x + w;
    this.y2 = y + h;
    // function variables
    this.clicked = clicked;
    this.shape = shape;
  }
  // detects if cursor is in the defined hitbox
  cursorDetect() {
    return (
      this.x <= mouseX &&
      mouseX <= this.x2 &&
      this.y <= mouseY &&
      mouseY <= this.y2
    );
  }
  // shows button via running whatever is put in the shape function
  show() {
    this.shape();
  }
}
