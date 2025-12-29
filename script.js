const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let snake = [{x: 200, y: 200}, {x: 190, y: 200}, {x: 180, y: 200}];
let dx = 10;
let dy = 0;
let foodX, foodY;

function createFood() {
    foodX = Math.round((Math.random() * (canvas.width - 10)) / 10) * 10;
    foodY = Math.round((Math.random() * (canvas.height - 10)) / 10) * 10;
}

function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = '#00ff41';
        ctx.fillRect(part.x, part.y, 10, 10);
    });
}

function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === foodX && head.y === foodY) {
        score += 10;
        createFood();
    } else {
        snake.pop();
    }
}

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, 10, 10);
}

function main() {
    if (didGameEnd()) return;
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        main();
    }, 100);
}

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeft = snake[0].x < 0;
    const hitRight = snake[0].x > canvas.width - 10;
    const hitTop = snake[0].y < 0;
    const hitBottom = snake[0].y > canvas.height - 10;
    return hitLeft || hitRight || hitTop || hitBottom;
}

function changeDirection(event) {
    const LEFT_KEY = 37; const RIGHT_KEY = 39; const UP_KEY = 38; const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10; const goingDown = dy === 10;
    const goingRight = dx === 10; const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) { dx = -10; dy = 0; }
    if (keyPressed === UP_KEY && !goingDown) { dx = 0; dy = -10; }
    if (keyPressed === RIGHT_KEY && !goingLeft) { dx = 10; dy = 0; }
    if (keyPressed === DOWN_KEY && !goingUp) { dx = 0; dy = 10; }
}

document.addEventListener("keydown", changeDirection);
createFood();
main();

// Manejo de navegación simple (SPA)
const contentDiv = document.getElementById('main-content');
const routes = {
    '#about': '<h2>About</h2><p>I am a software engineer...</p>',
    '#projects': '<h2>Projects</h2><ul><li>Project 1</li></ul>'
};

window.addEventListener('hashchange', () => {
    contentDiv.innerHTML = routes[window.location.hash] || routes['#about'];
});
// Carga inicial
contentDiv.innerHTML = routes['#about'];
