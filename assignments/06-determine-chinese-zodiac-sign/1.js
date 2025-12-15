// Import readline-sync to read input from the console
const readline = require("readline-sync");

// Defining compile time constant
const CHINESE_YEAR_CYCLE = 12;
const ZODIAC_MONKEY = 'monkey';
const ZODIAC_ROOSTER = 'rooster';
const ZODIAC_DOG = 'dog';
const ZODIAC_PIG = 'pig';
const ZODIAC_RAT = 'rat';
const ZODIAC_OX = 'ox';
const ZODIAC_TIGER = 'tiger';
const ZODIAC_RABBIT = 'rabbit';
const ZODIAC_DRAGON = 'dragon';
const ZODIAC_SNAKE = 'snake';
const ZODIAC_HORSE = 'horse';
const ZODIAC_SHEEP = 'sheep';
const UNKNOWN = 'unknown'

// Determines the Chinese zodiac sign based on the given year
const getChineseZodiac = function (year) {
  // Calculate the position in the 12-year zodiac cycle
  const zodiacIndex = year % CHINESE_YEAR_CYCLE;
  // Match the remainder to the corresponding zodiac sign
  switch (zodiacIndex) {
    case 0:
      return ZODIAC_MONKEY;
    case 1:
      return ZODIAC_ROOSTER;
    case 2:
      return ZODIAC_DOG;
    case 3:
      return ZODIAC_PIG;
    case 4:
      return ZODIAC_RAT;
    case 5:
      return ZODIAC_OX;
    case 6:
      return ZODIAC_TIGER;
    case 7:
      return ZODIAC_RABBIT;
    case 8:
      return ZODIAC_DRAGON;
    case 9:
      return ZODIAC_SNAKE;
    case 10:
      return ZODIAC_HORSE;
    case 11:
      return ZODIAC_SHEEP;
    default:
      return UNKNOWN;
  }
}

// Keep the program running until user presses Ctrl + C
while (true) {
  // Prompt the user to enter a year and convert it to a number
  const enteredYear = +readline.question("Enter a year: ");
  // Determine and display the Chinese zodiac sign
  console.log(`\nThe Chinese zodiac for year ${enteredYear} is ${getChineseZodiac(enteredYear)}\n`);
}