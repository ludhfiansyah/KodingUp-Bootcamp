const readline = require ('readline-sync');

const miles = +readline.question('Enter miles: ');
const kilometers = miles * 1.60934;

console.log('');
console.log(miles +' miles is equal to ' + kilometers +' kilometers');