'use strict';

const readline = require('readline-sync');

/**
 * Month index enum (0-based) following JavaScript Date convention.
 *
 * @readonly
 * @enum {number}
 */
const Month = Object.freeze({
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11,
});

/** @constant {number} */
const EPOCH_YEAR = 1970;

/** @constant {number} */
const MILLISECONDS_IN_A_DAY = 8.64e7;
/** @constant {number} */
const MILLISECONDS_IN_AN_HOUR = 3.6e6;
/** @constant {number} */
const MILLISECONDS_IN_A_MINUTE = 6e4;
/** @constant {number} */
const MILLISECONDS_IN_A_SECOND = 1e3;

/** @constant {number} */
const MINUTES_IN_AN_HOUR = 60;
/** @constant {number} */
const SECONDS_IN_A_MINUTE = 60;

/** @constant {number} */
const DAYS_IN_LEAP_YEAR = 366;
/** @constant {number} */
const DAYS_IN_NON_LEAP_YEAR = 365;

/** @constant {number} */
const GREGORIAN_INTERVAL = 400;
/** @constant {number} */
const LEAP_YEAR_INTERVAL = 4;
/** @constant {number} */
const CENTURY_INTERVAL = 100;

/**
 * Result shape for decomposing days since epoch into date components.
 *
 * @typedef {Object} DecomposedDate
 * @property {number} year - Full year (e.g., 2026).
 * @property {number} month - Month index (0-based, 0=Jan..11=Dec).
 * @property {number} days - Day of month (1-based, 1..31).
 */

/**
 * Result shape for decomposing day count into year + remainder.
 *
 * @typedef {Object} DecomposedYear
 * @property {number} year - Full year (e.g., 2026).
 * @property {number} remainingDaysAfterYears - Day index within the year (0-based).
 */

/**
 * Result shape for decomposing day index within a year into month + remainder.
 *
 * @typedef {Object} DecomposedMonth
 * @property {number} month - Month index (0-based, 0=Jan..11=Dec).
 * @property {number} remainingDaysAfterMonths - Day index within the month (0-based).
 */

/**
 * A lightweight UTC date component extractor based on milliseconds since Unix epoch.
 *
 * - Accepts milliseconds (can be negative).
 * - Exposes date component getters similar to JavaScript Date (UTC-based).
 * - Instances are comparable (numeric) via Symbol.toPrimitive/valueOf.
 */
class Tanggal {
  /**
   * @param {number} millis - Milliseconds since 1970-01-01T00:00:00.000Z.
   */
  constructor(millis) {
    /** @private @type {number} */
    this._millis = millis;
    /** @private @type {number} */
    this._millisInDay = this._getMillisInDay();

    const totalDays = Math.floor(millis / MILLISECONDS_IN_A_DAY);
    const { year, month, days } = this._decompose(totalDays);

    /** @private @type {number} */
    this._year = year;
    /** @private @type {number} */
    this._month = month; // 0-based
    /** @private @type {number} */
    this._date = days; // 1-based
  }

