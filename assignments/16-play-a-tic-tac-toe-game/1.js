const readline = require('readline-sync');

const GRID_SIZE = 3;
const EMPTY = ' ';

/**
 * Creates a 3x3 tic-tac-toe board filled with EMPTY spaces.
 * @returns {string[][]}
 */
function createGrid(size) {
  const grid = [];
  for (let row = 0; row < size; row++) {
    const row = [];
    for (let col = 0; col < size; col++) {
      row.push(EMPTY);
    }
    grid.push(row);
  }
  return grid;
}

/**
 * Prints the latest grid to the console
 * @param {string[][]} grid
 * @returns {void}
 */
function printGrid(grid) {
  for (let row = 0; row < grid.length; row++) {
    console.log('-------------');
    let separator = '|';
    for (let col = 0; col < grid.length; col++) {
      separator += ` ${grid[row][col]} |`;
    }
    console.log(separator);
  }
  console.log('-------------');
}

/**
 * Checks if a value is an integer in range 0..2.
 * @param {number} n
 * @returns {boolean}
 */
function isValidIndex(n) {
  return Number.isInteger(n) && n >= 0 && n < GRID_SIZE;
}

function askRow(player) {
  while (true) {
    const rowInput = +readline.question(
      'Enter a row (0, 1, or 2) for player ' + player + ' : ',
    );
    if (!isValidIndex(rowInput)) {
      console.log('Oops! You put a wrong row index. Try again!');
      continue;
    } else {
      return rowInput;
    }
  }
}

function askCol(player) {
  while (true) {
    const colInput = +readline.question(
      'Enter a column (0, 1, or 2) for player ' + player + ' : ',
    );
    if (!isValidIndex(colInput)) {
      console.log('Oops! You put a wrong column index. Try again!');
      continue;
    } else {
      return colInput;
    }
  }
}

function playGame(grid, player) {
  while (true) {
    const row = askRow(player);
    const col = askCol(player);

    if (grid[row][col] !== EMPTY) {
      console.log('\nSorry mate!, the cell is occupied. Try other cell! ');
      continue;
    } else {
      return { row, col };
    }
  }
}

function isPlayerWon(grid, player) {
  // check horizontal match
  for (let row = 0; row < GRID_SIZE; row++) {
    let rowMatch = true;
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] !== player) {
        rowMatch = false;
        break;
      }
    }

    if (rowMatch) return true;
  }

  //check vertical match
  for (let col = 0; col < GRID_SIZE; col++) {
    let colMatch = true;
    for (let row = 0; row < GRID_SIZE; row++) {
      if (grid[row][col] !== player) {
        colMatch = false;
        break;
      }
    }

    if (colMatch) return true;
  }

  //check diagonal1 match
  let diagonal1Match = true;
  for (let row = 0; row < GRID_SIZE; row++) {
    if (grid[row][row] !== player) {
      diagonal1Match = false;
      break;
    }
  }
  if (diagonal1Match) return true;

  //check diagonal2 match
  let diagonal2Match = true;
  for (let row = 0; row < GRID_SIZE; row++) {
    if (grid[row][GRID_SIZE - 1 - row] !== player) {
      diagonal2Match = false;
      break;
    }
  }
  if (diagonal2Match) return true;
}

function isPlayerDraw(grid) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === EMPTY) return false;
    }
  }
  return true;
}

// ------------------ MAIN PROGRAM ----------------

const boardGame = createGrid(GRID_SIZE);
let player = 'X';

printGrid(boardGame);

while (true) {
  const play = playGame(boardGame, player);
  boardGame[play.row][play.col] = player;

  console.log('');
  printGrid(boardGame);

  if (isPlayerWon(boardGame, player)) {
    console.log(`Player ${player} won`);
    break;
  }

  if (isPlayerDraw(boardGame)) {
    console.log('You guys got a Draw');
    break;
  }

  player = player === 'X' ? 'O' : 'X';
}
