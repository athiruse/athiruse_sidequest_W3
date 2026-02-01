// Screen state
let currentScreen = "start";
let score = 0;

// Game objects
let paddle;
let ball;
let bricks = [];
let rows = 5;
let cols = 8;
let brickWidth;
let brickHeight = 30;

function setup() {
  createCanvas(800, 600);
  brickWidth = width / cols;

  // Initialize paddle, ball, and bricks
  paddle = new Paddle();
  ball = new Ball();
  createBricks();
}

function draw() {
  if (currentScreen === "start") {
    drawStart();
  } else if (currentScreen === "game") {
    drawGame();
  } else if (currentScreen === "end") {
    drawEnd();
  }
}

// Single mousePressed function for all screens
function mousePressed() {
  if (currentScreen === "start") {
    handleStartMouse();
  } else if (currentScreen === "end") {
    handleEndMouse();
  }
}