  /**
   * Enables comparison/coercion:
   * - Number(tanggal) -> millis
   * - String(tanggal) -> ISO string
   *
   * @param {"number"|"string"|"default"} hint
   * @returns {number|string}
   */
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') return this.toISOString();
    return this._millis;
  }

  /** @returns {number} Milliseconds since epoch. */
  valueOf() {
    return this._millis;
  }

  /** @returns {string} ISO-8601 string in UTC. */
  toString() {
    return this.toISOString();
  }

  /** @returns {number} Full year (UTC). */
  getFullYear() {
    return this._year;
  }

  /**
   * Returns the month number in human form (1..12).
   * @returns {number}
   */
  getMonth() {
    return this._month + 1;
  }

  /** @returns {number} Day of month (1..31). */
  getDate() {
    return this._date;
  }

  /** @returns {number} Hours (0..23) in UTC. */
  getHours() {
    return Math.floor(this._millisInDay / MILLISECONDS_IN_AN_HOUR);
  }

  /** @returns {number} Minutes (0..59) in UTC. */
  getMinutes() {
    return (
      Math.floor(this._millisInDay / MILLISECONDS_IN_A_MINUTE) %
      MINUTES_IN_AN_HOUR
    );
  }

  /** @returns {number} Seconds (0..59) in UTC. */
  getSeconds() {
    return (
      Math.floor(this._millisInDay / MILLISECONDS_IN_A_SECOND) %
      SECONDS_IN_A_MINUTE
    );
  }

  /** @returns {number} Milliseconds (0..999) in UTC. */
  getMilliseconds() {
    return this._millisInDay % MILLISECONDS_IN_A_SECOND;
  }

  /**
   * Returns an ISO 8601 / RFC 3339-like UTC timestamp:
   * YYYY-MM-DDTHH:mm:ss.sssZ
   *
   * @returns {string}
   */
  toISOString() {
    let str = String(this.getFullYear()).padStart(4, '0');
    str += '-';
    str += String(this.getMonth()).padStart(2, '0');
    str += '-';
    str += String(this.getDate()).padStart(2, '0');
    str += 'T';
    str += String(this.getHours()).padStart(2, '0');
    str += ':';
    str += String(this.getMinutes()).padStart(2, '0');
    str += ':';
    str += String(this.getSeconds()).padStart(2, '0');
    str += '.';
    str += String(this.getMilliseconds()).padStart(3, '0');
    str += 'Z';
    return str;
  }

  /**
   * Breaks down total days since epoch into year, month, and day-of-month.
   *
   * @private
   * @param {number} totalDays - Days since 1970-01-01 (can be negative).
   * @returns {DecomposedDate}
   */
  _decompose(totalDays) {
    const { year, remainingDaysAfterYears } = this._decomposeYear(totalDays);
    const { month, remainingDaysAfterMonths } = this._decomposeMonth(
      year,
      remainingDaysAfterYears,
    );
    return { year, month, days: remainingDaysAfterMonths + 1 }; // +1 because day-of-month is 1-based.
  }

  /**
   * Converts total days since epoch into a year and a 0-based day index within that year.
   *
   * @private
   * @param {number} totalDays
   * @returns {DecomposedYear}
   */
  _decomposeYear(totalDays) {
    let year = EPOCH_YEAR;
    let dayRemainder = totalDays;

    // Handle days before 1970
    while (dayRemainder < 0) {
      year--;
      dayRemainder += this._isLeapYear(year)
        ? DAYS_IN_LEAP_YEAR
        : DAYS_IN_NON_LEAP_YEAR;
    }

    // Handle days from 1970 onward
    while (true) {
      const daysInYear = this._isLeapYear(year)
        ? DAYS_IN_LEAP_YEAR
        : DAYS_IN_NON_LEAP_YEAR;
      if (dayRemainder < daysInYear) break;
      dayRemainder -= daysInYear;
      year++;
    }

    return { year, remainingDaysAfterYears: dayRemainder };
  }

  /**
   * Converts a 0-based day index within a year into month index and 0-based day index within that month.
   *
   * @private
   * @param {number} year
   * @param {number} remainingDays - 0-based day index within the year.
   * @returns {DecomposedMonth}
   */
  _decomposeMonth(year, remainingDays) {
    let dayRemainder = remainingDays;

    /** @type {Record<number, number>} */
    const monthLengths = {
      [Month.JANUARY]: 31,
      [Month.FEBRUARY]: this._isLeapYear(year) ? 29 : 28,
      [Month.MARCH]: 31,
      [Month.APRIL]: 30,
      [Month.MAY]: 31,
      [Month.JUNE]: 30,
      [Month.JULY]: 31,
      [Month.AUGUST]: 31,
      [Month.SEPTEMBER]: 30,
      [Month.OCTOBER]: 31,
      [Month.NOVEMBER]: 30,
      [Month.DECEMBER]: 31,
    };

    let month = 0;
    while (dayRemainder >= monthLengths[month]) {
      dayRemainder -= monthLengths[month];
      month++;
    }

    return { month, remainingDaysAfterMonths: dayRemainder };
  }

  /**
   * Returns milliseconds elapsed within the current UTC day (0..86,399,999),
   * using a positive modulo to handle negative epoch milliseconds correctly.
   *
   * @private
   * @returns {number}
   */
  _getMillisInDay() {
    const ms = this._millis % MILLISECONDS_IN_A_DAY;
    return (ms + MILLISECONDS_IN_A_DAY) % MILLISECONDS_IN_A_DAY;
  }

  /**
   * Checks whether a year is a leap year in the Gregorian calendar.
   *
   * @private
   * @param {number} year
   * @returns {boolean}
   */
  _isLeapYear(year) {
    return (
      year % GREGORIAN_INTERVAL === 0 ||
      (year % LEAP_YEAR_INTERVAL === 0 && year % CENTURY_INTERVAL !== 0)
    );
  }
}

while (true) {
  const inputMillis = Number(readline.question('Enter milliseconds: '));

  if (!Number.isFinite(inputMillis)) {
    console.log('Invalid milliseconds');
    continue;
  }

  const tanggal = new Tanggal(inputMillis);

  console.log('\nYear: ' + tanggal.getFullYear());
  console.log('Month: ' + tanggal.getMonth());
  console.log('Date: ' + tanggal.getDate());
  console.log('Hours: ' + tanggal.getHours());
  console.log('Minutes: ' + tanggal.getMinutes());
  console.log('Seconds: ' + tanggal.getSeconds());
  console.log('Milliseconds: ' + tanggal.getMilliseconds());
  console.log('\nISO 8601: ' + tanggal.toISOString());
  break;
}
