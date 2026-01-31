const readline = require('readline-sync');

const EMPTY = ' ';
const SIZE = 3;

/**
 * Creates a game state object.
 * @returns {{ board: string[][], currentPlayer: "X"|"O", size: number }}
 */
function createGame() {
  const board = [];
  for (let r = 0; r < SIZE; r++) {
    const row = [];
    for (let c = 0; c < SIZE; c++) row.push(EMPTY);
    board.push(row);
  }

  return {
    board,
    currentPlayer: 'X',
    size: SIZE,
  };
}

/**
 * Prints the current board.
 * @param {{ board: string[][], size: number }} game
 */
function printBoard(game) {
  const { board, size } = game;

  for (let r = 0; r < size; r++) {
    console.log('-------------');
    let line = '|';
    for (let c = 0; c < size; c++) {
      line += ` ${board[r][c]} |`;
    }
    console.log(line);
  }
  console.log('-------------');
}

/**
 * Checks whether an index is valid for the board size.
 * @param {number} n
 * @param {number} size
 * @returns {boolean}
 */
function isValidIndex(n, size) {
  return Number.isInteger(n) && n >= 0 && n < size;
}

/**
 * Prompts row/column input (DRY).
 * @param {"row"|"column"} type
 * @param {"X"|"O"} player
 * @param {number} size
 * @returns {number}
 */
function askIndex(type, player, size) {
  while (true) {
    const input = +readline.question(
      `Enter a ${type} (0, 1, or 2) for player ${player}: `,
    );

    if (!isValidIndex(input, size)) {
      console.log(`Invalid ${type}. Please enter 0, 1, or 2.\n`);
      continue;
    }

    return input;
  }
}

/**
 * Creates all winning lines (array of coordinate arrays).
 * Example line: [ [0,0], [0,1], [0,2] ]
 * @param {number} size
 * @returns {number[][][]}
 */
function getWinningLines(size) {
  const lines = [];

  // Rows
  for (let r = 0; r < size; r++) {
    const line = [];
    for (let c = 0; c < size; c++) line.push([r, c]);
    lines.push(line);
  }

  // Columns
  for (let c = 0; c < size; c++) {
    const line = [];
    for (let r = 0; r < size; r++) line.push([r, c]);
    lines.push(line);
  }

  // Diagonal: top-left -> bottom-right
  const diag1 = [];
  for (let i = 0; i < size; i++) diag1.push([i, i]);
  lines.push(diag1);

  // Diagonal: top-right -> bottom-left
  const diag2 = [];
  for (let i = 0; i < size; i++) diag2.push([i, size - 1 - i]);
  lines.push(diag2);

  return lines;
}

/**
 * Returns true if the player matches any winning line.
 * @param {{ board: string[][], size: number }} game
 * @param {"X"|"O"} player
 * @param {number[][][]} lines
 * @returns {boolean}
 */
function hasWon(game, player, lines) {
  const { board } = game;

  for (const line of lines) {
    let allMatch = true;

    for (const [r, c] of line) {
      if (board[r][c] !== player) {
        allMatch = false;
        break;
      }
    }

    if (allMatch) return true;
  }

  return false;
}

/**
 * Returns true if there are no empty cells.
 * @param {{ board: string[][], size: number }} game
 * @returns {boolean}
 */
function isDraw(game) {
  const { board, size } = game;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === EMPTY) return false;
    }
  }
  return true;
}

/**
 * Switch current player in the game object.
 * @param {{ currentPlayer: "X"|"O" }} game
 */
function switchPlayer(game) {
  game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
}

/**
 * Places a move if the cell is empty (keeps asking until valid).
 * @param {{ board: string[][], currentPlayer: "X"|"O", size: number }} game
 */
function takeTurn(game) {
  const { board, currentPlayer, size } = game;

  while (true) {
    const row = askIndex('row', currentPlayer, size);
    const col = askIndex('column', currentPlayer, size);

    if (board[row][col] !== EMPTY) {
      console.log('That cell is already taken. Try again.\n');
      continue;
    }

    board[row][col] = currentPlayer;
    break;
  }
}

// -------------------- MAIN --------------------
const game = createGame();
const winningLines = getWinningLines(game.size);

printBoard(game);

while (true) {
  takeTurn(game);

  console.log('');
  printBoard(game);

  if (hasWon(game, game.currentPlayer, winningLines)) {
    console.log(`Player ${game.currentPlayer} won`);
    break;
  }

  if (isDraw(game)) {
    console.log('Draw');
    break;
  }

  switchPlayer(game);
}
