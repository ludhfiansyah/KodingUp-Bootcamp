const readline = require ('readline-sync');

const firstNumber = +readline.question('Enter first number: ');
const secondNumber = +readline.question('Enter second number: ');
const thirdNumber = +readline.question('Enter third number: ');
const average = (firstNumber + secondNumber + thirdNumber) / 3;

console.log('');
console.log('The average of ' + firstNumber + ', ' + secondNumber + ', ' + thirdNumber + ', ' + "is " + average);