const readline = require('readline');

let storageBalance = 1000.00;
let rl;

function initReadline() {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  return rl;
}

function formatBalance(balance) {
  const [whole, fraction] = balance.toFixed(2).split('.');
  return whole.padStart(6, '0') + '.' + fraction;
}

function readBalance() {
  return storageBalance;
}

function writeBalance(balance) {
  storageBalance = Number(balance.toFixed(2));
}

function resetBalance(value = 1000.0) {
  storageBalance = Number(value.toFixed(2));
}

function isValidMenuChoice(choice) {
  return ['1', '2', '3', '4'].includes(choice);
}

function shouldExit(choice) {
  return choice === '4';
}

function performCredit(amount) {
  const numericAmount = Number(amount);
  if (Number.isNaN(numericAmount) || numericAmount < 0) {
    return { success: false, error: 'invalid amount' };
  }

  const currentBalance = readBalance();
  const newBalance = currentBalance + numericAmount;
  writeBalance(newBalance);

  return {
    success: true,
    newBalance,
    message: `Amount credited. New balance: ${formatBalance(newBalance)}`,
  };
}

function performDebit(amount) {
  const numericAmount = Number(amount);
  if (Number.isNaN(numericAmount) || numericAmount < 0) {
    return { success: false, error: 'invalid amount' };
  }

  const currentBalance = readBalance();
  if (currentBalance >= numericAmount) {
    const newBalance = currentBalance - numericAmount;
    writeBalance(newBalance);
    return {
      success: true,
      newBalance,
      message: `Amount debited. New balance: ${formatBalance(newBalance)}`,
    };
  }

  return {
    success: false,
    error: 'insufficient funds',
    message: 'Insufficient funds for this debit.',
  };
}

function prompt(question) {
  const interfaceInstance = initReadline();
  return new Promise((resolve) => {
    interfaceInstance.question(question, (answer) => resolve(answer.trim()));
  });
}

async function viewBalance() {
  const currentBalance = readBalance();
  console.log(`Current balance: ${formatBalance(currentBalance)}`);
}

async function creditAccount() {
  const amountText = await prompt('Enter credit amount: ');
  const result = performCredit(amountText);

  if (!result.success) {
    console.log('Invalid amount entered. Please enter a positive number.');
    return;
  }

  console.log(result.message);
}

async function debitAccount() {
  const amountText = await prompt('Enter debit amount: ');
  const result = performDebit(amountText);

  if (!result.success) {
    if (result.error === 'invalid amount') {
      console.log('Invalid amount entered. Please enter a positive number.');
    } else {
      console.log(result.message);
    }
    return;
  }

  console.log(result.message);
}

async function main() {
  let continueFlag = true;

  while (continueFlag) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const choice = await prompt('Enter your choice (1-4): ');

    switch (choice) {
      case '1':
        await viewBalance();
        break;
      case '2':
        await creditAccount();
        break;
      case '3':
        await debitAccount();
        break;
      case '4':
        continueFlag = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }

  console.log('Exiting the program. Goodbye!');
  if (rl) {
    rl.close();
  }
}

module.exports = {
  formatBalance,
  readBalance,
  writeBalance,
  resetBalance,
  isValidMenuChoice,
  shouldExit,
  performCredit,
  performDebit,
};

if (require.main === module) {
  main().catch((error) => {
    console.error('Unexpected error:', error);
    if (rl) {
      rl.close();
    }
    process.exit(1);
  });
}
