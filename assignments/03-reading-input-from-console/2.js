const readline = require ('readline-sync');

// Get user input
const inputMiles = +readline.question('Enter miles: ');

// Convert miles to kilometers calculation and rounds it to 5 decimal
const kilometers = inputMiles * 1.609344;
const km = Math.round(kilometers * 100000) / 100000;

// Print output
console.log('');
console.log(inputMiles +' miles is equal to ' + km +' kilometers');