// script.js

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Load snake images
const snake1Img = new Image();
snake1Img.src = 'https://i.imgur.com/QX7hKpF.png'; // Shell icon
const snake2Img = new Image();
snake2Img.src = 'https://i.imgur.com/2l0ZpUd.png'; // Scissors icon

const fruitImg = new Image();
fruitImg.src = 'https://i.imgur.com/IaUrttj.png'; // Fruit icon

// Snake objects
const snake1 = {
  body: [{x: 5, y: 5}],
  direction: 'right',
  nextDirection: 'right',
};

const snake2 = {
  body: [{x: 25, y: 15}],
  direction: 'left',
  nextDirection: 'left',
};

// Fruit position
let fruit = {x: 10, y: 10};

// Key controls
document.addEventListener('keydown', (e) => {
  switch(e.key){
    case 'ArrowUp': if(snake1.direction !== 'down') snake1.nextDirection = 'up'; break;
    case 'ArrowDown': if(snake1.direction !== 'up') snake1.nextDirection = 'down'; break;
    case 'ArrowLeft': if(snake1.direction !== 'right') snake1.nextDirection = 'left'; break;
    case 'ArrowRight': if(snake1.direction !== 'left') snake1.nextDirection = 'right'; break;

    case 'w': if(snake2.direction !== 'down') snake2.nextDirection = 'up'; break;
    case 's': if(snake2.direction !== 'up') snake2.nextDirection = 'down'; break;
    case 'a': if(snake2.direction !== 'right') snake2.nextDirection = 'left'; break;
    case 'd': if(snake2.direction !== 'left') snake2.nextDirection = 'right'; break;
  }
});

// Generate random fruit position
function randomFruit() {
  const x = Math.floor(Math.random() * (canvasWidth / gridSize));
  const y = Math.floor(Math.random() * (canvasHeight / gridSize));
  return {x, y};
}

// Update snake positions
function updateSnake(snake) {
  snake.direction = snake.nextDirection;
  const head = {...snake.body[0]};

  switch(snake.direction) {
    case 'up': head.y -= 1; break;
    case 'down': head.y += 1; break;
    case 'left': head.x -= 1; break;
    case 'right': head.x += 1; break;
  }

  // Wrap around edges
  if(head.x < 0) head.x = canvasWidth / gridSize - 1;
  if(head.x >= canvasWidth / gridSize) head.x = 0;
  if(head.y < 0) head.y = canvasHeight / gridSize - 1;
  if(head.y >= canvasHeight / gridSize) head.y = 0;

  snake.body.unshift(head);

  // Check fruit collision
  if(head.x === fruit.x && head.y === fruit.y){
    fruit = randomFruit();
  } else {
    snake.body.pop(); // remove tail if not eating fruit
  }
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw fruit
  ctx.drawImage(fruitImg, fruit.x * gridSize, fruit.y * gridSize, gridSize, gridSize);

  // Draw snake1
  snake1.body.forEach(segment => {
    ctx.drawImage(snake1Img, segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  // Draw snake2
  snake2.body.forEach(segment => {
    ctx.drawImage(snake2Img, segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

// Main game loop
function gameLoop() {
  updateSnake(snake1);
  updateSnake(snake2);
  draw();
}

// Run game at fixed interval
setInterval(gameLoop, 150);
