const readline = require('readline-sync');

const MIN = 1;
const MAX = 100;

/**
 * Converts an array of numeric strings into numbers (in-place).
 *
 * Note:
 * This function mutates the original array to keep memory usage minimal.
 *
 * @param {string[]} arr - Array of values read from user input.
 * @returns {number[]} The same array, converted to numbers.
 */
function convertToNumbers(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = +arr[i];
  }
  return arr;
}

/**
 * Validates an array of numbers.
 * A value is considered invalid if:
 * - it is NaN (not a number)
 * - it is outside the allowed range MIN..MAX
 *
 * @param {number[]} arr - Array of numbers to validate.
 * @returns {boolean} True if any invalid value exists; otherwise false.
 */
function hasInvalidInput(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (isNaN(arr[i]) || arr[i] < MIN || arr[i] > MAX || arr[i] % 1 !== 0) {
      return true;
    }
  }
  return false;
}

/**
 * Sorts an array in ascending order using Bubble Sort (in-place).
 *
 * @param {number[]} arr - Array of numbers to sort.
 * @returns {number[]} The same array sorted in ascending order.
 */
function sortArray(arr) {
  let swapped;

  do {
    swapped = false;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}

/**
 * Prints the number of occurrences for each unique value in a sorted array.
 *
 * Example output:
 * 5 occurs 2 times
 *
 * @param {number[]} sortedArr - Array of numbers sorted in ascending order.
 * @returns {void}
 */
function printOccurrences(sortedArr) {
  let count = 1;

  for (let i = 0; i < sortedArr.length; i++) {
    if (sortedArr[i] === sortedArr[i + 1]) {
      count++;
    } else {
      const timesLabel = count === 1 ? 'time' : 'times';
      console.log(`${sortedArr[i]} occurs ${count} ${timesLabel}`);
      count = 1;
    }
  }
}

// ----------------------
// MAIN PROGRAM EXECUTION
// ----------------------
let numbers;

do {
  const input = readline.question('Enter the integers between 1 and 100: ');

  // Split user input by whitespace
  const parts = input.split(' ');

  // Convert values to numbers before validating
  const converted = convertToNumbers(parts);

  // Re-prompt user if input contains invalid values
  if (hasInvalidInput(converted)) {
    console.log('\nInvalid input!\n');
  } else {
    numbers = converted;
  }
} while (!numbers);

// Sort and print occurrences
sortArray(numbers);
printOccurrences(numbers);
