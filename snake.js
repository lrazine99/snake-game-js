const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cte = canvas.getContext("2d");

ctx.fillStyle = "#ffffff";
let a = 0;
let xChanged = 0;
let yChanged = 240;
const canvasSize = 510;
const size = 15;

const ListernerArrows = () => {
  document.addEventListener(
    "keydown",
    (arrow) => {
      let direction = Snake.info;
      if (
        arrow.key === "ArrowLeft" ||
        arrow.key === "ArrowRight" ||
        arrow.key === "ArrowDown" ||
        arrow.key === "ArrowUp"
      ) {
        if (direction === "ArrowLeft") {
          if (arrow.key != "ArrowRight") Snake.setDirection(arrow.key);
        } else if (direction === "ArrowRight" || direction == undefined) {
          if (arrow.key != "ArrowLeft") Snake.setDirection(arrow.key);
        } else if (direction === "ArrowUp") {
          if (arrow.key != "ArrowDown") Snake.setDirection(arrow.key);
        } else if (direction === "ArrowDown") {
          if (arrow.key != "ArrowUp") Snake.setDirection(arrow.key);
        }
      }
    },
    { once: false }
  );
};

ListernerArrows();

class target {
  constructor(target) {
    this.target = target;
    this.randomGreat1;
    this.randomGreat2;
    this.snake = [];
  }
  setPoints(snake) {
    this.snake = snake;

    return this;
  }

  setTarget() {
    let randomGreat2;
    let randomGreat1;
    const limit = canvasSize / size;
    do {
      randomGreat1 = Math.floor(Math.random() * (limit - 0) + 0) * size;
      randomGreat2 = Math.floor(Math.random() * (limit - 0) + 0) * size;
    } while (this.getSnake(randomGreat1, randomGreat2));

    this.randomGreat1 = randomGreat1;
    this.randomGreat2 = randomGreat2;
    ctx.fillStyle = "#f00020";
    ctx.fillRect(randomGreat1, randomGreat2, size, size);
  }

  getSnake(x, y) {
    if (this.snake[0] === x && this.snake[0] === y) return true;
    for (let i = 0; i < this.snake.length; i++) {
      if (this.snake[i][0] === x && this.snake[i][1] === y) {
        return true;
      }
    }
  }
}

class snake {
  constructor(position) {
    this.position = position;
    this.skines = [];
    this.xChanged;
    this.yChanged;
    this.direction;
    this.directionArray = [];
    this.info;
  }

  setInfo(info) {
    this.info = info;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  getDirection() {
    return this.direction;
  }

  setSkin(xChanged, yChanged, direction, boolean) {
    const index = this.skines.length;

    if (boolean) {
      if (index > 1) {
        let lastIndex = this.skines.length - 1;
        let secondIndex = lastIndex - 1;
        let x = this.skines[lastIndex][0] - this.skines[secondIndex][0];
        let y = this.skines[lastIndex][1] - this.skines[secondIndex][1];

        xChanged = this.skines[lastIndex][0];
        yChanged = this.skines[lastIndex][1];

        if (x === -size || x === canvasSize) {
          xChanged -= size;
          if (xChanged < 0) xChanged = canvasSize - size;
        } else if (x === size || x === -canvasSize) {
          xChanged += size;
          if (xChanged >= canvasSize) xChanged = 0;
        }

        if (y === -size || y === canvasSize) {
          yChanged -= size;
          if (yChanged < 0) yChanged = canvasSize - size;
        } else if (y === size || y === -canvasSize) {
          yChanged += size;
          if (yChanged >= canvasSize) yChanged = 0;
        }
      } else {
        if (direction == "ArrowLeft") {
          xChanged += size;
          if (xChanged >= canvasSize) xChanged = 0;
        } else if (direction == "ArrowRight") {
          xChanged -= size;
          if (xChanged < 0) xChanged = canvasSize - size;
        } else if (direction == "ArrowUp") {
          yChanged += size;
          if (yChanged >= canvasSize) yChanged = 0;
        } else if (direction == "ArrowDown") {
          yChanged -= size;
          if (yChanged < 0) yChanged = canvasSize - size;
        } else {
          xChanged -= size;
          if (xChanged < 0) xChanged = canvasSize - size;
        }
      }
    }

    this.xChanged = xChanged;
    this.yChanged = yChanged;
    if (boolean) {
      this.skines.push([this.xChanged, this.yChanged]);
    } else {
      this.skines.unshift([this.xChanged, this.yChanged]);
    }
  }

  setMove() {
    this.skines.forEach((element) => {
      ctx.fillStyle = "green";
      ctx.strokeRect(element[0], element[1], size, size);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(element[0], element[1], size, size);
    });
  }

  setClean() {
    this.skines.forEach((element) => {
      ctx.clearRect(element[0], element[1], size, size);
    });
  }

  checkDeath(x, y) {
    if (this.skines.length > 2) {
      for (let i = 1; i < this.skines.length; i++) {
        if (this.skines[i][0] === x && this.skines[i][1] === y) {
          window.location.reload();
        }
      }
    }
  }
}

const Snake = new snake("init");
const arrayOfSnakes = [Snake];
const initTarget = new target("init");
const firstPos = [xChanged, yChanged];
initTarget.setPoints(firstPos).setTarget();

const game = (param) => {
  //ListernerArrows();

  a++;

  const direction = Snake.getDirection();

  let speed = Snake.skines.length;
  speed += 3;

  Snake.setClean();

  if (
    initTarget.randomGreat1 === xChanged &&
    initTarget.randomGreat2 === yChanged
  ) {
    initTarget.setPoints(Snake.skines);
    Snake.setSkin(xChanged, yChanged, "none", true);
    initTarget.setTarget();

    let audio = document.createElement("audio");
    audio.setAttribute("autoplay", "autoplay");
    let eleme = document.createElement("source");
    eleme.setAttribute("src", "audio.mp3");
    eleme.setAttribute("type", "audio/mpeg");
    audio.appendChild(eleme);
  }

  Snake.skines.pop();

  switch (direction) {
    case "ArrowLeft":
      Snake.setInfo("ArrowLeft");
      xChanged -= size;
      if (xChanged < 0) xChanged = canvasSize - size;
      break;
    case "ArrowRight":
      Snake.setInfo("ArrowRight");
      xChanged += size;
      if (xChanged >= canvasSize) xChanged = 0;
      break;
    case "ArrowUp":
      Snake.setInfo("ArrowUp");
      yChanged -= size;
      if (yChanged < 0) yChanged = canvasSize - size;
      break;
    case "ArrowDown":
      Snake.setInfo("ArrowDown");
      yChanged += size;
      if (yChanged >= canvasSize) yChanged = 0;
      break;

    default:
      if (a < 2) {
        xChanged = 0;
      } else {
        xChanged += size;
        if (xChanged >= canvasSize) xChanged = 0;
      }
  }

  Snake.setSkin(xChanged, yChanged, direction, false);
  Snake.setMove();
  Snake.checkDeath(xChanged, yChanged);

  setTimeout(() => {
    window.requestAnimationFrame(game);
  }, 1000 / speed);
};

window.requestAnimationFrame(game);
