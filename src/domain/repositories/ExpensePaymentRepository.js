import { Expense } from '../models/Expense.js';
import { Group } from '../models/Group.js';
import { ExpensePayment } from '../models/ExpensePayment.js';

export default class ExpensePaymentRepository {
  static async create(data) {
    return ExpensePayment.create(data);
  }

  static async findLastByUserId(userId, limit = 3){
    const expenses = await ExpensePayment.findAll({
      where: { user_id: userId},
      attributes: ['id','value', 'expense_id', 'created_at'],
      include: [
        {
          model: Expense,
          attributes: ['name'],
          include: [{
            model: Group,
            attributes: ['id']
          }]
        }
      ],
      order: [['created_at', 'DESC']],
      limit
    });

    return expenses;
  }
}
