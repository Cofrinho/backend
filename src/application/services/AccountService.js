import { User } from '../../domain/models/User.js';
import AccountRepository from '../../domain/repositories/AccountRepository.js';
import RechargeFundTransactionRepository from '../../domain/repositories/RechargeFundTransRepository.js';
import UserRepository from '../../domain/repositories/UserRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import ExpensePaymentRepository from '../../domain/repositories/ExpensePaymentRepository.js';
import NotificationRepository from '../../domain/repositories/NotificationRepository.js';
import { ExpenseTransactionRepository } from '../../domain/repositories/ExpenseTransactionRepository.js';

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

  static async getInfo(userId) {
    if (!(await User.findByPk(userId))) {
      throw new AppError('user not found', 404);
    }

    const account = await AccountRepository.getAccount(userId);

    if (!account) {
      throw new AppError('account not found this user', 404);
    }

    const allTransactions = await this.getAllTransactions(userId, 3);

    const countNotifications =
      await NotificationRepository.countByNotSeen(userId);

    return {
      balance: account.balance,
      notifications: countNotifications,
      transactions: allTransactions,
    };
  }

  static async getAllTransactions(userId, limit = 4) {
    const expenseTransactionRepository = new ExpenseTransactionRepository();

    const [recharges, payments, transactions] = await Promise.all([
      RechargeFundTransactionRepository.findLastByUserId(userId, limit),
      ExpensePaymentRepository.findLastByUserId(userId, limit),
      expenseTransactionRepository.findLastByUserId(userId, limit),
    ]);

    const mapTransaction = (t, type) => {
      const transactionType = type === 'recharge' ? 'in' : type;

      const base = {
        id: t.id,
        value: t.amount || t.value,
        date: t.created_at,
        type: transactionType,
      };

      if (type === 'recharge') {
        return { ...base, title: 'Recarga Cofrinho' };
      } else {
        return {
          ...base,
          title: t.Expense.name,
          group: `Grupo ${t.Expense.Group.id}`,
        };
      }
    };

    const allTransactions = [
      ...recharges.map((t) => mapTransaction(t, 'recharge')),
      ...payments.map((t) => mapTransaction(t, 'payment')),
      ...transactions.map((t) => mapTransaction(t, 'transaction')),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
    return allTransactions;
  }
}
