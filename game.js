function drawGame() {
  background(20);

  // Show score
  fill(255);
  textAlign(LEFT);
  textSize(20);
  text("Score: " + score, 20, 30);

  // Update and show paddle
  paddle.update();
  paddle.show();

  // Update and show ball
  ball.update();
  ball.show();
  ball.checkPaddle(paddle);

  // Draw bricks and check collision
  for (let i = 0; i < bricks.length; i++) {
    if (!bricks[i].broken) {
      bricks[i].show();
      if (ball.checkBrick(bricks[i])) {
        bricks[i].broken = true;
        score += 10;
      }
    }
  }

  // Lose condition: ball falls below canvas
  if (ball.y - ball.r > height) {
    currentScreen = "end";
  }

  // Win condition: all bricks broken
  if (bricks.every((b) => b.broken)) {
    currentScreen = "end";
  }
}

// Paddle class
class Paddle {
  constructor() {
    this.w = 120;
    this.h = 20;
    this.x = width / 2 - this.w / 2;
    this.y = height - 40;
  }

  update() {
    this.x = mouseX - this.w / 2;
    this.x = constrain(this.x, 0, width - this.w);
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h, 10);
  }
}

// Ball class
class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 15;
    this.speedX = 5;
    this.speedY = -5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off walls
    if (this.x - this.r < 0 || this.x + this.r > width) this.speedX *= -1;
    if (this.y - this.r < 0) this.speedY *= -1;
  }

  show() {
    fill(200, 0, 255);
    ellipse(this.x, this.y, this.r * 2);
  }

  checkPaddle(p) {
    if (
      this.x + this.r > p.x &&
      this.x - this.r < p.x + p.w &&
      this.y + this.r > p.y &&
      this.y - this.r < p.y + p.h
    ) {
      this.speedY *= -1;
      this.y = p.y - this.r; // prevent sticking
    }
  }

  checkBrick(brick) {
    if (
      this.x + this.r > brick.x &&
      this.x - this.r < brick.x + brick.w &&
      this.y + this.r > brick.y &&
      this.y - this.r < brick.y + brick.h
    ) {
      this.speedY *= -1;
      return true;
    }
    return false;
  }
}

// Brick class
class Brick {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.broken = false;
  }

  show() {
    fill(0, 200, 200);
    rect(this.x, this.y, this.w, this.h, 5);
  }
}

// Create bricks
function createBricks() {
  bricks = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = c * brickWidth;
      let y = r * brickHeight + 50;
      bricks.push(new Brick(x, y, brickWidth - 5, brickHeight - 5));
    }
  }
}
