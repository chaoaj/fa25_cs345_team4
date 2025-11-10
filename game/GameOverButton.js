class GameOverButton {
    constructor(x, y, w, h, onClick, onDraw) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.onClick = onClick;
        this.onDraw = onDraw;
      }

      cursorDetect() {
        return mouseX > this.x && mouseX < this.x + this.w &&
               mouseY > this.y && mouseY < this.y + this.h;
      }

      clicked() {
        this.onClick.call(this);
      }

      show() {
        this.onDraw.call(this);
      }
    }