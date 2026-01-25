const readline = require('readline-sync');

// Total accounts to create (IDs: 0..9)
const TOTAL_ACCOUNTS = 10;

// Initial balance for every account
const INITIAL_BALANCE = 100;

// Store accounts as an array of objects: [{ id, balance }, ...]
const accounts = [];
for (let i = 0; i < TOTAL_ACCOUNTS; i++) {
  accounts.push({ id: i, balance: INITIAL_BALANCE });
}

// ATM menu text
const MENU =
  '\nMain menu\n' +
  '1: check balance\n' +
  '2: withdraw\n' +
  '3: deposit\n' +
  '4: exit';

/**
 * Checks whether the given id is a valid account index.
 *
 * @param {number} id - User input ID.
 * @returns {boolean} True if id is an integer within 0..accounts.length-1.
 */
function isValidId(id) {
  return Number.isInteger(id) && id >= 0 && id < accounts.length;
}

/**
 * Checks whether the given amount is valid for deposit/withdraw.
 *
 * Rules:
 * - must be a number (not NaN)
 * - must be greater than 0
 *
 * @param {number} amount - User input amount.
 * @returns {boolean} True if amount is a positive number.
 */
function isValidAmount(amount) {
  return typeof amount === 'number' && !Number.isNaN(amount) && amount > 0;
}

/**
 * The program runs continuously:
 * - Ask for account id until a valid id is entered
 * - Show menu and process transactions until user chooses "exit"
 * - Then ask for id again
 */
while (true) {
  // Keep asking for an id until the user enters a valid one
  let id = +readline.question('\nEnter an id: ');
  while (!isValidId(id)) {
    console.log('Invalid Account ID, please try again!\n');
    id = +readline.question('Enter an id: ');
  }

  // After a valid id is entered, show the menu repeatedly until user exits
  let repeatMenu = true;
  while (repeatMenu) {
    console.log(MENU);
    const choice = +readline.question('Enter a choice: ');

    if (choice === 1) {
      // Display current balance with 1 decimal place to match the sample output
      console.log(`The balance is ${accounts[id].balance.toFixed(1)}\n`);
    } else if (choice === 2) {
      // Withdraw flow: validate amount, then check sufficient funds
      const amount = +readline.question('Enter an amount to withdraw: ');

      if (!isValidAmount(amount)) {
        console.log('Invalid amount. Please enter a positive number.\n');
      } else if (amount > accounts[id].balance) {
        console.log('Insufficient funds.\n');
      } else {
        accounts[id].balance -= amount;
      }
    } else if (choice === 3) {
      // Deposit flow: validate amount then add to balance
      const amount = +readline.question('Enter an amount to deposit: ');

      if (!isValidAmount(amount)) {
        console.log('Invalid amount. Please enter a positive number.\n');
      } else {
        accounts[id].balance += amount;
      }
    } else if (choice === 4) {
      // Exit menu: return to id prompt
      repeatMenu = false;
    } else {
      // Handle invalid menu selection
      console.log(
        'Incorrect choice. Please select a valid option from the menu.\n',
      );
    }
  }
}
