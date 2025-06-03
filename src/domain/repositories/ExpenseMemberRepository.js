import { ExpenseMember } from  '../models/ExpenseMember.js';
import { User } from '../models/User.js';
class ExpenseMemberRepository{
  async createAll(data){
    const expenseMember = await ExpenseMember.bulkCreate(data);
    return expenseMember;
  }

  async findAllByExpense(expense_id){
    const expenseMembers = await ExpenseMember.findAll({
      where: {
        expense_id
      },
      include: [{
        model: User,
        attributes: ['name']
      }],
      attributes: ['amount', 'percentage_paid', 'status']
    });
    return expenseMembers;
  }

}

export { ExpenseMemberRepository };
