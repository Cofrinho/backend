import { ExpenseTransactionRepository } from '../../domain/repositories/ExpenseTransactionRepository.js';
import { ExpenseMemberRepository } from '../../domain/repositories/ExpenseMemberRepository.js';
import { ExpenseRepository } from '../../domain/repositories/ExpenseRepository.js';
import AccountRepository from '../../domain/repositories/AccountRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import CreateNotificationDTO from '../dtos/CreateNotificationDTO.js';
import NotificationService from './NotificationService.js';

class ExpenseTransactionService {
  constructor() {
    this.expenseTransactionRepository = new ExpenseTransactionRepository();
    this.expenseMemberRepository = new ExpenseMemberRepository();
    this.expenseRepository = new ExpenseRepository();
  }
  async createExpenseTransaction(expenseId, userId) {
    const expenseMember =
      await this.expenseMemberRepository.findByExpenseIdAndUserId(
        expenseId,
        userId,
      );

    if (expenseMember.status === 'PAID') {
      throw new AppError(`You ve already paid this expense.`, 404);
    }

    if (!expenseMember) {
      throw new AppError('Expense member not found.', 404);
    }

    const expense = await this.expenseRepository.findById(
      expenseMember.expense_id,
    );

    if (!expense) {
      throw new AppError('Expense not found.', 404);
    }

    const account = await AccountRepository.getAccount(expenseMember.user_id);

    const balance = Number(account.balance);
    const amount = Number(expenseMember.amount);

    if (balance < amount) {
      throw new AppError(
        'Insufficient account balance to complete the payment.',
        400,
      );
    }

    const data = {
      user_id: expenseMember.user_id,
      expense_id: expense.id,
      amount: expenseMember.amount,
      description: expense.description,
    };

    const expenseTransaction =
      await this.expenseTransactionRepository.create(data);

    await AccountRepository.incrementBalance(data.user_id, -data.amount);
    await this.expenseMemberRepository.paid(expenseMember.id);
    await this.expenseRepository.updateBalance(data.expense_id, data.amount);

    const createNotificationDTO = new CreateNotificationDTO({
      user_id: expenseTransaction.user_id,
      type: 'TRANSACTION',
      reference_id: expenseTransaction.id,
    });

    await NotificationService.create(createNotificationDTO);

    return expenseTransaction;
  }
}

export { ExpenseTransactionService };
