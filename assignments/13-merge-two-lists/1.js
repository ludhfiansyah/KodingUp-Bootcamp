const readline = require('readline-sync');

const strInput1 = readline.question('Enter list1: ');
const strInput2 = readline.question('Enter list2: ');

// Merge inputs into one array (split by spaces)
const stringMerged = (strInput1 + ' ' + strInput2).split(' ');

const array = [];

array.mergedAll = function (arr, callbackFn) {
  const numbers = [];
  const alphabets = [];
  const symbols = [];

  // 1) Categorize tokens into numbers / alphabets / symbols
  for (let value of arr) {
    if (value === '') continue;

    const n = +value;
    if (value.trim() !== '' && !Number.isNaN(n)) {
      numbers.push(n);
    } else {
      const isLower = value >= 'a' && value <= 'z';
      const isUpper = value >= 'A' && value <= 'Z';
      if (isLower || isUpper) alphabets.push(value);
      else symbols.push(value);
    }
  }

  // 2) Sort numbers ascending
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] > numbers[i + 1]) {
        const tmp = numbers[i];
        numbers[i] = numbers[i + 1];
        numbers[i + 1] = tmp;
        swapped = true;
      }
    }
  } while (swapped);

  // Helper: lowercase group first, then uppercase
  function alphaRank(ch) {
    if (ch >= 'a' && ch <= 'z') return 0;
    if (ch >= 'A' && ch <= 'Z') return 1;
    return 2;
  }

  // 3) Sort alphabets: a-z then A-Z
  do {
    swapped = false;
    for (let i = 0; i < alphabets.length - 1; i++) {
      const a = alphabets[i];
      const b = alphabets[i + 1];
      const shouldSwap =
        alphaRank(a) > alphaRank(b) || (alphaRank(a) === alphaRank(b) && a > b);

      if (shouldSwap) {
        const tmp = alphabets[i];
        alphabets[i] = alphabets[i + 1];
        alphabets[i + 1] = tmp;
        swapped = true;
      }
    }
  } while (swapped);

  // 4) Sort symbols by default string order
  do {
    swapped = false;
    for (let i = 0; i < symbols.length - 1; i++) {
      if (symbols[i] > symbols[i + 1]) {
        const tmp = symbols[i];
        symbols[i] = symbols[i + 1];
        symbols[i + 1] = tmp;
        swapped = true;
      }
    }
  } while (swapped);

  // 5) Merge: alphabets -> numbers -> symbols
  const final = [];
  for (let i = 0; i < alphabets.length; i++) final.push(alphabets[i]);
  for (let i = 0; i < numbers.length; i++) final.push(numbers[i]);
  for (let i = 0; i < symbols.length; i++) final.push(symbols[i]);

  callbackFn(final);
};

// 6) Print output
array.mergedAll(stringMerged, (arr) => {
  // Build output string
  let joined = '';
  for (let i = 0; i < arr.length; i++) {
    joined += i === 0 ? arr[i] : ` ${arr[i]}`;
  }
  console.log('The merged list is ' + joined);
});
