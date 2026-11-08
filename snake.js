const ctx = canvas.getContext("2d");
const rand = () => Math.floor(Math.random() * 15);
let snake = [{ x: 7, y: 7 }];
let dir = { x: 1, y: 0 };
let food = { x: rand(), y: rand() };

function newFood() {
    let next;
    do {
        next = { x: rand(), y: rand() };
    } while (snake.some((segment) => segment.x === next.x && segment.y === next.y));
    return next;
}

setInterval(() => {
    const x = (snake[0].x + dir.x + 15) % 15;
    const y = (snake[0].y + dir.y + 15) % 15;

    const ateFood = x === food.x && y === food.y;
    const body = ateFood ? snake : snake.slice(0, -1);
    if (body.some((segment) => segment.x === x && segment.y === y)) {
        location.reload();
        return;
    }

    snake.unshift({ x, y });
    if (ateFood) {
        food = newFood();
    } else {
        snake.pop();
    }

    ctx.clearRect(0, 0, 300, 300);
    [food, ...snake].forEach((cell, i) => {
        ctx.fillStyle = i ? "#22c55e" : "#f43f5e";
        ctx.fillRect(cell.x * 20, cell.y * 20, 18, 18);
    });
    score.textContent = snake.length - 1;
}, 150);

onkeydown = (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
    }
    if (e.key === "ArrowUp" && !dir.y) dir = { x: 0, y: -1 };
    if (e.key === "ArrowDown" && !dir.y) dir = { x: 0, y: 1 };
    if (e.key === "ArrowLeft" && !dir.x) dir = { x: -1, y: 0 };
    if (e.key === "ArrowRight" && !dir.x) dir = { x: 1, y: 0 };
};