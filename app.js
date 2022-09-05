const snake = document.getElementsByClassName("snake");
const snakeSize = snake[0].clientWidth; // snake items always has the same width and height
const map = document.querySelector(".map");
const foodContainer = document.querySelector(".food-container");
const pointsElement = document.querySelector(".points");
const recordElement = document.querySelector(".record");
const mapWidth = map.clientWidth;
const mapHeigth = map.clientHeight;
const foodContainerSize = foodContainer.clientWidth; // food container always has the same width and height
let randomfoodX = 0;
let randomfoodY = 0;
let currentVector = "a";
let points = 0;
let isNewRecord = false;
let gameSpeed = 300;

alert("Control: w: forward, d: right, a: left, s: down");

if (!localStorage.getItem("record")) {
    localStorage.setItem("record", points);
}
recordElement.textContent = `Record: ${localStorage.getItem("record")}`;

// Initial values, the items contains info about each snake element
const snakeInfos = [
    // First item is the snake head
    {
        snakeVector: "a",
        offsetX: mapWidth / 2,
        offsetY: mapHeigth / 2,
    },
    {
        snakeVector: "a",
        offsetX: mapWidth / 2 + snakeSize,
        offsetY: mapHeigth / 2,
    },
    {
        snakeVector: "a",
        offsetX: mapWidth / 2 + snakeSize * 2,
        offsetY: mapHeigth / 2,
    },
    {
        snakeVector: "a",
        offsetX: mapWidth / 2 + snakeSize * 3,
        offsetY: mapHeigth / 2,
    },
];

// ============== Initial setup =================
for (let i = 0; i < snake.length; i++) {
    snake[i].style.left = `${snakeInfos[i].offsetX}px`;
    snake[i].style.top = `${snakeInfos[i].offsetY}px`;
}
createFood();

window.addEventListener("keydown", setSnakeHeadVector);

function setSnakeHeadVector(e) {
    switch (currentVector) {
        case "a": {
            if (e.key === "w" || e.key === "s") {
                snakeInfos[0].snakeVector = e.key;
            }
            break;
        }
        case "d": {
            if (e.key === "w" || e.key === "s") {
                snakeInfos[0].snakeVector = e.key;
            }
            break;
        }
        case "w": {
            if (e.key === "a" || e.key === "d") {
                snakeInfos[0].snakeVector = e.key;
            }
            break;
        }
        case "s": {
            if (e.key === "a" || e.key === "d") {
                snakeInfos[0].snakeVector = e.key;
            }
            break;
        }
    }
}

function moveSnake() {
    for (let i = 0; i < snake.length; i++) {
        switch (snakeInfos[i].snakeVector) {
            case "a": {
                snakeInfos[i].offsetX -= snakeSize;
                snake[i].style.left = `${snakeInfos[i].offsetX}px`;
                break;
            }
            case "d": {
                snakeInfos[i].offsetX += snakeSize;
                snake[i].style.left = `${snakeInfos[i].offsetX}px`;
                break;
            }
            case "w": {
                snakeInfos[i].offsetY -= snakeSize;
                snake[i].style.top = `${snakeInfos[i].offsetY}px`;
                break;
            }
            case "s": {
                snakeInfos[i].offsetY += snakeSize;
                snake[i].style.top = `${snakeInfos[i].offsetY}px`;
                break;
            }
        }
    }
    currentVector = snakeInfos[0].snakeVector;
}

function updateVectors() {
    for (let i = snakeInfos.length - 1; i > 0; i--) {
        snakeInfos[i].snakeVector = snakeInfos[i - 1].snakeVector;
    }
}

function createFood() {
    randomfoodX =
        Math.floor(Math.random() * (mapWidth / foodContainerSize - 1)) *
        foodContainerSize;
    randomfoodY =
        Math.floor(Math.random() * (mapHeigth / foodContainerSize - 1)) *
        foodContainerSize;
    let isInsideSnake = snakeInfos.some(
        (element) =>
            element.offsetX === randomfoodX && element.offsetY === randomfoodY
    );

    // If the food position matches the snake position, than create new positions
    while (isInsideSnake) {
        randomfoodX =
            Math.floor(Math.random() * (mapWidth / foodContainerSize - 1)) *
            foodContainerSize;
        randomfoodY =
            Math.floor(Math.random() * (mapHeigth / foodContainerSize - 1)) *
            foodContainerSize;
        isInsideSnake = snakeInfos.some(
            (element) =>
                element.offsetX === randomfoodX &&
                element.offsetY === randomfoodY
        );
    }

    foodContainer.style.left = `${randomfoodX}px`;
    foodContainer.style.top = `${randomfoodY}px`;
}

