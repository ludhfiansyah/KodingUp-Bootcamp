// Import readline-sync to read input from the console
const readline = require("readline-sync");

// Defining compile time constant
const CARDS_PER_SUIT = 13;
const LOWEST_CARD = 0;
const HIGHEST_CARD = 51;
const MIN_DIAMONDS_SUIT = 26;
const MIN_CLUBS_SUIT = 39;
const ACE = 'Ace';
const JACK = 'Jack';
const QUEEN = 'Queen';
const KING = 'King';
const SPADES = 'Spades';
const HEARTS = 'Hearts'
const DIAMONDS = 'Diamonds'
const CLUBS = 'Clubs'

// Function to determine the rank of the card
// Modulo 13 is used because ranks repeat every 13 cards
function getCardRank(num) {
  let cardRank = num % CARDS_PER_SUIT;

  switch (cardRank) {
    case 0:
      return ACE;
    case 10:
      return JACK;
    case 11:
      return QUEEN;
    case 12:
      return KING;
    default:
      // For ranks 2 to 10
      return String(++cardRank);
  }
}

// Function to determine the suit of the card
// Each suit contains 13 cards
function getCardSuit(num) {
  if (num < CARDS_PER_SUIT) {
    return SPADES;
  } else if (num < MIN_DIAMONDS_SUIT) {
    return HEARTS;
  } else if (num < MIN_CLUBS_SUIT) {
    return DIAMONDS;
  } else {
    return CLUBS;
  }
}


// Ask user to enter a card number
const enteredCardNumber = +readline.question("Enter card number: ");

// Validate user input (card number input must be between 0 and 51)
if (enteredCardNumber < LOWEST_CARD || enteredCardNumber > HIGHEST_CARD) {
  console.log(`Invalid card number. Please enter a card number between ${LOWEST_CARD} and ${HIGHEST_CARD}.`);
} else {
  // Display the card rank and suit using template literal
  console.log(`\nCard number ${enteredCardNumber}: ${getCardRank(enteredCardNumber)} of ${getCardSuit(enteredCardNumber)}`);
}