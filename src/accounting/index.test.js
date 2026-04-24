const {
  formatBalance,
  readBalance,
  resetBalance,
  isValidMenuChoice,
  shouldExit,
  performCredit,
  performDebit,
} = require('./index');

describe('Accounting app business logic', () => {
  beforeEach(() => {
    resetBalance(1000);
  });

  test('TC-01 View current balance', () => {
    expect(formatBalance(readBalance())).toBe('001000.00');
  });

  test('TC-02 Credit account increases balance', () => {
    const result = performCredit(100);
    expect(result.success).toBe(true);
    expect(result.newBalance).toBeCloseTo(1100);
    expect(formatBalance(readBalance())).toBe('001100.00');
  });

  test('TC-03 Debit account decreases balance when funds are sufficient', () => {
    const result = performDebit(200);
    expect(result.success).toBe(true);
    expect(result.newBalance).toBeCloseTo(800);
    expect(formatBalance(readBalance())).toBe('000800.00');
  });

  test('TC-04 Debit account rejects insufficient funds', () => {
    const result = performDebit(1500);
    expect(result.success).toBe(false);
    expect(result.error).toBe('insufficient funds');
    expect(formatBalance(readBalance())).toBe('001000.00');
  });

  test('TC-05 Balance read after credit update', () => {
    performCredit(50);
    expect(formatBalance(readBalance())).toBe('001050.00');
  });

  test('TC-06 Balance read after debit update', () => {
    performDebit(150);
    expect(formatBalance(readBalance())).toBe('000850.00');
  });

  test('TC-07 Invalid menu selection handling', () => {
    expect(isValidMenuChoice('9')).toBe(false);
    expect(isValidMenuChoice('1')).toBe(true);
  });

  test('TC-08 Exit application', () => {
    expect(shouldExit('4')).toBe(true);
    expect(shouldExit('1')).toBe(false);
  });

  test('TC-09 Data layer read/write behavior', () => {
    performCredit(500);
    expect(formatBalance(readBalance())).toBe('001500.00');
  });

  test('TC-10 No external persistence is assumed', () => {
    performCredit(100);
    resetBalance(1000);
    expect(formatBalance(readBalance())).toBe('001000.00');
  });
});
