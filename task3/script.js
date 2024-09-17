let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const gameStatus = document.getElementById('game-status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-btn');

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell click
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (board[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  updateCell(clickedCell, clickedCellIndex);
  checkResult();
}

// Update the cell with the current player's marker
function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

// Check for a win, loss, or tie
function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameStatus.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    gameStatus.textContent = 'It\'s a Draw!';
    gameActive = false;
    return;
  }

  changePlayer();
}

// Switch to the other player
function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset the game board
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  gameStatus.textContent = `Player X's Turn`;
  cells.forEach(cell => cell.textContent = '');
}

// Add event listeners to each cell and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
