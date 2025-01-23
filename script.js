const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const startRestartBtn = document.getElementById('start-restart-btn');

const boardSize = 400;
const tileSize = 20;
canvas.width = canvas.height = boardSize;

let snake, apple, direction, nextDirection, gameInterval;

function initGame() {
    snake = [{ x: tileSize * 5, y: tileSize * 5 }];
    direction = { x: 0, y: 0 }; // Initial direction is stationary
    nextDirection = { x: 0, y: 0 }; // Next direction is stationary
    spawnApple();
    clearInterval(gameInterval);
    drawBoard();
    drawSnake();
    drawApple();
}

function spawnApple() {
    apple = {
        x: Math.floor(Math.random() * (boardSize / tileSize)) * tileSize,
        y: Math.floor(Math.random() * (boardSize / tileSize)) * tileSize
    };
}

function drawBoard() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, boardSize, boardSize);
}

function drawSnake() {
    ctx.fillStyle = '#00f';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, tileSize, tileSize));
}

function drawApple() {
    ctx.fillStyle = '#f00';
    ctx.fillRect(apple.x, apple.y, tileSize, tileSize);
}

function updateSnakePosition() {
    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    // Check for collisions with walls or self
    if (newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        clearInterval(gameInterval);
        return;
    }

    snake.unshift(newHead);

    // Check if snake has eaten the apple
    if (newHead.x === apple.x && newHead.y === apple.y) {
        spawnApple();
    } else {
        snake.pop();
    }
}

function gameLoop() {
    drawBoard();
    drawSnake();
    drawApple();
    updateSnakePosition();
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction.y === 0) nextDirection = { x: 0, y: -tileSize };
    if (e.key === 'ArrowDown' && direction.y === 0) nextDirection = { x: 0, y: tileSize };
    if (e.key === 'ArrowLeft' && direction.x === 0) nextDirection = { x: -tileSize, y: 0 };
    if (e.key === 'ArrowRight' && direction.x === 0) nextDirection = { x: tileSize, y: 0 };
    if (e.key === 'w' && direction.y === 0) nextDirection = { x: 0, y: -tileSize };
    if (e.key === 's' && direction.y === 0) nextDirection = { x: 0, y: tileSize };
    if (e.key === 'a' && direction.x === 0) nextDirection = { x: -tileSize, y: 0 };
    if (e.key === 'd' && direction.x === 0) nextDirection = { x: tileSize, y: 0 };

    // Update direction only if there's a valid next direction
    if (nextDirection.x !== 0 || nextDirection.y !== 0) {
        direction = nextDirection;
    }
});

startRestartBtn.addEventListener('click', () => {
    clearInterval(gameInterval); // Clear any existing game intervals
    initGame();
    gameInterval = setInterval(gameLoop, 100);
});
