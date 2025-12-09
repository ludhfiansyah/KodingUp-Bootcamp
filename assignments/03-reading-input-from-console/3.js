const readline = require ('readline-sync');

const inputSeconds = +readline.question('Enter seconds: ');
const minutes = Math.trunc(inputSeconds / 60);
const second = inputSeconds % 60;

console.log(inputSeconds +' second is '+ minutes + ' minutes and ' + second + ' seconds');