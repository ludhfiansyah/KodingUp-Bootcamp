const readline = require ('readline-sync');

// REVISION - Adding GLOBAL CONST for Kilometers_per_Miles value
const KILOMETERS_PER_MILES = 1.609344;

// Get user input
const inputMiles = +readline.question('Enter miles: ');

// Convert miles to kilometers (rounded to 5 decimals)
const kilometers = Math.round(inputMiles * KILOMETERS_PER_MILES * 100000) / 100000;


console.log('\n' + inputMiles +' miles is equal to ' + kilometers +' kilometers'); // REVISION -  use \n to print new line