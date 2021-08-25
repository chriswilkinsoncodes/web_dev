// scrimba
//   - Frontend Developer Career Path
//   - CSS & JavaScript Fundamentals
//   - Build a dice game

// Create variables for the game state
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById('player1Dice');
const player2Dice = document.getElementById('player2Dice');
const player1Scoreboard = document.getElementById('player1Scoreboard');
const player2Scoreboard = document.getElementById('player2Scoreboard');
const message = document.getElementById('message');
const rollBtn = document.getElementById('rollBtn');
const resetBtn = document.getElementById('resetBtn');

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  player1Turn = true;
  player1Scoreboard.textContent = player1Score;
  player2Scoreboard.textContent = player2Score;
  player1Dice.textContent = '-';
  player2Dice.textContent = '-';
  message.textContent = "Player 1's Turn";
  resetBtn.style.display = 'none';
  rollBtn.style.display = 'inline-block';
  player1Dice.classList.add('active');
  player2Dice.classList.remove('active');
}

/* Hook up a click event listener to the Roll Dice Button. */
rollBtn.addEventListener('click', function () {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  if (player1Turn) {
    player1Dice.textContent = randomNumber;
    player1Score += randomNumber;
    player1Scoreboard.textContent = player1Score;
    player1Dice.classList.remove('active');
    player2Dice.classList.add('active');
  } else {
    player2Dice.textContent = randomNumber;
    player2Score += randomNumber;
    player2Scoreboard.textContent = player2Score;
    player1Dice.classList.add('active');
    player2Dice.classList.remove('active');
  }

  message.textContent =
    'Player ' + (player1Turn ? '1' : '2') + ` rolled ${randomNumber}`;

  if (Math.max(player1Score, player2Score) > 19) {
    rollBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    message.textContent = 'Player ' + (player1Turn ? '1' : '2') + ' has won!';
  }

  player1Turn = !player1Turn;
});

resetBtn.addEventListener('click', resetGame);
