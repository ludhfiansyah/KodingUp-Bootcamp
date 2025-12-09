const readline = require ('readline-sync');

// Get user input
const miles = +readline.question('Enter miles: ');

// Convert miles to kilometers calculation
const kilometers = miles * 1.60934;

// Print output
console.log('');
console.log(miles +' miles is equal to ' + kilometers +' kilometers');