'use strict';
const readline = require('readline-sync');

/**
 * Print a monthly calendar (manual engine; no Date object).
 *
 * Reference:
 * - Jan 1, 1800 was Wednesday.
 * - Weekday index convention: 0=Sun ... 6=Sat
 */

/** Weekday index for Jan 1, 1800 (Wednesday). */
const STARTDAY1800 = 3;

/**
 * Enum-like mapping for month names (1–12).
 * @readonly
 * @enum {string}
 */
const NameOfTheMonths = {
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
Object.freeze(NameOfTheMonths);

/** Weekday labels in display order; index matches weekday convention. */
const nameOfTheDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Calendar "constructor function" holding a target year and month.
 * @constructor
 * @param {number} year - Full year (>= 1800).
 * @param {number} month - Month number (1–12).
 */
function Calendar(year, month) {
  this.year = year;
  this.month = month;
}

/**
 * Check if a given year is a leap year (Gregorian rules).
 * @param {number} year
 * @returns {boolean}
 */
Calendar.prototype.isLeapYear = function (year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
};

/**
 * Get number of days in a given month for a given year.
 * @param {number} year
 * @param {number} month - 1–12
 * @returns {number} 28–31
 */
Calendar.prototype.getDaysInMonth = function (year, month) {
  if (month === 4 || month === 6 || month === 9 || month === 11) return 30;
  if (month === 2) return this.isLeapYear(year) ? 29 : 28;
  return 31;
};

/**
 * Total days from Jan 1, 1800 up to the first day of (this.year, this.month).
 * @returns {number}
 */
Calendar.prototype.getTotalDays = function () {
  let total = 0;

  // Add all full years from 1800 to (this.year - 1)
  for (let y = 1800; y < this.year; y++) {
    total += this.isLeapYear(y) ? 366 : 365;
  }

  // Add all full months from Jan to (this.month - 1) in this.year
  for (let m = 1; m < this.month; m++) {
    total += this.getDaysInMonth(this.year, m);
  }

  return total;
};

/**
 * Weekday index (0–6) for the first day of (this.year, this.month).
 * @returns {number} 0=Sun ... 6=Sat
 */
Calendar.prototype.getStartDayOfTheMonth = function () {
  return (STARTDAY1800 + this.getTotalDays()) % 7;
};

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
  const NUMBER_WIDTH = 3;
  return (
    String(day).padStart(NUMBER_WIDTH, ' ') +
    ' '.repeat(cellWidth - NUMBER_WIDTH)
  );
}

/**
 * Print the calendar for the provided Calendar instance.
 * @param {Calendar} calendar
 * @returns {void}
 */
function printCalendar(calendar) {
  const GRID_WIDTH = 33;
  const CELL_WIDTH = 5;

  const title = `${NameOfTheMonths[calendar.month]} ${calendar.year}`;
  const leftPadding = Math.floor((GRID_WIDTH - title.length) / 2);

  console.log();
  console.log(' '.repeat(leftPadding) + title);
  console.log('-'.repeat(GRID_WIDTH));
  console.log(nameOfTheDays.join('  '));

  const startDay = calendar.getStartDayOfTheMonth();
  const daysInMonth = calendar.getDaysInMonth(calendar.year, calendar.month);

  let weekDayIndex = startDay;
  let line = '';

  // Pad blanks before day 1
  for (let i = 0; i < startDay; i++) {
    line += blankCell(CELL_WIDTH);
  }

  // Print all days
  for (let day = 1; day <= daysInMonth; day++) {
    line += formatCell(day, CELL_WIDTH);

    // Saturday => flush line
    if (weekDayIndex === nameOfTheDays.length - 1) {
      console.log(line.trimEnd());
      line = '';
    }

    weekDayIndex = (weekDayIndex + 1) % 7;
  }

  // Flush remaining days in last row
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

const calendar = new Calendar(inputYear, inputMonth);
printCalendar(calendar);
