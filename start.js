let stars = []; // Array to store star positions

// Function to generate stars (call once)
function generateStars() {
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
    });
  }
}

function drawStart() {
  background(0); // black night sky

  // Generate stars
  if (stars.length === 0) {
    generateStars();
  }

  // Draw stars
  fill(150);
  noStroke();
  for (let s of stars) {
    ellipse(s.x, s.y, s.size);
  }

  // Draw game title
  fill(255);
  textAlign(CENTER);
  textSize(50);
  text("Brick Breaker", width / 2, 150);

  // Draw instructions
  textSize(18);
  text(
    "Use the mouse to move the paddle.\nBreak all bricks to win!\nClick START to play",
    width / 2,
    220,
  );

  // Start button
  fill(8, 0, 128);
  rect(width / 2 - 100, 300, 200, 60, 10);

  // Start button text
  fill(255);
  textSize(24);
  text("START", width / 2, 340);
}

function handleStartMouse() {
  if (
    mouseX > width / 2 - 100 &&
    mouseX < width / 2 + 100 &&
    mouseY > 300 &&
    mouseY < 360
  ) {
    startGame();
    currentScreen = "game"; // Immediately go to game
  }
}

// Reset game variables
function startGame() {
  score = 0;
  paddle = new Paddle();
  ball = new Ball();
  createBricks();
}
