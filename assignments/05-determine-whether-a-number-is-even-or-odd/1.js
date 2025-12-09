const readline = require ('readline-sync');

const number = parseInt(readline.question('Enter a number: '));

if (number % 2 === 0) {
    console.log(number + ' is even');
} else {
    console.log(number + ' is odd');
}