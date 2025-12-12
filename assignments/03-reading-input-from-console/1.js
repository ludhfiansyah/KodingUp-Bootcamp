const readline = require ('readline-sync');

// Get user input 
const firstNumber = +readline.question('Enter first number: ');
const secondNumber = +readline.question('Enter second number: ');
const thirdNumber = +readline.question('Enter third number: ');

// Average math calculation
const average = (firstNumber + secondNumber + thirdNumber) / 3;

// Print output
console.log('\nThe average of ' + firstNumber + ', ' + secondNumber + ', ' + thirdNumber + ', ' + "is " + average); // adding \n