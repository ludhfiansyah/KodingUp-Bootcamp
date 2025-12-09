const readline = require ('readline-sync');

// Get user input
const inputSeconds = +readline.question('Enter seconds: ');

// Parse inputSeconds into minutes and second
const minutes = Math.trunc(inputSeconds / 60);
const second = inputSeconds % 60;

// Print output
console.log(inputSeconds +' second is '+ minutes + ' minutes and ' + second + ' seconds');