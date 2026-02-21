'use strict';
const readline = require('readline-sync');

// Enum
const Month = Object.freeze({
  JANUARY: 1,
  FEBRUARY: 2,
  MARCH: 3,
  APRIL: 4,
  MAY: 5,
  JUNE: 6,
  JULY: 7,
  AUGUST: 8,
  SEPTEMBER: 9,
  OCTOBER: 10,
  NOVEMBER: 11,
  DECEMBER: 12,
});

// constants
const GREGORIAN_INTERVAL = 400;
const LEAP_YEAR_INTERVAL = 4;
const CENTURY_INTERVAL = 100;

const FIRST_MONTH_OF_YEAR = Month.JANUARY;
const LAST_MONTH_OF_YEAR = Month.DECEMBER;

const FIRST_DATE_OF_MONTH = 1;

const MIN_BIRTH_YEAR = 1900;

/**
 * Determine whether a given year is a leap year in the Gregorian calendar.
 *
 * Rules:
 * - Leap year if divisible by 400, OR
 * - Divisible by 4 but NOT divisible by 100.
 *
 * @param {number} year - Year number (e.g., 2000).
 * @returns {boolean} True if the year is a leap year; otherwise false.
 */
function isLeapYear(year) {
  return (
    year % GREGORIAN_INTERVAL === 0 ||
    (year % LEAP_YEAR_INTERVAL === 0 && year % CENTURY_INTERVAL !== 0)
  );
}

/**
 * Get the maximum valid date (day of month) for a given month and year.
 *
 * Notes:
 * - April, June, September, November have 30 days.
 * - February has 28 days, or 29 days in leap years.
 * - All other months have 31 days.
 *
 * @param {number} year - The year (used to determine leap year for February).
 * @param {number} month - Month number using the Month enum (1-12).
 * @returns {number} Maximum day number allowed for the given month (28-31).
 */
function getMaxDate(year, month) {
  switch (month) {
    case Month.APRIL:
    case Month.JUNE:
    case Month.SEPTEMBER:
    case Month.NOVEMBER:
      return 30;
    case Month.FEBRUARY:
      return isLeapYear(year) ? 29 : 28;
    default:
      return 31;
  }
}

/**
 * Read a strict integer from user input (no decimals, no scientific notation),
 * and keep prompting until the input is valid.
 *
 * Validation rules:
 * - Input must not be empty.
 * - Input must be a finite number.
 * - Input must be an integer (no decimals).
 * - Input must be typed in plain integer form (e.g., "2000").
 *   This rejects formats like "1e3" and also rejects "0010" because
 *   String(Number("0010")) becomes "10" and no longer matches the raw input.
 *
 * @param {string} prompt - Prompt text shown to the user.
 * @returns {number} A validated integer value.
 */
function readStrictInt(prompt) {
  while (true) {
    const raw = readline.question(prompt).trim();

    if (raw.length === 0) {
      console.log('Invalid input, please enter a number.');
      continue;
    }

    const num = Number(raw);

    if (!Number.isFinite(num)) {
      console.log('Invalid input, please enter a valid number.');
      continue;
    }

    if (!Number.isInteger(num)) {
      console.log('Invalid input, please enter an integer (no decimals).');
      continue;
    }

    if (String(num) !== raw) {
      console.log(
        'Invalid input format. Please type digits only (e.g., 2000).',
      );
      continue;
    }

    return num;
  }
}

const name = readline.question('Enter name: ');

const currentYear = new Date().getFullYear();

let year;
while (true) {
  year = readStrictInt('Enter birth year: ');
  if (year < MIN_BIRTH_YEAR || year > currentYear) {
    console.log(
      `Invalid year, please input between ${MIN_BIRTH_YEAR} and ${currentYear}.`,
    );
    continue;
  }
  break;
}

let month;
while (true) {
  month = readStrictInt('Enter birth month (1-12): ');
  if (month < FIRST_MONTH_OF_YEAR || month > LAST_MONTH_OF_YEAR) {
    console.log('Invalid birth month, please input a correct month (1-12).');
    continue;
  }
  break;
}

let date;
while (true) {
  const maxDate = getMaxDate(year, month);
  date = readStrictInt('Enter birth date: ');
  if (date < FIRST_DATE_OF_MONTH || date > maxDate) {
    console.log(
      `Invalid birth date, please input a correct date (1-${maxDate}).`,
    );
    continue;
  }
  break;
}

const person = {
  name,
  birthDate: new Date(year, month - 1, date).getTime(),
  getAge() {
    const now = new Date();
    const dob = new Date(this.birthDate);

    let age = now.getFullYear() - dob.getFullYear();

    const hasHadBirthdayThisYear =
      now.getMonth() > dob.getMonth() ||
      (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());

    if (!hasHadBirthdayThisYear) age -= 1;
    return age;
  },
};

const age = person.getAge();
console.log(`\nHey ${person.name}, your age is ${age}.`);
