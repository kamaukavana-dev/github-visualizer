const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let snake = [{x: 50, y: 150}];
let dx = 10;
let dy = 0;

let food = spawnFood();
let obstacles = [];

let score = 0;
let level = 1;

document.addEventListener("keydown", changeDirection);

function spawnFood() {
  return {
    x: Math.floor(Math.random() * 60) * 10,
    y: Math.floor(Math.random() * 30) * 10
  };
}

function spawnObstacles() {
  obstacles = [];
  for (let i = 0; i < level + 2; i++) {
    obstacles.push({
      x: Math.floor(Math.random() * 60) * 10,
      y: Math.floor(Math.random() * 30) * 10
    });
  }
}

function changeDirection(e) {
  const key = e.key;

  if (key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -10;
  } else if (key === "ArrowDown" && dy === 0) {
    dx = 0; dy = 10;
  } else if (key === "ArrowLeft" && dx === 0) {
    dx = -10; dy = 0;
  } else if (key === "ArrowRight" && dx === 0) {
    dx = 10; dy = 0;
  }
}

function update() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};

  // Wall collision
  if (head.x < 0 || head.x >= 600 || head.y < 0 || head.y >= 300) {
    resetGame();
    return;
  }

  // Self collision
  for (let part of snake) {
    if (part.x === head.x && part.y === head.y) {
      resetGame();
      return;
    }
  }

  // Obstacle collision
  for (let obs of obstacles) {
    if (obs.x === head.x && obs.y === head.y) {
      resetGame();
      return;
    }
  }

  snake.unshift(head);

  // Food collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = spawnFood();

    // Level up every 5 points
    if (score % 5 === 0) {
      level++;
      spawnObstacles();
    }
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  // Clear
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 0, 600, 300);

  // Snake
  ctx.fillStyle = "#39ff14";
  snake.forEach(s => ctx.fillRect(s.x, s.y, 10, 10));

  // Food
  ctx.fillStyle = "#ff3b3b";
  ctx.fillRect(food.x, food.y, 10, 10);

  // Obstacles
  ctx.fillStyle = "#8b0000";
  obstacles.forEach(o => ctx.fillRect(o.x, o.y, 10, 10));

  // UI update
  document.getElementById("score").textContent = score;
  document.getElementById("level").textContent = level;
}

function resetGame() {
  snake = [{x: 50, y: 150}];
  dx = 10; dy = 0;
  score = 0;
  level = 1;
  obstacles = [];
  food = spawnFood();
}

setInterval(update, 100);
