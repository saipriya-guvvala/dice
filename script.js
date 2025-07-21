let currentPlayer = 0;

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');

let scores = [0, 0];
let currentScore = 0;
let playing = true;

// ROLL BUTTON
rollBtn.addEventListener('click', () => {
  if (!playing) return;

  const number = Math.floor(Math.random() * 6) + 1;
  diceImg.src = `./dice/${number}.png`;

  if (number === 1) {
    currentScore = 0;
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    switchPlayer();
  } else {
    currentScore += number;
    document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
  }
});

// HOLD BUTTON
holdBtn.addEventListener('click', () => {
  if (!playing) return;

  scores[currentPlayer] += currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer];
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = 0;

  if (scores[currentPlayer] >= 10) {
    playing = false;
    document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
  } else {
    switchPlayer();
  }
});

// SWITCH PLAYER
function switchPlayer() {
  document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  document.querySelector(`.player--${currentPlayer}`).classList.add('player--active');
}

// NEW GAME BUTTON
newGameBtn.addEventListener('click', () => {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  currentPlayer = 0;

  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;

  diceImg.src = './dice/1.png';

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
});