function growing() {
    const newSnake = document.createElement("div");
    newSnake.classList.add("snake");

    switch (snakeInfos[snakeInfos.length - 1].snakeVector) {
        case "a": {
            snakeInfos.push({
                snakeVector: snakeInfos[snakeInfos.length - 1].snakeVector,
                offsetX: snakeInfos[snakeInfos.length - 1].offsetX + snakeSize,
                offsetY: snakeInfos[snakeInfos.length - 1].offsetY,
            });
            break;
        }
        case "d": {
            snakeInfos.push({
                snakeVector: snakeInfos[snakeInfos.length - 1].snakeVector,
                offsetX: snakeInfos[snakeInfos.length - 1].offsetX - snakeSize,
                offsetY: snakeInfos[snakeInfos.length - 1].offsetY,
            });
            break;
        }
        case "w": {
            snakeInfos.push({
                snakeVector: snakeInfos[snakeInfos.length - 1].snakeVector,
                offsetX: snakeInfos[snakeInfos.length - 1].offsetX,
                offsetY: snakeInfos[snakeInfos.length - 1].offsetY + snakeSize,
            });
            break;
        }
        case "s": {
            snakeInfos.push({
                snakeVector: snakeInfos[snakeInfos.length - 1].snakeVector,
                offsetX: snakeInfos[snakeInfos.length - 1].offsetX,
                offsetY: snakeInfos[snakeInfos.length - 1].offsetY - snakeSize,
            });
            break;
        }
    }
    newSnake.style.left = `${snakeInfos[snakeInfos.length - 1].offsetX}px`;
    newSnake.style.top = `${snakeInfos[snakeInfos.length - 1].offsetY}px`;
    map.appendChild(newSnake);
}

function testFoodHit() {
    return (
        randomfoodX === snakeInfos[0].offsetX &&
        randomfoodY === snakeInfos[0].offsetY
    );
}

function testWallHit() {
    return (
        snakeInfos[0].offsetX < 0 ||
        snakeInfos[0].offsetX >= mapWidth ||
        snakeInfos[0].offsetY < 0 ||
        snakeInfos[0].offsetY >= mapHeigth
    );
}

function testBodyHit() {
    return snakeInfos.some(
        (element, index) =>
            index > 0 &&
            element.offsetX === snakeInfos[0].offsetX &&
            element.offsetY === snakeInfos[0].offsetY
    );
}

function getResult(isNewRecord) {
    document.body.innerHTML = `<div class="message-container">
        <div class="message-box">
            <h2 id="title">Your score:</h2>
            <h1 class="score"><span>${points}</span> Pts.</h1>
            <button type="button" class="btn">TRY AGAIN</button>
        </div>
    </div>`;
    if (isNewRecord) {
        document.getElementById("title").textContent = "New Record!";
        isNewRecord = false;
    }
    const btn = document.querySelector(".btn");
    btn.addEventListener("click", () => location.reload());
}

function updatePoints() {
    points++;
    pointsElement.textContent = `Points: ${points}`;
}

function runGame() {
    if (testFoodHit()) {
        growing();
        createFood();
        updatePoints();
        if (points % 5 === 0) {
            if (gameSpeed > 100) {
                gameSpeed -= 25;
            } else if (gameSpeed > 60) {
                gameSpeed -= 10;
            }
            clearInterval(gameInterval);
            gameInterval = setInterval(runGame, gameSpeed);
        }
    }

    moveSnake();

    if (testWallHit() || testBodyHit()) {
        clearInterval(gameInterval);
        if (localStorage.getItem("record") < points) {
            localStorage.setItem("record", points);
            isNewRecord = true;
        }
        getResult(isNewRecord);
    }

    /* Every item get the vector value from the previous item,
    but the first item get it from the user in the eventListener.
    This vector modify is important when the snake is changing direction. */
    updateVectors();
}

let gameInterval = setInterval(runGame, gameSpeed);
