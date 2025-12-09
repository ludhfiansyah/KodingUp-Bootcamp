const readline = require ('readline-sync');

// Get user input
const firstNumber = +readline.question('Enter first number: ');
const secondNumber = +readline.question('Enter second number: ');
const userAnswer = +readline.question('What is ' + firstNumber + ' + ' + secondNumber + ' ? ');

// Addition 
const addition = firstNumber + secondNumber;

// Check user's answer
const isCorrect = addition === userAnswer;

// Print output
console.log(firstNumber + ' + ' + secondNumber + ' = ' + userAnswer + ' is ' + isCorrect);