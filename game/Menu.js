class Menu {
  menu() {
    push();
    let but = new Button(200,200,200,100, function() {
    if(mouseIsPressed && this.cursorDetect())
      in_menu = false;
  });
    but.show()
    but.clicked();
    blendMode(OVERLAY);
    pop();
  }
}
