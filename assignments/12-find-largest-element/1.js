const readline = require('readline-sync');

/*
---------------------------------------------
STEP 1: Read the number of rows and columns
---------------------------------------------
The program will keep asking until the user enters exactly 2 numeric values.
Example valid input: "3 4"
*/
let rowInput;
let colInput;
let repeatInput1;

do {
  const rowColumnInput = readline.question(
    'Enter the number of rows and columns in the array: ',
  );

  // Split input into two parts: [rows, cols]
  const parts = rowColumnInput.split(' ');

  /*
  Input is invalid if:
  - user does not provide exactly 2 values
  - either value is not a number
  */
  repeatInput1 = parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1]);

  if (repeatInput1) {
    console.log('\nError, invalid input!!\n');
  } else {
    // Convert the row and column values from string to number
    rowInput = +parts[0];
    colInput = +parts[1];
  }
} while (repeatInput1);

/*
---------------------------------------------
STEP 2: Read the 2D array (matrix) values
---------------------------------------------
We will store user input into a 2D array called "table".
If any row input is invalid, we restart the entire matrix input process.
*/
const table = [];
let repeatInput2;

outer: do {
  repeatInput2 = false;
  console.log('Enter the array:');

  // Loop through each row
  for (let i = 0; i < rowInput; i++) {
    const input = readline.question('');

    // Split row values by spaces (example: "1 2 3" -> ["1", "2", "3"])
    const parts = input.split(' ');

    // Validate that the number of columns matches the expected column count
    if (parts.length !== colInput) {
      console.log('Invalid numbers of column');
      repeatInput2 = true;
      continue outer; // Restart from the beginning
    }

    // Convert each value into a number and validate numeric input
    for (let j = 0; j < colInput; j++) {
      parts[j] = +parts[j];

      // If any value is not a valid number, restart input
      if (isNaN(parts[j])) {
        console.log('Invalid input number, please try again');
        repeatInput2 = true;
        continue outer; // Restart from the beginning
      }
    }

    // Store the validated row into the table
    table[i] = parts;
  }
} while (repeatInput2);

/*
---------------------------------------------
STEP 3: Custom forEach() for 2D array processing
---------------------------------------------
This custom forEach method is used to practice iteration logic without using the built-in Array.prototype.forEach().
It finds the largest number in the matrix and its location (row, col), then passes the result to a callback function.
*/
table.findLargestNumber = function (callbackFn) {
  let foundNumber; // stores the current largest number found
  let indexX; // row index of the largest number
  let indexY; // column index of the largest number

  // Iterate through each row
  for (let i = 0; i < this.length; i++) {
    // Iterate through each column
    for (let j = 0; j < this[i].length; j++) {
      // Initialize foundNumber on first element, then update if a larger value is found
      if (foundNumber === undefined || this[i][j] > foundNumber) {
        foundNumber = this[i][j];
        indexX = i;
        indexY = j;
      }
    }
  }

  // Execute the callback function with the final result
  callbackFn(foundNumber, indexX, indexY);
};

/*
---------------------------------------------
STEP 4: Print the result
---------------------------------------------
*/
table.findLargestNumber((largestNumber, row, col) => {
  console.log(
    `The location of the largest element is ${largestNumber} at (${row}, ${col})`,
  );
});
