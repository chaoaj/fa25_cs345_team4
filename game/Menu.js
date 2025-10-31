class Menu {
  menu() {
    push();
    let but = new Button(200, 200, 200, 100,
      function () {
        if (mouseIsPressed && this.cursorDetect()) in_menu = false;
      },
      [rect(300, 150, 200, 100)]
    );
    but.show();
    but.clicked();
    pop();
  }
}
