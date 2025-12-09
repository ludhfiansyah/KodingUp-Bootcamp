const readline = require ('readline-sync');

const firstNumber = +readline.question('Enter first number: ');
const secondNumber = +readline.question('Enter second number: ');
const userAnswer = +readline.question('What is ' + firstNumber + ' + ' + secondNumber + ' ? ');

const addition = firstNumber + secondNumber;
const isCorrect = addition === userAnswer;

console.log(firstNumber + ' + ' + secondNumber + ' = ' + userAnswer + ' is ' + isCorrect);