const readline = require('readline-sync');

const MAX_MATRIX_SIZE = 4; // Matrix is fixed to 4x4

/**
 * Collects a 4x4 matrix from user input.
 * Rules:
 * - User must enter exactly 4 numbers per row.
 * - If any row is invalid, the input restarts from row 1.
 * @returns {number[][]} A 4x4 matrix of numbers.
 */
function collectMatrix() {
  const matrix = []; // Stores the final 4x4 matrix
  let row = 0; // Tracks which row the user is currently entering

  // Label "outer" is used so we can restart the whole input process
  // when a validation fails.
  outer: do {
    let value = []; // Stores the numeric values for the current row

    // Read one row as a string, split by spaces into an array of strings
    let inputStr = readline.question('').split(' ');

    // Validation #1: row must contain exactly 4 values
    if (inputStr.length !== MAX_MATRIX_SIZE) {
      console.log('Invalid input. Please enter 4 numbers per row.\n');
      row = 0; // Reset back to the first row
      continue outer; // Restart the entire input process
    }

    // Convert parts to numbers + validate
    const row = [];
    let isRowValid = true;

    // Convert each string to a number and validate
    for (let str of inputStr) {
      str = +str; // Convert string -> number

      // Validation #2: all values must be valid numbers
      if (Number.isNaN(str)) {
        console.log('Invalid input. Please enter only number\n');
        row = 0; // Reset back to the first row
        continue outer; // Restart the entire input process
      }

      value.push(str); // Store the converted number for this row
    }

    // Save this row into the matrix, then move to the next row
    matrix[row] = value;
    row++;
  } while (row < MAX_MATRIX_SIZE); // Keep going until 4 rows are collected

  return matrix;
}

/**
 * Sums the major diagonal of a square matrix.
 * Major diagonal: m[0][0] + m[1][1] + m[2][2] + ...
 * @param {number[][]} m - A square matrix (e.g., 4x4).
 * @returns {number} Sum of the major diagonal elements.
 */
function sumMajorDiagonal(m) {
  let sum = 0;

  // Add elements where row index === column index
  for (let i = 0; i < m.length; i++) {
    sum += m[i][i];
  }

  return sum;
}

// Prompt user to enter the matrix row-by-row
console.log('Enter a 4-by-4 matrix row by row: ');

// Collect the 4x4 matrix from user input
const matrix = collectMatrix();

// Compute the sum of the major diagonal
const sum = sumMajorDiagonal(matrix);

// Print the result
console.log(`Sum of the elements in the major diagonal is ${sum}`);
