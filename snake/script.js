let field = document.createElement("div");
document.body.appendChild(field);
field.classList.add("field");

let speed = 550;

let score = 0;
let newLevelScore = 2;

for (let i = 1; i <= 100; i++) {
  let excel = document.createElement("div");
  field.appendChild(excel);
  excel.classList.add("excel");
}

let excel = document.getElementsByClassName("excel");
let x = 1;
let y = 10;

for (let i = 0; i < excel.length; i++) {
  if (x > 10) {
    x = 1;
    y--;
  }
  excel[i].setAttribute("posX", x);
  excel[i].setAttribute("posY", y);
  x++;
}

function generateSnake() {
  let posX = Math.round(Math.random() * (10 - 3) + 3);
  let posY = Math.round(Math.random() * (10 - 1) + 1);
  return [posX, posY];
}

let coordinates = generateSnake();

function generateSnakeBody() {
  let snakeBody = [
    document.querySelector(
      '[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'
    ),
    document.querySelector(
      '[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'
    ),
    document.querySelector(
      '[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]'
    )
  ];

  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add("snake-body");
  }

  snakeBody[0].classList.add("snake-head");
  snakeBody[0].classList.add("head-right");
  snakeBody[snakeBody.length - 1].classList.add("tail-left");

  return snakeBody;
}

let food;

function createFood() {
  function generateFood() {
    let posX = Math.round(Math.random() * (10 - 1) + 1);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
  }

  let foodCoordinates = generateFood();

  food = document.querySelector(
    '[posX = "' + foodCoordinates[0] + '"][posY = "' + foodCoordinates[1] + '"]'
  );

  let foodAdded = false;

  while (foodAdded == false) {
    if (food.classList.contains("snake-body")) {
      foodCoordinates = generateFood();
      food = document.querySelector(
        '[posX = "' +
          foodCoordinates[0] +
          '"][posY = "' +
          foodCoordinates[1] +
          '"]'
      );
    } else {
      food.classList.add("food");
      foodAdded = true;
    }
  }
}

let direction = "right";
let steps = false;

let scoreOutput = document.querySelector(".score");

let snakeBody = generateSnakeBody();

