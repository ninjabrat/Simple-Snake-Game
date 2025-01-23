const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const scoreBoard = document.getElementById('score-board');
const highscoreBoard = document.getElementById('highscore-board');
const startRestartBtn = document.getElementById('start-restart-btn');

const boardSize = 400;
const tileSize = 20;
canvas.width = canvas.height = boardSize;

let snake, apple, direction, nextDirection, gameInterval, isMoving, score, highscore;

function initGame() {
    snake = [{ x: tileSize * 5, y: tileSize * 5 }];
    direction = { x: 0, y: 0 }; // Initial direction is stationary
    nextDirection = { x: 0, y: 0 }; // Next direction is stationary
    isMoving = false; // Snake is not moving initially
    score = 0; // Reset score
    scoreBoard.textContent = `Score: ${score}`;
    highscore = localStorage.getItem('highscore') || 0;
    highscoreBoard.textContent = `Highscore: ${highscore}`;
    spawnApple();
    clearInterval(gameInterval);
    drawBoard();
    drawSnake();
    drawApple();
}

function spawnApple() {
    let validPosition = false;
    while (!validPosition) {
        apple = {
            x: Math.floor(Math.random() * (boardSize / tileSize)) * tileSize,
            y: Math.floor(Math.random() * (boardSize / tileSize)) * tileSize
        };
        // Check if apple is spawning on the snake
        validPosition = !snake.some(segment => segment.x === apple.x && segment.y === apple.y);
    }
}

function drawBoard() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, boardSize, boardSize);
}

function drawSnake() {
    ctx.fillStyle = '#00f';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, tileSize, tileSize);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(segment.x, segment.y, tileSize, tileSize);
    });
}

function drawApple() {
    ctx.fillStyle = '#f00';
    ctx.fillRect(apple.x, apple.y, tileSize, tileSize);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(apple.x, apple.y, tileSize, tileSize);
}

function updateSnakePosition() {
    if (!isMoving) return;

    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    // Check for collisions with walls or self
    if (newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        clearInterval(gameInterval);
        if (score > highscore) {
            highscore = score;
            localStorage.setItem('highscore', highscore);
            highscoreBoard.textContent = `Highscore: ${highscore}`;
        }
        return;
    }

    snake.unshift(newHead);

    // Check if snake has eaten the apple
    if (newHead.x === apple.x && newHead.y === apple.y) {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
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
    let newDirection = null;

    if (e.key === 'ArrowUp' && direction.y === 0) newDirection = { x: 0, y: -tileSize };
    if (e.key === 'ArrowDown' && direction.y === 0) newDirection = { x: 0, y: tileSize };
    if (e.key === 'ArrowLeft' && direction.x === 0) newDirection = { x: -tileSize, y: 0 };
    if (e.key === 'ArrowRight' && direction.x === 0) newDirection = { x: tileSize, y: 0 };
    if (e.key === 'w' && direction.y === 0) newDirection = { x: 0, y: -tileSize };
    if (e.key === 's' && direction.y === 0) newDirection = { x: 0, y: tileSize };
    if (e.key === 'a' && direction.x === 0) newDirection = { x: -tileSize, y: 0 };
    if (e.key === 'd' && direction.x === 0) newDirection = { x: tileSize, y: 0 };

    // Update direction only if there's a valid new direction
    if (newDirection) {
        direction = newDirection;
        isMoving = true; // Start moving the snake
    }
});

startRestartBtn.addEventListener('click', () => {
    initGame();
    gameInterval = setInterval(gameLoop, 100);
});const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const scoreBoard = document.getElementById('score-board');
const highscoreBoard = document.getElementById('highscore-board');
const startRestartBtn = document.getElementById('start-restart-btn');

const boardSize = 400;
const tileSize = 20;
canvas.width = canvas.height = boardSize;

let snake, apple, direction, nextDirection, gameInterval, isMoving, score, highscore;

function initGame() {
    snake = [{ x: tileSize * 5, y: tileSize * 5 }];
    direction = { x: 0, y: 0 }; // Initial direction is stationary
    nextDirection = { x: 0, y: 0 }; // Next direction is stationary
    isMoving = false; // Snake is not moving initially
    score = 0; // Reset score
    scoreBoard.textContent = `Score: ${score}`;
    highscore = localStorage.getItem('highscore') || 0;
    highscoreBoard.textContent = `Highscore: ${highscore}`;
    spawnApple();
    clearInterval(gameInterval);
    drawBoard();
    drawSnake();
    drawApple();
}

function spawnApple() {
    let validPosition = false;
    while (!validPosition) {
        apple = {
            x: Math.floor(Math.random() * (boardSize / tileSize)) * tileSize,
            y: Math.floor(Math.random() * (boardSize / tileSize)) * tileSize
        };
        // Check if apple is spawning on the snake
        validPosition = !snake.some(segment => segment.x === apple.x && segment.y === apple.y);
    }
}

function drawBoard() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, boardSize, boardSize);
}

function drawSnake() {
    ctx.fillStyle = '#00f';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, tileSize, tileSize);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(segment.x, segment.y, tileSize, tileSize);
    });
}

function drawApple() {
    ctx.fillStyle = '#f00';
    ctx.fillRect(apple.x, apple.y, tileSize, tileSize);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(apple.x, apple.y, tileSize, tileSize);
}

function updateSnakePosition() {
    if (!isMoving) return;

    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    // Check for collisions with walls or self
    if (newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        clearInterval(gameInterval);
        if (score > highscore) {
            highscore = score;
            localStorage.setItem('highscore', highscore);
            highscoreBoard.textContent = `Highscore: ${highscore}`;
        }
        return;
    }

    snake.unshift(newHead);

    // Check if snake has eaten the apple
    if (newHead.x === apple.x && newHead.y === apple.y) {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
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
    let newDirection = null;

    if (e.key === 'ArrowUp' && direction.y === 0) newDirection = { x: 0, y: -tileSize };
    if (e.key === 'ArrowDown' && direction.y === 0) newDirection = { x: 0, y: tileSize };
    if (e.key === 'ArrowLeft' && direction.x === 0) newDirection = { x: -tileSize, y: 0 };
    if (e.key === 'ArrowRight' && direction.x === 0) newDirection = { x: tileSize, y: 0 };
    if (e.key === 'w' && direction.y === 0) newDirection = { x: 0, y: -tileSize };
    if (e.key === 's' && direction.y === 0) newDirection = { x: 0, y: tileSize };
    if (e.key === 'a' && direction.x === 0) newDirection = { x: -tileSize, y: 0 };
    if (e.key === 'd' && direction.x === 0) newDirection = { x: tileSize, y: 0 };

    // Update direction only if there's a valid new direction
    if (newDirection) {
        direction = newDirection;
        isMoving = true; // Start moving the snake
    }
});

startRestartBtn.addEventListener('click', () => {
    initGame();
    gameInterval = setInterval(gameLoop, 100);
});
