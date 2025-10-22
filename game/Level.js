// Defines the hitboxes for level geometry
class Level {
  constructor(padding = 2) {
    this.padding = padding; // how far away player collides
    this.platforms = []; // List of platforms in level
    this.goals = []; // List of goals in level
  }
  // adds a platform to the level
  addPlatform(platform) {
    this.platforms.push(platform);
  }
  // adds a goal to the level
  addGoal(goal) {
    this.goals.push(goal);
  }
  // makes the platforms and goal visible
  show() {
    for (let p of this.platforms)
      p.show();
    for (let p of this.goals)
      p.show();
  }
  collision(player) {
    // canvas floor logic
    if (player.y + player.vy >= 400 - player.h) {
      player.y = 400 - player.h;
      player.vy = 0;
      player.ground = true;
    }
    // x and y coords, then width and height adding to top left corner of a rect to get other corners
    for (let p of this.platforms) {
      let x1 = p.x;
      let y1 = p.y;
      let x2 = x1 + p.w;
      let y2 = y1 + p.h;
      // vertical collision logic
      if (x1 - player.w <= player.x && player.x <= x2) {
        if (player.vy < 0) {
          if (player.y + player.vy <= y2 + player.h / 2 && player.y > y1) {
            player.vy = 0;
            player.y = y2 + this.padding;
          }
        }
        if (player.vy > 0 && player.y < y1) {
          if (player.y + player.vy >= y1 - player.h) {
            player.y = y1 - player.h;
            player.vy = 0;
            player.ground = true;
          }
        }
      }
      // horizontal collision logic
      if (
        player.y + player.h > y1 + this.padding &&
        player.y < y2 - this.padding
      ) {
        if (player.vx > 0) {
          if (
            player.x + player.w + player.vx >= x1 &&
            player.x < (x1 + x2) / 2
          ) {
            player.x = x1 - player.w - this.padding;
            player.vx = 0;
          }
        }
        if (player.vx < 0) {
        }
        if (player.x + player.vx <= x2 && player.x > (x1 + x2) / 2) {
          player.x = x2 + this.padding;
          player.vx = 0;
        }
      }
    }
  }
}
