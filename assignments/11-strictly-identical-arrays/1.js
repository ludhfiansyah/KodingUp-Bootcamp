const readline = require("readline-sync");

/**
 * Checks whether two arrays are strictly identical (same length and same values in the same order).
 * @param {string[]} arr1
 * @param {string[]} arr2
 * @returns {boolean} True if identical; otherwise false.
 */

function equals(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

// ----- MAIN PROGRAM -----
const inputList1 = readline.question("Enter list1: ");
const inputList2 = readline.question("Enter list2: ");
const List1 = inputList1.trim().split(/\s+/);
const List2 = inputList2.trim().split(/\s+/);

if (equals(List1, List2)) {
  console.log("Two lists are strictly identical");
} else {
  console.log("Two lists are not strictly identical");
}
