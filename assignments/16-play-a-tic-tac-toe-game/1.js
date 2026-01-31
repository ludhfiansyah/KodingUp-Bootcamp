const readline = require('readline-sync');

const GRID_SIZE = 3;
const EMPTY = ' ';

/**
 * Creates an N x N tic-tac-toe grid filled with EMPTY spaces.
 * @param {number} size - The grid size (e.g., 3 for 3x3).
 * @returns {string[][]} A 2D array representing the grid.
 */
function createGrid(size) {
  const grid = [];

  for (let rowIdx = 0; rowIdx < size; rowIdx++) {
    const rowCells = [];
    for (let colIdx = 0; colIdx < size; colIdx++) {
      rowCells.push(EMPTY);
    }
    grid.push(rowCells);
  }

  return grid;
}

/**
 * Prints the current grid to the console using the required format.
 * @param {string[][]} grid - The current game grid.
 * @returns {void}
 */
function printGrid(grid) {
  for (let row = 0; row < grid.length; row++) {
    console.log('-------------');

    let line = '|';
    for (let col = 0; col < grid.length; col++) {
      line += ` ${grid[row][col]} |`;
    }
    console.log(line);
  }

  console.log('-------------');
}

/**
 * Checks whether an index is valid for the current grid (0..GRID_SIZE-1).
 * @param {number} n - The index to validate.
 * @returns {boolean} True if valid, otherwise false.
 */
function isValidIndex(n) {
  return Number.isInteger(n) && n >= 0 && n < GRID_SIZE;
}

/**
 * Prompts the user for a row/column index until they enter a valid value.
 * @param {"row"|"column"} type - Which index is being requested.
 * @param {"X"|"O"} player - Current player's token.
 * @returns {number} A valid index (0..2).
 */
function askIndex(type, player) {
  while (true) {
    const input = +readline.question(
      `Enter a ${type} (0, 1, or 2) for player ${player} : `,
    );

    if (!isValidIndex(input)) {
      console.log(`Oops! You put a wrong ${type} index. Try again!`);
      continue;
    }

    return input;
  }
}

/**
 * Asks the player to choose a cell (row & column) until they pick an EMPTY cell.
 * @param {string[][]} grid - The current game grid.
 * @param {"X"|"O"} player - Current player's token.
 * @returns {{ row: number, col: number }} The valid move coordinates.
 */
function playGame(grid, player) {
  while (true) {
    const row = askIndex('row', player);
    const col = askIndex('column', player);

    if (grid[row][col] !== EMPTY) {
      console.log('\nSorry mate!, the cell is occupied. Try other cell! ');
      continue;
    }

    return { row, col };
  }
}

/**
 * Checks whether the given player has won the game.
 * @param {string[][]} grid - The current game grid.
 * @param {"X"|"O"} player - Player token to check.
 * @returns {boolean} True if player has won, otherwise false.
 */
function isPlayerWon(grid, player) {
  // Rows
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

  // Columns
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

  // Diagonal (top-left -> bottom-right)
  let diag1 = true;
  for (let i = 0; i < GRID_SIZE; i++) {
    if (grid[i][i] !== player) {
      diag1 = false;
      break;
    }
  }
  if (diag1) return true;

  // Diagonal (top-right -> bottom-left)
  let diag2 = true;
  for (let i = 0; i < GRID_SIZE; i++) {
    if (grid[i][GRID_SIZE - 1 - i] !== player) {
      diag2 = false;
      break;
    }
  }
  if (diag2) return true;

  return false;
}

/**
 * Checks whether the board is full (draw condition if no winner).
 * @param {string[][]} grid - The current game grid.
 * @returns {boolean} True if full, otherwise false.
 */
function isPlayerDraw(grid) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === EMPTY) return false;
    }
  }
  return true;
}

// ------------------ MAIN PROGRAM ------------------

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
