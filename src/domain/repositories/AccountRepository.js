import { Account } from '../models/Account.js';
import { AppError } from '../../shared/errors/AppError.js';

export default class AccountRepository {
  static async getAccount(user_id) {
    return await Account.findOne({
      where: {
        user_id,
      },
    });
  }
  static async incrementBalance(user_id, amount) {
    const [rowsAffected] = await Account.increment(
      { balance: amount },
      { where: { user_id } },
    );

    if (rowsAffected === 0) {
      throw new AppError('Failed to update balance.', 400);
    }
  }
}
