// Import readline-sync to read input from the console
const readline = require("readline-sync");

// Total number of cards per suit
const CARDS_PER_SUIT = 13;

// Ask user to enter a card number
const cardNumber = +readline.question("Enter card number: ");

// Validate user input (card number input must be between 0 and 51)
if (cardNumber < 0 || cardNumber > 51) {
  console.log("Invalid card number. Please enter a number between 0 and 51.");
} else {
  // Display the card rank and suit using template literal
  console.log(
    `\nCard number ${cardNumber}: ${cardRank(cardNumber)} of ${cardSuit(
      cardNumber
    )}`
  );
}

// Function to determine the suit of the card
// Each suit contains 13 cards
function cardSuit(number) {
  if (number >= 0 && number <= 12) {
    return "Spades";
  } else if (number >= 13 && number <= 25) {
    return "Hearts";
  } else if (number >= 26 && number <= 38) {
    return "Diamonds";
  } else {
    return "Clubs";
  }
}

// Function to determine the rank of the card
// Modulo 13 is used because ranks repeat every 13 cards
function cardRank(number) {
  let rank = number % CARDS_PER_SUIT;

  switch (rank) {
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
      return String(++rank);
  }
}
