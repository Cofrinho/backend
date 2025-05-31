import { Expense } from '../models/Expense.js';

class ExpenseRepository {
  async findAllByGroup(groupId){

    const expenses = await Expense.findAll({ where: { group_id: groupId }});
    return expenses;

  }
}

export { ExpenseRepository };
