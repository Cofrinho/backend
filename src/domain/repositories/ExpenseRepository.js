import { Expense } from '../models/Expense.js';
import { AppError } from '../../shared/errors/AppError.js';

class ExpenseRepository {
  async findAllByGroup(groupId) {
    const expenses = await Expense.findAll({
      where: { group_id: groupId },
      attributes: ['name', 'value', 'balance'],
    });
    return expenses;
  }

  async findByIdAndGroup(id, groupId) {
    const expense = await Expense.findOne({
      where: { id, group_id: groupId },
      attributes: [
        'id',
        'name',
        'description',
        'status',
        'value',
        'balance',
        'due_date',
      ],
    });
    return expense;
  }

  async findById(id) {
    const expenses = await Expense.findByPk(id);
    return expenses;
  }

  async save(data) {
    const expense = await Expense.create(data);
    return expense;
  }

  async findByName(name) {
    const expense = await Expense.findOne({ where: { name } });
    return expense;
  }

  async updateBalance(id, amount) {
    const [rowsAffected] = await Expense.increment(
      { balance: amount },
      { where: { id } },
    );

    if (rowsAffected === 0) {
      throw new AppError('Failed to update balance.', 400);
    }
  }

  async paid(id) {
    const [rowsAffected] = await Expense.update(
      { paid_at: new Date(), status: 'PAID' },
      { where: { id } },
    );

    if (rowsAffected === 0) {
      throw new AppError('Failed to update expense.', 400);
    }
  }
}

export { ExpenseRepository };
