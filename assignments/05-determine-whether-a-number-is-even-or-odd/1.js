const readline = require ('readline-sync');

// Get user input
const number = parseInt(readline.question('Enter a number: '));

// Check even or odd number and print output
if (number % 2 === 0) {
    console.log(number + ' is even');
} else {
    console.log(number + ' is odd');
}