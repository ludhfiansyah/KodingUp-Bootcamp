const readline = require("readline-sync");

const MIN = 1;
const MAX = 100;

/**
 * Converts array of strings into array of numbers (mutates the array).
 * @param {string[]} arr - Array of numeric strings.
 * @returns {number[]} The same array converted to numbers.
 */
function convertToNumbers(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = +arr[i];
  }
  return arr;
}

/**
 * Checks whether the array contains invalid input:
 * - Not a number (NaN)
 * - Not in range MIN..MAX
 * @param {number[]} arr - Array of numbers.
 * @returns {boolean} True if invalid exists, otherwise false.
 */
function hasInvalidInput(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (isNaN(arr[i]) || arr[i] < MIN || arr[i] > MAX) {
      return true;
    }
  }
  return false;
}

/**
 * Sorts an array in ascending order using Bubble Sort (mutates the array).
 * @param {number[]} arr - Unsorted array.
 * @returns {number[]} The same array sorted ascending.
 */
function sortArray(arr) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}

/**
 * Prints occurrences from a sorted array in one pass.
 * Example output: "5 occurs 2 times"
 * @param {number[]} sortedArr - Sorted array.
 * @returns {void}
 */
function printOccurrences(sortedArr) {
  let count = 1;

  for (let i = 0; i < sortedArr.length; i++) {
    if (sortedArr[i] === sortedArr[i + 1]) {
      count++;
    } else {
      const times = count > 1 ? "times" : "time";
      console.log(`${sortedArr[i]} occurs ${count} ${times}`);
      count = 1;
    }
  }
}

// ----- MAIN PROGRAM -----
let numbers;

do {
  const input = readline.question("Enter the integers between 1 and 100: ");

  // Use split() but more robust for multiple spaces/tabs
  const parts = input.trim().split(/\s+/);

  // If user just presses enter, parts becomes [""] -> +"" = 0 (invalid), so it will re-ask.
  const converted = convertToNumbers(parts);

  if (hasInvalidInput(converted)) {
    console.log("\nInvalid input!\n");
  } else {
    numbers = converted;
  }
} while (!numbers);

// Sort + print
sortArray(numbers);
printOccurrences(numbers);
