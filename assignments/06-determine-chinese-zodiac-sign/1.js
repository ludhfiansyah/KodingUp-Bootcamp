// Import readline-sync to read input from the console
const readline = require("readline-sync");

// Defining compile time constant
const CHINESE_YEAR_CYCLE = 12;

// Determines the Chinese zodiac sign based on the given year
const getChineseZodiacByYear = function (year) {
  // Calculate the position in the 12-year zodiac cycle
  const zodiacIndex = year % CHINESE_YEAR_CYCLE;
  // Match the remainder to the corresponding zodiac sign
  switch (zodiacIndex) {
    case 0:
      return 'monkey';
    case 1:
      return 'rooster';
    case 2:
      return 'dog';
    case 3:
      return 'pig';
    case 4:
      return 'rat';
    case 5:
      return 'ox';
    case 6:
      return 'tiger';
    case 7:
      return 'rabbit';
    case 8:
      return 'dragon';
    case 9:
      return 'snake';
    case 10:
      return 'horse';
    case 11:
      return 'sheep';
    default:
      return 'unknown';
  }
}

// Prompt the user to enter a year and convert it to a number
const enteredYear = +readline.question('Enter a year: ');
// Determine and display the Chinese zodiac sign
console.log(`\nThe Chinese zodiac for year ${enteredYear} is ${getChineseZodiacByYear(enteredYear)}\n`);