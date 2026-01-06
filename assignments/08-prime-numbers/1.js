const readline = require("readline-sync");

const LOWEST_N = 1;

/**
 * Checks whether a number is prime.
 *
 * @param {number} n - Number to test.
 * @returns {boolean} True if n is prime; otherwise, false.
 */
function isPrime(n) {
  if (n < 2) return false;

  // Check divisors from 2 up to sqrt(n)
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

let userInputNumber;
let isValidInput; // flag to control the loop

// Keep asking until user enters a valid integer >= LOWEST_N
do {
  userInputNumber = +readline.question("Enter the number of prime numbers: ");

  // Validation rules:
  // - NaN check: only NaN is not equal to itself
  // - integer check: integer has no decimal part
  // - range check: must be >= LOWEST_N
  isValidInput =
    userInputNumber === userInputNumber &&
    userInputNumber % 1 === 0 &&
    userInputNumber >= LOWEST_N;

  // Show error message when input is invalid
  if (!isValidInput) {
    console.log("\nInvalid input. Please enter a positive whole number.\n");
  }
} while (!isValidInput);

console.log(`\nThe first ${userInputNumber} prime numbers are`);

let found = 0;

// Print primes starting from 2 until the requested count is reached
for (let candidate = 2; found < userInputNumber; candidate++) {
  if (isPrime(candidate)) {
    console.log(candidate);
    found++;
  }
}
