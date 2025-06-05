import { Expense } from '../models/Expense.js';
import { ExpenseMember } from '../models/ExpenseMember.js';
import { User } from '../models/User.js';
class ExpenseMemberRepository {
  async createAll(data) {
    const expenseMember = await ExpenseMember.bulkCreate(data);
    return expenseMember;
  }

  async findAllByGroupAndExpense(group_id, expense_id) {
    const expenseMembers = await ExpenseMember.findAll({
      where: {
        expense_id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Expense,
          where: { group_id },
        },
      ],
      attributes: ['amount', 'percentage_paid', 'status'],
    });
    return expenseMembers;
  }

  async findById(id) {
    return await ExpenseMember.findByPk(id);
  }

  async paid(id) {
    await ExpenseMember.update(
      { paid_at: new Date(), status: 'PAID' },
      { where: { id } },
    );
  }
}

export { ExpenseMemberRepository };
