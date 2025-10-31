class Button {
  constructor(
    x,
    y,
    w,
    h,
    clicked = function () {
      if (mouseIsPressed && this.cursorDetect()) console.log("hi");
    },
    shape = rect(100, 100, 20, 20)
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.x2 = x + w;
    this.y2 = y + h;
    this.clicked = clicked;
    this.shape = shape;
  }
  cursorDetect() {
    return (
      this.x <= mouseX &&
      mouseX <= this.x2 &&
      this.y <= mouseY &&
      mouseY <= this.y2
    );
  }
  show() {
    push();
    for (let p of this.shape) {
      p;
    }
    pop();
  }
}
