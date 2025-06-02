import { ExpenseMember } from  '../models/ExpenseMember.js';

class ExpenseMemberRepository{
  async createAll(data){
    const expenseMember = await ExpenseMember.bulkCreate(data);
    return expenseMember;
  }

  async findAllByExpense(expenseId){
    const expenseMembers = await ExpenseMember.findAll({
      where: {
        expense_id: expenseId
      }
    });
    return expenseMembers;
  }

}

export { ExpenseMemberRepository };
