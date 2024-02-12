import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

const DEFAULT_BANK_ACCOUNT = getBankAccount(999);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 999;
    expect(DEFAULT_BANK_ACCOUNT.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const greaterBalance = 1001;

    expect(() =>
      DEFAULT_BANK_ACCOUNT.withdraw(greaterBalance),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const greaterBalance = 1001;
    const receivingBankAccount = getBankAccount(0);

    expect(() =>
      DEFAULT_BANK_ACCOUNT.transfer(greaterBalance, receivingBankAccount),
    ).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const transferAmount = 1999;
    expect(() =>
      DEFAULT_BANK_ACCOUNT.transfer(transferAmount, DEFAULT_BANK_ACCOUNT),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositAmount = 5000;
    const updatedBalance = 5999;
    DEFAULT_BANK_ACCOUNT.deposit(depositAmount);

    expect(DEFAULT_BANK_ACCOUNT.getBalance()).toBe(updatedBalance);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 1000;
    const updatedBalance = 4999;
    DEFAULT_BANK_ACCOUNT.withdraw(withdrawAmount);

    expect(DEFAULT_BANK_ACCOUNT.getBalance()).toBe(updatedBalance);
  });

  test('should transfer money', () => {
    const user1 = getBankAccount(100);
    const user2 = getBankAccount(200);
    user1.transfer(50, user2);
    expect(user1.getBalance()).toBe(50);
    expect(user2.getBalance()).toBe(250);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await DEFAULT_BANK_ACCOUNT.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(DEFAULT_BANK_ACCOUNT, 'fetchBalance').mockResolvedValue(10);
    await DEFAULT_BANK_ACCOUNT.synchronizeBalance();
    expect(DEFAULT_BANK_ACCOUNT.getBalance()).toBe(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(DEFAULT_BANK_ACCOUNT, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(DEFAULT_BANK_ACCOUNT.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError,);
    jest.restoreAllMocks();
  });
});
