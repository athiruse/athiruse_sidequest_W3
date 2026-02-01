let endStars = []; // Separate array for end screen stars

function generateEndStars() {
  for (let i = 0; i < 200; i++) {
    endStars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
    });
  }
}

function drawEnd() {
  background(0); // black night sky

  // Generate stars once
  if (endStars.length === 0) {
    generateEndStars();
  }

  // Draw stars
  fill(150);
  noStroke();
  for (let s of endStars) {
    ellipse(s.x, s.y, s.size);
  }

  // Show win/lose message
  fill(255);
  textAlign(CENTER);
  textSize(50);
  if (score === 400) {
    text("Congratulations! You won!", width / 2, 150);
  } else {
    text("Game Over", width / 2, 150);
  }

  // Show final score
  textSize(22);
  text("Final Score: " + score, width / 2, 220);
  text("So close... let's try once more", width / 2, 250);

  // Play Again button
  fill(40, 40, 128);
  rect(width / 2 - 120, 300, 240, 60, 10);

  fill(250);
  textSize(24);
  text("PLAY AGAIN", width / 2, 340);
}

function handleEndMouse() {
  if (
    mouseX > width / 2 - 120 &&
    mouseX < width / 2 + 120 &&
    mouseY > 300 &&
    mouseY < 360
  ) {
    // Reset stars for next time
    endStars = [];

    // Reset the game
    startGame();
    currentScreen = "game";
  }
}
