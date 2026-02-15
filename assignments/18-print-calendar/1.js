/**

* Print a monthly calendar (manual engine; no Date object).
*
* Reference:
* Jan 1, 1800 was Wednesday.
* Weekday index convention: 0=Sun ... 6=Sat
*/

'use strict';
const readline = require('readline-sync');

/** Weekday index for Jan 1, 1800 (Wednesday). */
const STARTDAY1800 = 3;

/** Month names (1–12). */
const nameOfTheMonths = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

/** Weekday labels in display order; index matches weekday convention. */
const nameOfTheDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**

* Check if a year is a leap year (Gregorian rules).
* @param {number} year
* @returns {boolean}
  */
function isLeapYear(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

/**

* Get number of days in a month.
* @param {number} year
* @param {number} month - 1–12
* @returns {number} 28–31
  */
function getDaysInMonth(year, month) {
  let daysInMonth = 31;

  if (month === 4 || month === 6 || month === 9 || month === 11) {
    daysInMonth = 30;
  }

  if (month === 2) {
    daysInMonth = isLeapYear(year) ? 29 : 28;
  }

  return daysInMonth;
}

/**

* Total days from Jan 1, 1800 up to the first day of (year, month).
* @param {number} year
* @param {number} month - 1–12
* @returns {number}
  */
function getTotalDays(year, month) {
  let totalOfDays = 0;

  for (let y = 1800; y < year; y++) {
    totalOfDays += isLeapYear(y) ? 366 : 365;
  }

  for (let m = 1; m < month; m++) {
    totalOfDays += getDaysInMonth(year, m);
  }

  return totalOfDays;
}

/**

* Weekday index (0–6) for the first day of (year, month).
* @param {number} year
* @param {number} month - 1–12
* @returns {number} 0=Sun ... 6=Sat
  */
function getStartDayOfTheMonth(year, month) {
  return (STARTDAY1800 + getTotalDays(year, month)) % 7;
}

/**

* Ask user for an integer input until valid.
* @param {string} prompt
* @param {(n:number)=>boolean} isValid
* @param {string} errorMsg
* @returns {number}
  */
function askInt(prompt, isValid, errorMsg) {
  while (true) {
    const value = Number(readline.question(prompt));
    if (Number.isInteger(value) && isValid(value)) return value;
    console.log(errorMsg + '\n');
  }
}

/**

* Create a blank cell with fixed width.
* @param {number} cellWidth
* @returns {string}
  */
function blankCell(cellWidth) {
  return ' '.repeat(cellWidth);
}

/**

* Format a day number into a fixed-width cell (right-aligned).
* @param {number} day
* @param {number} cellWidth
* @returns {string}
  */
function formatCell(day, cellWidth) {
  const NUMBER_WIDTH = 3; // matches sample spacing
  return (
    String(day).padStart(NUMBER_WIDTH, ' ') +
    ' '.repeat(cellWidth - NUMBER_WIDTH)
  );
}

/**

* Print the calendar for a given year and month.
* @param {number} year
* @param {number} month - 1–12
* @returns {void}
  */
function printCalendar(year, month) {
  const GRID_WIDTH = 33;
  const CELL_WIDTH = 5;

  const title = `${nameOfTheMonths[month]} ${year}`;
  const leftPadding = Math.floor((GRID_WIDTH - title.length) / 2);

  console.log();
  console.log(' '.repeat(leftPadding) + title);
  console.log('-'.repeat(GRID_WIDTH));
  console.log(nameOfTheDays.join('  '));

  const startDay = getStartDayOfTheMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);

  let weekDayIndex = startDay;
  let line = '';

  for (let i = 0; i < startDay; i++) {
    line += blankCell(CELL_WIDTH);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    line += formatCell(day, CELL_WIDTH);

    if (weekDayIndex === nameOfTheDays.length - 1) {
      console.log(line.trimEnd());
      line = '';
    }

    weekDayIndex = (weekDayIndex + 1) % 7;
  }

  if (line.trim().length > 0) {
    console.log(line.trimEnd());
  }
}

/** Main */
const inputYear = askInt(
  'Enter full year (e.g., 2001): ',
  (y) => y >= 1800,
  'Invalid year. Please enter an integer year >= 1800.',
);

const inputMonth = askInt(
  'Enter month in number between 1 and 12: ',
  (m) => m >= 1 && m <= 12,
  'Invalid month. Please enter an integer between 1 and 12.',
);

printCalendar(inputYear, inputMonth);
