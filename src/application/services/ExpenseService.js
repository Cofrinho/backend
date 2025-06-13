import { ExpenseRepository } from '../../domain/repositories/ExpenseRepository.js';
import { ExpenseTransactionRepository } from '../../domain/repositories/ExpenseTransactionRepository.js';
import { Group } from '../../domain/models/Group.js';
import { AppError } from '../../shared/errors/AppError.js';
import { ExpenseMemberService } from './ExpenseMemberService.js';
import ExpensePaymentRepository from '../../domain/repositories/ExpensePaymentRepository.js';
import GroupService from './GroupService.js';
import CreateNotificationDTO from '../dtos/CreateNotificationDTO.js';
import NotificationService from './NotificationService.js';

class ExpenseService {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
    this.expenseTransactionRepository = new ExpenseTransactionRepository();
    this.expenseMemberService = new ExpenseMemberService();
  }

  async getAllByGroup(groupId) {
    if (!(await Group.findByPk(groupId))) {
      throw new AppError('group not found', 404);
    }

    const expenses = await this.expenseRepository.findAllByGroup(groupId);

    if (expenses.length === 0) {
      return {
        success: true,
        message: 'expenses not found',
      };
    }

    return expenses;
  }

  async getByIdAndGroup(id, groupId) {
    if (!(await Group.findByPk(groupId))) {
      throw new AppError('group not found', 404);
    }

    if (!(await this.expenseRepository.findById(id))) {
      throw new AppError('expense not found', 404);
    }

    const expense = await this.expenseRepository.findByIdAndGroup(id, groupId);
    const expenseMembers =
      await this.expenseTransactionRepository.findAllPaidByExpenseId(id);
    return {
      expense,
      members: expenseMembers,
    };
  }

  async save({
    group_id,
    name,
    description,
    value,
    balance,
    due_date,
    participants,
  }) {
    if (await this.expenseRepository.findByName(name)) {
      throw new AppError('this name of expense exists', 409);
    }

    if (!(await Group.findByPk(group_id))) {
      throw new AppError('group not found', 404);
    }

    const { id: expenseId } = await this.expenseRepository.save({
      group_id,
      name,
      description,
      value,
      balance,
      due_date,
    });

    await this.expenseMemberService.saveAll(expenseId, participants);

    return {
      success: true,
      message: 'Expense created successfully',
    };
  }

  async paymentExpense(expenseId) {
    const expense = await this.expenseRepository.findById(expenseId);

    if (!expense) {
      throw new AppError('Expense not found.', 400);
    }

    if (expense.status == 'PAID') {
      throw new AppError('Expense already paid.', 400);
    }

    const balance = Number(expense.balance);
    const value = Number(expense.value);

    if (balance < value) {
      throw new AppError(
        'Insufficient collected amount to complete this payment.',
        400,
      );
    }

    const group = await GroupService.getById(expense.group_id);

    const data = {
      expense_id: expense.id,
      user_id: group.group_owner,
      value: expense.value,
    };

    const expensePayment = await ExpensePaymentRepository.create(data);
    await this.expenseRepository.paid(expense.id);

    const createNotificationDTO = new CreateNotificationDTO({
      user_id: expensePayment.user_id,
      type: 'PAYMENT',
      reference_id: expensePayment.id,
    });

    await NotificationService.create(createNotificationDTO);

    return expensePayment;
  }
}

export { ExpenseService };
