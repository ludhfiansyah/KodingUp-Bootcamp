const readline = require ("readline-sync")

// Total number of animals in the Chinese zodiac cycle
const CHINESE_YEAR_CYCLE = 12;

// Prompt the user to enter a year and convert it to a number
const inputYear = +readline.question('Enter a year: ');

// Determines the Chinese zodiac sign based on the given year
function determineChineseZodiac(year) {
    // Calculate the position in the 12-year zodiac cycle
    const zodiacIndex = year % CHINESE_YEAR_CYCLE;
    // Match the remainder to the corresponding zodiac sign
    switch(zodiacIndex) {
        case 0: return 'Monkey';
        case 1: return 'Rooster';
        case 2: return 'Dog';
        case 3: return 'Pig';
        case 4: return 'Rat';
        case 5: return 'Ox';
        case 6: return 'Tiger';
        case 7: return 'Rabbit';
        case 8: return 'Dragon';
        case 9: return 'Snake';
        case 10: return 'Horse';
        case 11: return 'Sheep';
        default: return 'Unknown'
    }
}

// Determine and display the Chinese zodiac sign
const chineseZodiac = determineChineseZodiac(inputYear);
console.log(`\nThe Chinese zodiac for year ${inputYear} is ${chineseZodiac}`);