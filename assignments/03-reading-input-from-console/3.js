const readline = require ('readline-sync');

// REVISION - Add GLOBAL const variable
const SECONDS_PER_MINUTES = 60;

// Get user input
const inputSeconds = +readline.question('Enter seconds: ');

// REVISION Code
const minutes = Math.floor(inputSeconds / SECONDS_PER_MINUTES);
const remainingSeconds = inputSeconds % SECONDS_PER_MINUTES;

// Print output
console.log('\n' + inputSeconds +' seconds is '+ minutes + ' minutes and ' + remainingSeconds + ' seconds'); // REV-Add new line \n