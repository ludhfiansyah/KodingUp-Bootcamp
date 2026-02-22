'use strict';
const readline = require('readline-sync');

/**
 * Month index enum (0-based) following JavaScript Date convention.
 * Example: January = 0, February = 1, etc.
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

/** Milliseconds constants for time calculations */
const MILLISECOND_IN_A_MINUTE = 6e4;
const MILLISECOND_IN_AN_HOUR = 3.6e6;
const MILLISECOND_IN_A_DAY = 8.64e7;
const MILLISECOND_IN_A_WEEK = 6.048e8;
const MILLISECOND_IN_A_YEAR = 3.154e10;

/**
 * Month labels for display formatting.
 * Key = month index (0-based), value = month name.
 *
 * @type {Object<number, string>}
 */
const MONTH_LABELS = {
  [Month.JANUARY]: 'January',
  [Month.FEBRUARY]: 'February',
  [Month.MARCH]: 'March',
  [Month.APRIL]: 'April',
  [Month.MAY]: 'May',
  [Month.JUNE]: 'June',
  [Month.JULY]: 'July',
  [Month.AUGUST]: 'August',
  [Month.SEPTEMBER]: 'September',
  [Month.OCTOBER]: 'October',
  [Month.NOVEMBER]: 'November',
  [Month.DECEMBER]: 'December',
};

/**
 * Format relative timestamp into human-readable text.
 *
 * Example outputs:
 * - just now
 * - 5 minutes ago
 * - 3 hours ago
 * - 2 days ago
 * - February 4
 * - February 4 2023
 */
class TimestampFormatter {
  /**
   * @param {number} current - Current timestamp in milliseconds
   * @param {number} post - Post timestamp in milliseconds
   */
  constructor(current, post) {
    /** @private {Date} */
    this._postDate = new Date(post);

    /** @private {Date} */
    this._currentDate = new Date(current);

    /**
     * Time difference in milliseconds
     * @private {number}
     */
    this._diffMs = this._currentDate - this._postDate;
  }

  /**
   * Return formatted relative time string.
   *
   * @returns {string}
   */
  showFormattedTime() {
    // < 1 minute
    if (this._diffMs < MILLISECOND_IN_A_MINUTE) return '\nOutput: just now';

    // < 1 hour
    if (this._diffMs < MILLISECOND_IN_AN_HOUR)
      return `\nOutput: ${this._getMinutesAgo()} minutes ago`;

    // < 1 day
    if (this._diffMs < MILLISECOND_IN_A_DAY)
      return `\nOutput: ${this._getHoursAgo()} hours ago`;

    // < 1 week
    if (this._diffMs < MILLISECOND_IN_A_WEEK)
      return `\nOutput: ${this._getDaysAgo()} days ago`;

    // < 1 year → show Month Date
    if (this._diffMs < MILLISECOND_IN_A_YEAR) {
      return `\nOutput: ${MONTH_LABELS[this._postDate.getMonth()]} ${this._postDate.getDate()}`;
    }

    // >= 1 year → show Month Date Year
    return `\nOutput: ${MONTH_LABELS[this._postDate.getMonth()]} ${this._postDate.getDate()} ${this._postDate.getFullYear()}`;
  }

  /**
   * Get difference in minutes.
   * @private
   * @returns {number}
   */
  _getMinutesAgo() {
    return Math.floor(this._diffMs / MILLISECOND_IN_A_MINUTE);
  }

  /**
   * Get difference in hours.
   * @private
   * @returns {number}
   */
  _getHoursAgo() {
    return Math.floor(this._diffMs / MILLISECOND_IN_AN_HOUR);
  }

  /**
   * Get difference in days.
   * @private
   * @returns {number}
   */
  _getDaysAgo() {
    return Math.floor(this._diffMs / MILLISECOND_IN_A_DAY);
  }
}

/**
 * === CLI INPUT ===
 * User enters timestamps in milliseconds.
 */
const timestamp1 = Number(
  readline.question('Enter Current Unix Timestamp (ms): '),
);

const timestamp2 = Number(
  readline.question('Enter Post Unix Timestamp (ms): '),
);

/**
 * Create formatter instance and print result.
 */
const diff = new TimestampFormatter(timestamp1, timestamp2);
console.log(diff.showFormattedTime());