function move() {
  let snakeCoordinates = [
    snakeBody[0].getAttribute("posX"),
    snakeBody[0].getAttribute("posY")
  ];

  snakeBody[0].classList.remove("snake-head");
  snakeBody[0].classList.remove("head-left");
  snakeBody[0].classList.remove("head-right");
  snakeBody[0].classList.remove("head-up");
  snakeBody[0].classList.remove("head-down");
  snakeBody[snakeBody.length - 1].classList.remove("tail-left");
  snakeBody[snakeBody.length - 1].classList.remove("tail-right");
  snakeBody[snakeBody.length - 1].classList.remove("tail-up");
  snakeBody[snakeBody.length - 1].classList.remove("tail-down");
  snakeBody[snakeBody.length - 1].classList.remove("snake-body");
  snakeBody.pop();

  if (direction == "right") {
    if (snakeCoordinates[0] < 10) {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' +
            (+snakeCoordinates[0] + 1) +
            '"][posY = "' +
            snakeCoordinates[1] +
            '"]'
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'
        )
      );
    }
  } else if (direction == "left") {
    if (snakeCoordinates[0] > 1) {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' +
            (+snakeCoordinates[0] - 1) +
            '"][posY = "' +
            snakeCoordinates[1] +
            '"]'
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'
        )
      );
    }
  } else if (direction == "up") {
    if (snakeCoordinates[1] < 10) {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' +
            snakeCoordinates[0] +
            '"][posY = "' +
            (+snakeCoordinates[1] + 1) +
            '"]'
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'
        )
      );
    }
  } else if (direction == "down") {
    if (snakeCoordinates[1] > 1) {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' +
            snakeCoordinates[0] +
            '"][posY = "' +
            (snakeCoordinates[1] - 1) +
            '"]'
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'
        )
      );
    }
  }

  let snakeTail = [
    snakeBody[snakeBody.length - 1].getAttribute("posX"),
    snakeBody[snakeBody.length - 1].getAttribute("posY")
  ];
  let snakeBeforeTail = [
    snakeBody[snakeBody.length - 2].getAttribute("posX"),
    snakeBody[snakeBody.length - 2].getAttribute("posY")
  ];

  console.log(snakeBody);
  console.log("before " + snakeBeforeTail);
  console.log("tail " + snakeTail);

  if (
    snakeBody[0].getAttribute("posX") == food.getAttribute("posX") &&
    snakeBody[0].getAttribute("posY") == food.getAttribute("posY")
  ) {
    food.classList.remove("food");
    let a = snakeBody[snakeBody.length - 1].getAttribute("posX");
    let b = snakeBody[snakeBody.length - 1].getAttribute("posY");
    snakeBody.push(
      document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]')
    );

    createFood();

    score++;
    scoreOutput.innerHTML = `${score}`;

    if (score > newLevelScore) {
      speed = speed - 25;

      clearInterval(interval);
      startInterval(interval);
    }
  }

  if (snakeBody[0].classList.contains("snake-body")) {
    snakeBody[0].classList.add("red");
    setTimeout(() => {
      clearInterval(interval);
      let restartConfirm = confirm("You lose. Do you want to try again?");
      if (restartConfirm) {
        snakeBody[0].classList.remove("red");
        restartGame();
      } else {
        alert("K, bye");
      }
    }, 0);
  }

  snakeBody[0].classList.add("snake-head");
  if (direction == "left") {
    snakeBody[0].classList.add("head-left");
  } else if (direction == "right") {
    snakeBody[0].classList.add("head-right");
  } else if (direction == "up") {
    snakeBody[0].classList.add("head-up");
  } else if (direction == "down") {
    snakeBody[0].classList.add("head-down");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add("snake-body");
  }

  if (snakeBeforeTail[0] > snakeTail[0]) {
    if (snakeBeforeTail[0] == 10 && snakeTail[0] == 1) {
      snakeBody[snakeBody.length - 1].classList.add("tail-right");
    } else {
      snakeBody[snakeBody.length - 1].classList.add("tail-left");
    }
  } else if (snakeBeforeTail[0] < snakeTail[0]) {
    if (snakeBeforeTail[0] == 1 && snakeTail[0] == 10) {
      snakeBody[snakeBody.length - 1].classList.add("tail-left");
    } else {
      snakeBody[snakeBody.length - 1].classList.add("tail-right");
    }
  } else if (snakeBeforeTail[1] > snakeTail[1]) {
    if (snakeBeforeTail[1] == 10 && snakeTail[1] == 1) {
      snakeBody[snakeBody.length - 1].classList.add("tail-up");
    } else {
      snakeBody[snakeBody.length - 1].classList.add("tail-down");
    }
  } else if (snakeBeforeTail[1] < snakeTail[1]) {
    if (snakeBeforeTail[1] == 1 && snakeTail[1] == 10) {
      snakeBody[snakeBody.length - 1].classList.add("tail-down");
    } else {
      snakeBody[snakeBody.length - 1].classList.add("tail-up");
    }
  }

  steps = true;
}

let interval = setInterval(() => {
  move();
}, speed);

function startInterval(_interval) {
  newLevelScore += 2;
  interval = setInterval(() => {
    move();
  }, speed);
}

function restartGame() {
  pause();
  // snakeBody[0].style.backgroundColor = null;
  score = 0;
  newLevelScore = 2;
  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.remove("snake-head");
    snakeBody[i].classList.remove("head-left");
    snakeBody[i].classList.remove("head-right");
    snakeBody[i].classList.remove("head-up");
    snakeBody[i].classList.remove("head-down");
    snakeBody[i].classList.remove("snake-body");
    snakeBody[i].classList.remove("tail-left");
    snakeBody[i].classList.remove("tail-right");
    snakeBody[i].classList.remove("tail-up");
    snakeBody[i].classList.remove("tail-down");
    food.classList.remove("food");
  }
  direction = "right";
  snakeBody = generateSnakeBody();
  createFood();
  speed = 500;
  pause();
}

function pause() {
  if (interval) {
    document.querySelector(".pause-screen").style.display = "flex";
    clearInterval(interval);
    interval = null;
  } else {
    document.querySelector(".pause-screen").style.display = "none";
    interval = setInterval(move, speed);
  }
}

createFood();

window.addEventListener("keydown", function(e) {
  if (e.keyCode == 32) {
    pause();
  }
  if (steps) {
    if ((e.keyCode == 37 || e.keyCode == 65) && direction != "right") {
      direction = "left";
      steps = false;
    } else if ((e.keyCode == 38 || e.keyCode == 87) && direction != "down") {
      direction = "up";
      steps = false;
    } else if ((e.keyCode == 39 || e.keyCode == 68) && direction != "left") {
      direction = "right";
      steps = false;
    } else if ((e.keyCode == 40 || e.keyCode == 83) && direction != "up") {
      direction = "down";
      steps = false;
    }
  }
});
