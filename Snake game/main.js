// declaring variables
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
// highscore info
const highScoreText = document.querySelector("#highScoreText");
const resetBtn = document.querySelector("#resetBtn");
//new button
const startBtn = document.querySelector("#startBtn");
// creating variables to hold the width and height of the canvas
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
// assigning colours to the objects that'll be created
const snakeColor = "lightgreen";
const snakeBorder = "black";
const boardBackground = "white";
const foodColor = "red";
// assigning unit size
const unitSize = 25;
let running = false;
// the speed at which the snake will move each click
let xVelocity = unitSize; //if xVelocity is + move to the right. if it's - move to the left
let yVelocity = 0; //up or down move (y-axis)
//food coordinate
let foodX;
let foodY;
let score = 0;
//new highscore
let highScore = 0;
//snake position and size. each object in the array is a snake bodypart
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];
//whenever a key is pressed in the window the snake changes direction
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
startBtn.addEventListener("click", gameStart);

function gameStart() {
  running = true;
  scoreText.textContent = score;
  highScoreText.textContent = highScore;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 200);
  }
  else {
    displayGameOver();
  }
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
  function randomFood(min, max) {
    //creating a where the food will be place. Because each unit is 25, foodX should be divisible by 25(it moves 25units at a time)
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize)
  // ctx.beginPath()
  // ctx.fillStyle = "red";
  // ctx.strokeStyle = foodColor;
  
  // ctx.beginPath();
  // ctx.arc(foodX, foodY, unitSize, unitSize, 10 * Math.PI);
  // ctx.fill();
}
function moveSnake() {
  const head = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity
  };
  snake.unshift(head);
  //if food is eaten
  //eliminate the tail each time the snake moves
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score++;
    highScore++;
    scoreText.textContent = score;
    highScoreText.textContent = highScore;
    createFood();
  }
  else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  //loop through the snake array
  snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const goingUp = (yVelocity == -unitSize);
  const goingDown = (yVelocity == unitSize);
  const goingRight = (xVelocity == unitSize);
  const goingLeft = (xVelocity == -unitSize);

  switch (true) {
    case (keyPressed == LEFT && !goingRight):
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case (keyPressed == UP && !goingDown):
      yVelocity = -unitSize;
      xVelocity = 0;
      break;
    case (keyPressed == RIGHT && !goingLeft):
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case (keyPressed == DOWN && !goingUp):
      yVelocity = unitSize;
      xVelocity = 0;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case (snake[0].x < 0):
      running = false;
      break;
    case (snake[0].x >= gameWidth):
      running = false;
      break;
    case (snake[0].y < 0):
      running = false;
      break;
    case (snake[0].y >= gameHeight):
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i++){
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    };
  }
}
function displayGameOver() {
  ctx.font = "50px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!", gameWidth/2, gameHeight/2);
  running = false;
}

function resetGame() {
  snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
  ];
  gameStart();
}
