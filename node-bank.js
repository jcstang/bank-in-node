const filesystem = require('fs');


function totalAllTransactions(transactionTotals) {
  let total = 0;

  transactionTotals
    .forEach(function (transactionValue) {
      total = total + transactionValue;
    });

  return total;
}

function getTransactionTotalsFromAccountData(data) {
  const dataTokens = data.split(', ');

  const transactionTotals = dataTokens
    .map(function (value) {
      return parseFloat(value);
    });

  return transactionTotals;
  // return [1, 2, 3, 4, 5];
}


function getTotal(callback) {

  // get data from file
  // get transaction total values from file data
  // totall all transaction values together
  // display to the user

  filesystem.readFile('./bank.txt', { encoding: 'utf8' }, function (error, data) {
    // console.log(data);
    const transactionTotals = getTransactionTotalsFromAccountData(data)
    const total = totalAllTransactions(transactionTotals);

    // moved to else block
    // console.log(total);

    if(typeof callback === 'function') {
      callback(error, total);
    } else {
      console.log(total);
    }
  });
}

getTotal();

// const dataParseResult = getTransactionTotalsFromAccountData('1, 2.33, 4.23, -2, -2, -.25, 5, 10, 5, 3.7, -5, -10, -10');
// const expectedParseResult = [1, 2.33, 4.23, -2, -2, -.25, 5, 10, 5, 3.7, -5, -10, -10];

// areTheseEqual(dataParseResult.toString(), expectedParseResult.toString());


getTotal(function(error, total){
  areTheseEqual(total, 2.0100000000000016);
});

// areTheseEqual(4, 5);
// areTheseEqual(9, 9);

function areTheseEqual(whatIGot, whatIExpected) {
  if(whatIGot === whatIExpected) {
    console.log('Success! ' + whatIGot + ' equals ' + whatIExpected);
  } else {
    console.log('** Failure! I got: ' + whatIGot + ' I expected: ' + whatIExpected);
  }
}
