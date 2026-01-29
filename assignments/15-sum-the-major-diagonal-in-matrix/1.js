const readline = require('readline-sync');

const MATRIX_SIZE = 4;

/**
 * Collect a 4x4 matrix from user input.
 *
 * Rules:
 * - Each row must contain exactly MATRIX_SIZE values.
 * - All values must be valid numbers.
 * - If any row is invalid, restart the input from row 0.
 *
 * @returns {number[][]} 4-by-4 matrix (2D array).
 */
function collectMatrix() {
  const matrix = [];
  let rowIndex = 0;

  while (rowIndex < MATRIX_SIZE) {
    // Read one row input and split into parts
    const parts = readline.question('').split(' ');

    // --- Validation: must have exactly 4 values ---
    if (parts.length !== MATRIX_SIZE) {
      console.log('Invalid input. Please enter 4 numbers per row.\n');
      rowIndex = 0; // restart from the first row
      continue;
    }

    // Convert parts to numbers + validate
    const row = [];
    let isRowValid = true;

    for (let i = 0; i < parts.length; i++) {
      const n = +parts[i];

      if (Number.isNaN(n)) {
        console.log('Invalid input. Please enter only number\n');
        rowIndex = 0; // restart from the first row
        isRowValid = false;
        break; // stop processing this row
      }

      row.push(n);
    }

    // If the row was invalid, ask the user to re-enter from row 0
    if (!isRowValid) continue;

    // Save the validated row and move to next row
    matrix[rowIndex] = row;
    rowIndex++;
  }

  return matrix;
}

/**
 * Sum the major diagonal of a square matrix:
 * m[0][0] + m[1][1] + ... + m[n-1][n-1]
 *
 * @param {number[][]} m - Square matrix.
 * @returns {number} Sum of the major diagonal elements.
 */
function sumMajorDiagonal(m) {
  let sum = 0;

  for (let i = 0; i < m.length; i++) {
    sum += m[i][i];
  }

  return sum;
}

console.log('Enter a 4-by-4 matrix row by row: ');

const matrix = collectMatrix();
const sum = sumMajorDiagonal(matrix);

console.log(`Sum of the elements in the major diagonal is ${sum}`);
