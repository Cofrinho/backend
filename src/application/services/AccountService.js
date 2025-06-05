import AccountRepository from '../../domain/repositories/AccountRepository.js';
import UserRepository from '../../domain/repositories/UserRepository.js';
import { AppError } from '../../shared/errors/AppError.js';

export default class AccountService {
  static async getBalance(user_id) {
    const user = await UserRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    const account = await AccountRepository.getAccount(user_id);

    return account.balance;
  }

  static async updateBalance(user_id, amount) {
    const account = await AccountRepository.getAccount(user_id);

    if (!account) {
      throw new AppError('Account not found.', 404);
    }

    await AccountRepository.incrementBalance(user_id, amount);

    return await AccountRepository.getAccount(user_id);
  }
}
