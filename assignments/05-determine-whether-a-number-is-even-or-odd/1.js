const readline = require ('readline-sync');

const number = +readline.question('Enter a number: ');

if (parseInt(number) % 2 === 0) {
    console.log(parseInt(number) + ' is even');
} else {
    console.log(parseInt(number) + ' is odd');
}