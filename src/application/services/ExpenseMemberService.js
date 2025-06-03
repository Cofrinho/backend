import { ExpenseMemberRepository } from "../../domain/repositories/ExpenseMemberRepository.js";

class ExpenseMemberService {
  constructor(){
    this.expenseMemberRepository = new ExpenseMemberRepository();
  }
  async saveAll(expenseId, participants){

    const participantsData = await participants.map(p => ({
      expense_id: expenseId,
      user_id: p.userId,
      amount: p.amount,
      percentage_paid: p.percentagePaid
    }))

     await this.expenseMemberRepository.createAll(participantsData);
  }

  async getMembersByExpense(expenseId){
    const expenseMembers = await this.expenseMemberRepository.findAllByExpense(expenseId);
    return expenseMembers
  }
}

export { ExpenseMemberService };
