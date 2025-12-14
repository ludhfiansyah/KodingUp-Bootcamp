// Import readline-sync to read input from the console
const readline = require("readline-sync");

// Total number of cards per suit
const CARDS_PER_SUIT = 13;

// Function to determine the suit of the card
// Each suit contains 13 cards
function determineCardSuit(n) {
  if (n >= 0 && n <= 12) {
    return "Spades";
  } else if (n >= 13 && n <= 25) {
    return "Hearts";
  } else if (n >= 26 && n <= 38) {
    return "Diamonds";
  } else {
    return "Clubs";
  }
}

// Function to determine the rank of the card
// Modulo 13 is used because ranks repeat every 13 cards
function determineCardRank(n) {
  let cardRank = n % CARDS_PER_SUIT;

  switch (cardRank) {
    case 0:
      return "Ace";
    case 10:
      return "Jack";
    case 11:
      return "Queen";
    case 12:
      return "King";
    default:
      // For ranks 2 to 10
      return String(++cardRank);
  }
}

// Ask user to enter a card number
const enteredCardNumber = +readline.question("Enter card number: ");

// Validate user input (card number input must be between 0 and 51)
if (enteredCardNumber < 0 || enteredCardNumber > 51) {
  console.log("Invalid card number. Please enter a number between 0 and 51.");
} else {
  // Display the card rank and suit using template literal
  console.log(
    `\nCard number ${enteredCardNumber}: ${determineCardRank(enteredCardNumber)} of ${determineCardSuit(enteredCardNumber)}`
  );
}