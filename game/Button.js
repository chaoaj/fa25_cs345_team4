class Button {
  constructor(
    x,
    y,
    w,
    h,
    clicked = function () {
      if (mouseIsPressed && this.cursorDetect()) console.log("hi");
    }
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.x2 = x + w;
    this.y2 = y + h;
    this.clicked = clicked;
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
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
