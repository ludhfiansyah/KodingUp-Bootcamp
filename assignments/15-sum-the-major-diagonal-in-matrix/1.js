const readline = require('readline-sync');

const MAX_MATRIX_SIZE = 4;

function collectMatrix() {
  const matrix = [];
  let row = 0;

  outer: do {
    let value = [];

    let inputStr = readline.question('').split(' ');

    if (inputStr.length !== MAX_MATRIX_SIZE) {
      console.log('Invalid input. Please enter 4 numbers per row.\n');
      row = 0;
      continue outer;
    }

    for (let str of inputStr) {
      str = +str;
      if (Number.isNaN(str)) {
        console.log('Invalid input. Please enter only number\n');
        row = 0;
        continue outer;
      }
      value.push(str);
    }

    matrix[row] = value;
    row++;
  } while (row < MAX_MATRIX_SIZE);

  return matrix;
}

function sumMajorDiagonal(m) {
  // Your implementation here
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
