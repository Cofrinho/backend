import { User } from '../../domain/models/User.js';
import AccountRepository from '../../domain/repositories/AccountRepository.js';
import RechargeFundTransactionRepository from '../../domain/repositories/RechargeFundTransRepository.js';
import UserRepository from '../../domain/repositories/UserRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import ExpensePaymentRepository from '../../domain/repositories/ExpensePaymentRepository.js';


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

  static async getInfo(userId){
    if(!(await User.findByPk(userId))){
      throw new AppError('user not found', 404);
    }

    const account = await AccountRepository.getAccount(userId);

    if(!account){
      throw new AppError('account not found this user', 404);
    }

    const rechargeTransactions = await RechargeFundTransactionRepository.findAllByUserId(userId);
    const expensesPayment = await ExpensePaymentRepository.findAllByUserId(userId);

    const expensesPaymentsMapped = expensesPayment.map(p => ({
      id: p.id,
      name: p.Expense.name,
      date: p.created_at,
      group: `Grupo ${p.Expense.Group.id}`,
      value: p.value,
    }));

    const rechargeTransactionsMapped = rechargeTransactions.map(t => ({
      id: t.id,
      value: t.amount,
      title: 'Recarga Cofrinho',
      date: t.created_at
    }));

    const allTransactions = [...rechargeTransactionsMapped, ...expensesPaymentsMapped];

    const lastTransactions = allTransactions.sort((a, b) => b.date - a.date).slice(0, 3);

    return {
      balance: account.balance,
      transactions: lastTransactions
    }
  }
}
