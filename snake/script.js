const snake = [{ x: 70, y: 20 }, { x: 70, y: 30 }, { x: 80, y: 30 }];

const food = [];
let foodBuf = [];

const MAX_Y = 450;
const MAX_X = 590;
const STEP = 10;

let _snake_direction = null;

snake.forEach(e => {
  const div = document.createElement("div");

  e.link = div;
  div.className = "block";

  div.style.top = `${e.y}px`;
  div.style.left = `${e.x}px`;

  root.appendChild(div);
});

function helpSwitchEndToHead() {
  snake.unshift(snake.pop());

  snake[0].link.style.top = `${snake[0].y}px`;
  snake[0].link.style.left = `${snake[0].x}px`;
}

setInterval(() => {
  if (food.length < 6) {
    const div = document.createElement("div");
    div.className = "food";
    const randX = Math.ceil(Math.random() * (MAX_X / 10 - STEP)) * 10;
    const randY = Math.ceil(Math.random() * (MAX_Y / 10 - STEP)) * 10;
    foodBuf.push({
      x: randX,
      y: randY,
      link: div
    });
    div.style.top = `${foodBuf[foodBuf.length - 1].y}px`;
    div.style.left = `${foodBuf[foodBuf.length - 1].x}px`;

    let check = food.some(function(e) {
      return e == foodBuf[foodBuf.length - 1];
    });

    if (check == false) {
      food.push(foodBuf[foodBuf.length - 1]);
      root.appendChild(div);
    }
  }
}, 1000);

window.onkeyup = event => {
  if ([37, 38, 39, 40, 65, 87, 68, 83].includes(event.keyCode)) {
    const x = snake[0].x;
    const y = snake[0].y;
    switch (event.keyCode) {
      case 65: //a
        //todo
        if (_snake_direction == "right") return;
        snake[snake.length - 1].x = x - STEP >= 0 ? x - STEP : MAX_X;
        snake[snake.length - 1].y = y;

        helpSwitchEndToHead();

        _snake_direction = "left";

        break;

      case 87: //w
        //todo
        if (_snake_direction == "down") return;
        snake[snake.length - 1].x = x;
        snake[snake.length - 1].y = y - STEP >= 0 ? y - STEP : MAX_Y - STEP;

        helpSwitchEndToHead();

        _snake_direction = "up";

        break;

      case 68: //d
        //todo
        if (_snake_direction == "left") return;
        snake[snake.length - 1].x = x + STEP <= MAX_X ? x + STEP : 0;
        snake[snake.length - 1].y = y;

        helpSwitchEndToHead();

        _snake_direction = "right";

        break;

      case 83: //s
        //todo
        if (_snake_direction == "up") return;
        snake[snake.length - 1].x = x;
        snake[snake.length - 1].y = y + STEP < MAX_Y ? y + STEP : 0;

        helpSwitchEndToHead();

        _snake_direction = "down";

        break;
    }
  }

  document.querySelector(".control_panel").innerHTML = _snake_direction;
};
