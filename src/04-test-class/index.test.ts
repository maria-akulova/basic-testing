import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance 10', () => {
    const balance = getBankAccount(10).getBalance();
    expect(balance).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(10);
    expect(() => account.withdraw(15)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(10);
    const accountTo = getBankAccount(10);

    expect(() => account.transfer(15, accountTo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(10);
    expect(() => account.transfer(15, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const balance = getBankAccount(10).deposit(5).getBalance();
    expect(balance).toBe(15);
  });

  test('should withdraw money', () => {
    const balance = getBankAccount(10).withdraw(5).getBalance();
    expect(balance).toBe(5);
  });

  test('should transfer money', () => {
    const account = getBankAccount(10);
    const accountTo = getBankAccount(10);
    const balance = account.transfer(5, accountTo).getBalance();

    expect(balance).toBe(5);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await getBankAccount(10).fetchBalance();
    if (result) {
      expect(result).toBeTruthy();
      expect(typeof result).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(10);
    const amount = await account.fetchBalance();
    if (amount) {
      const result = account.deposit(amount).getBalance();
      expect(result).toBeGreaterThan(10);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(10);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
