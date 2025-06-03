import { Expense } from '../models/Expense.js';

class ExpenseRepository {
  async findAllByGroup(groupId){

    const expenses = await Expense.findAll({
      where: { group_id: groupId },
      attributes: ['name', 'value']
    });
    return expenses;

  }

  async findByIdAndGroup(id, groupId){

  const expense = await Expense.findOne({
    where: { id, group_id: groupId },
    attributes: ['name', 'description', 'status', 'value', 'due_date']
  });
  return expense;

  }

  async findById(id){
    const expenses = await Expense.findByPk(id);
    return expenses;
  }

  async save(data){
    const expense = await Expense.create(data);
    return expense;

  }

  async findByName(name){
    const expense = await Expense.findOne({ where: { name }});
    return expense;
  }
}

export { ExpenseRepository };
