import { ExpenseTransaction } from '../models/ExpenseTransaction.js';
import { Expense } from '../models/Expense.js';
import { Group } from '../models/Group.js';

class ExpenseTransactionRepository {
  async create(data) {
    return await ExpenseTransaction.create(data);
  }
  async findLastByUserId(user_id, limit = 3){
    const expenses = await ExpenseTransaction.findAll({
      where: { user_id },
      attributes: ['id','amount', 'created_at', 'description'],
      include: [{
        model: Expense,
        attributes: ['name'],
        include: [{
          model: Group,
          attributes: ['id']
      }]
    }],
      order: [['created_at', 'DESC']],
      limit
    })

    return expenses;
  }

  async findById(id){
    return await ExpenseTransaction.findByPk(id, {
      include: [
        {
          model: Expense,
          attributes: ['name'],
          include: [
            {
              model: Group,
              attributes: ['id']
            }
          ]
        }
      ]
    })
  }
}

export { ExpenseTransactionRepository };
