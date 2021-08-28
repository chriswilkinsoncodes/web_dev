// scrimba
// - Frontend Developer Career
// - CSS & JavaScript Fundamentals
// - Build a snake game

// TODO: set initial speed; set acceleration; set width

const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const scoreEl = document.getElementById('score');
const width = 10;

let intervalTime = document.querySelector('input[name="speed"]:checked').value;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let pointValue = 1;
// let intervalTime;
let timerID = 0;
let speed = 25;

const food = [
  {
    name: 'apple',
    icon: '<i class="fas fa-apple-alt"></i>',
    points: 4,
  },
  {
    name: 'carrot',
    icon: '<i class="fas fa-carrot"></i>',
    points: 3,
  },
  {
    name: 'lime',
    icon: '<i class="fas fa-lemon"></i>',
    points: 2,
  },
  {
    name: 'bread',
    icon: '<i class="fas fa-bread-slice"></i>',
    points: 1,
  },
];

function createGrid() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    //create element
    const square = document.createElement('div');
    //add styling to the element
    square.classList.add('square');
    //put the element into our grid
    grid.appendChild(square);
    //push it into a new squares array
    squares.push(square);
  }
}
createGrid();

currentSnake.forEach((index) => squares[index].classList.add('snake'));

function startGame() {
  // remove snake
  currentSnake.forEach((index) => squares[index].classList.remove('snake'));
  // remove apple (if restarting)
  squares[appleIndex].innerHTML = '';
  squares[appleIndex].classList.remove(food[randomFoodIndex].name);
  clearInterval(timerID);
  currentSnake = [2, 1, 0];
  direction = 1;
  score = 0;
  // reset score in browser
  scoreEl.textContent = score;
  intervalTime = document.querySelector('input[name="speed"]:checked').value;
  generateApple();
  // re-add class of snake to new currentSnake
  currentSnake.forEach((index) => squares[index].classList.add('snake'));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
    return clearInterval(timerId);

  //remove last element from our currentSnake array
  const tail = currentSnake.pop();
  //remove styling from last element
  squares[tail].classList.remove('snake');
  //add square in direction we are heading *
  currentSnake.unshift(currentSnake[0] + direction);

  //deal with snake head gets apple
  if (squares[currentSnake[0]].classList.contains(food[randomFoodIndex].name)) {
    //remove the class of apple
    squares[currentSnake[0]].innerHTML = '';
    squares[currentSnake[0]].classList.remove(food[randomFoodIndex].name);
    //grow our snake by adding class of snake to it
    squares[tail].classList.add('snake');
    //grow our snake array
    currentSnake.push(tail);
    //add one to the score
    score += pointValue;
    //generate new apple
    generateApple();
    //display our score
    scoreEl.textContent = score;
    //speed up our snake
    clearInterval(timerId);
    intervalTime -= speed;
    timerId = setInterval(move, intervalTime);
  }

  // * add styling so we can see it
  squares[currentSnake[0]].classList.add('snake');
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  randomFoodIndex = Math.floor(Math.random() * food.length);
  squares[appleIndex].innerHTML = food[randomFoodIndex].icon;
  squares[appleIndex].classList.add(food[randomFoodIndex].name);
  pointValue = food[randomFoodIndex].points;
}
generateApple();

function control(e) {
  if (e.key === 'ArrowRight') {
    direction = 1;
  } else if (e.key === 'ArrowUp') {
    direction = -width;
  } else if (e.key === 'ArrowLeft') {
    direction = -1;
  } else if (e.key === 'ArrowDown') {
    direction = +width;
  }
}

document.addEventListener('keyup', control);
startButton.addEventListener('click', startGame);
