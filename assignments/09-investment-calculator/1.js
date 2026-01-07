const readline = require("readline-sync");

// Compile-time constant: number of months in a year
const MONTHS_IN_YEAR = 12;

/**
 * Converts an annual interest rate (percentage) into a monthly rate (decimal).
 *
 * @param {number} rate - Annual interest rate in percent (e.g., 9 for 9%).
 * @returns {number} Monthly interest rate as a decimal.
 */
function getInterestRateInMonth(rate) {
  const PERCENT = 100;
  return rate / PERCENT / MONTHS_IN_YEAR;
}

/**
 * Converts an investment duration from years to months.
 *
 * @param {number} year - Investment duration in years.
 * @returns {number} Investment duration in months.
 */
function getInvestmentDurationInMonth(year) {
  return year * MONTHS_IN_YEAR;
}

/**
 * Prints the investment value at the end of each year
 * using monthly compounding.
 *
 * @param {number} value - Initial investment amount.
 * @param {number} rate - Monthly interest rate (decimal).
 * @param {number} duration - Investment duration in months.
 * @returns {void}
 */
function printEachYearInvestmentValue(value, rate, duration) {
  let year = 0;
  let investmentValue = value;

  for (let i = 1; i <= duration; i++) {
    investmentValue += investmentValue * rate;

    if (i % MONTHS_IN_YEAR === 0) {
      year++;
      console.log(`Year ${year}, value: ${investmentValue.toFixed(2)}`);
    }
  }
}

// ---- Main Program ----
const investmentAmount = +readline.question("The amount invested: ");
const annualInterestRate = +readline.question("Annual interest rate: ");
const investmentDurationInYear = +readline.question("Years to project: ");

// Convert annual inputs into monthly values
const interestRateInMonth = getInterestRateInMonth(annualInterestRate);
const investmentDurationInMonth = getInvestmentDurationInMonth(
  investmentDurationInYear
);

// Match the example output: one blank line before yearly results
console.log();

// Print output
printEachYearInvestmentValue(
  investmentAmount,
  interestRateInMonth,
  investmentDurationInMonth
);
