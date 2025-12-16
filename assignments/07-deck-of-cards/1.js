// Import readline-sync to read input from the console
const readline = require("readline-sync");

// Defining compile-time constant
const CARDS_PER_SUIT = 13;
const LOWEST_CARD = 0;
const HIGHEST_CARD = 51;
const MIN_DIAMONDS_SUIT = 26;
const MIN_CLUBS_SUIT = 39;

let checkNumber;

// Function to determine the rank of the card
// Modulo 13 is used because ranks repeat every 13 cards
function getCardRank(num) {
  const cardRank = num % CARDS_PER_SUIT;

  switch (cardRank) {
    case 0:
      return 'Ace';

    case 10:
      return 'Jack';
    case 11:
      return 'Queen';
    case 12:
      return 'King';

    default:
      // For ranks 2 to 10
      return String(cardRank + 1);
  }
}

// Function to determine the suit of the card
// Each suit contains 13 cards
function getCardSuit(num) {
  if (num < CARDS_PER_SUIT) {
    return 'Spades';
  } else if (num < MIN_DIAMONDS_SUIT) {
    return 'Hearts';
  } else if (num < MIN_CLUBS_SUIT) {
    return 'Diamonds';
  } else {
    return 'Clubs';
  }
}

// Keep the program running until the user enter the correct number
do {
  // Ask user to enter a card number
  const enteredCardNumber = +readline.question('Enter card number: ');

  // Validate user input (card number input must be between 0 and 51)
  checkNumber = enteredCardNumber;
  if (enteredCardNumber < LOWEST_CARD || enteredCardNumber > HIGHEST_CARD) {
    console.log(`\nInvalid card number. Please enter a card number between ${LOWEST_CARD} and ${HIGHEST_CARD}.\n\n`);
  } else {
    // Display the card rank and card suit using template literal
    console.log(`\nCard number ${enteredCardNumber}: ${getCardRank(enteredCardNumber)} of ${getCardSuit(enteredCardNumber)}`);
  }
} while (checkNumber > HIGHEST_CARD);
