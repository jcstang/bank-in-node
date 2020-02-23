// we need the fs module for reading and writing
const fileSystem = require('fs');
const args = process.argv.slice(2);

function total() {
  // read text form bank.txt, total when we come back
  readFile('./bank.txt', { encoding: 'utf8' }, function (error, transactions) {
    // check if there was an error, and exit
    if (error) {
      // display the error we care about
      console.log(error);

      return; // return nothing, just exit
    }

    console.log(transactions);

    const transactionAmounts = transactions
      .split(',') // creates an array
      // Create a new array of numbers from our split string
      .map(function (transactionValue) {
        // This is run for every value in the array
        return parseFloat(transactionValue);
      });

    let total = 0;

    // Loop through each transaction amount and add it to the total
    transactionAmounts.forEach(function (transactionAmount) {
      total = total + transactionAmount;
    });

    console.log(toCurrency(total));
  })
}

function toCurrency(value) {
  return Math.floor(value * 100) / 100
}

function deposit(depositAmount) {
  appendFile('bank.txt', ', ' + depositAmount, function(error) {
    if(error) {
      console.log(error);
      return;
    }

    total();
  })
}

function withdrawal() {
  deposit('-' + args[1]);
}

if (args[0] === 'deposit') {
  deposit(args[1]);
} else if(args[0] === 'withdrawal') {
  withdrawal();
}else {
  total();
}
