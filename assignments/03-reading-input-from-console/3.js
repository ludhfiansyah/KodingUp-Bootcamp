const readline = require ('readline-sync');

// Get user input
const inputSeconds = +readline.question('Enter seconds: ');

// Parse inputSeconds into minutes and seconds
const minutes = Math.floor(inputSeconds / 60);
const remainingSeconds = inputSeconds % 60;

// Print output
console.log(inputSeconds +' seconds is '+ minutes + ' minutes and ' + remainingSeconds + ' seconds');