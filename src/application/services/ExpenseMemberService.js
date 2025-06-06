import { ExpenseMemberRepository } from '../../domain/repositories/ExpenseMemberRepository.js';
import { ExpenseRepository } from '../../domain/repositories/ExpenseRepository.js';
import GroupRepository from '../../domain/repositories/GroupRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import CreateNotificationDTO from '../dtos/CreateNotificationDTO.js';
import NotificationService from './NotificationService.js';

class ExpenseMemberService {
  constructor() {
    this.expenseMemberRepository = new ExpenseMemberRepository();
    this.expenseRepository = new ExpenseRepository();
  }
  async saveAll(expenseId, participants) {
    const participantsData = await participants.map((p) => ({
      expense_id: expenseId,
      user_id: p.userId,
      amount: p.amount,
      percentage_paid: p.percentagePaid,
    }));

    await this.expenseMemberRepository.createAll(participantsData);
    
    for (const participant of participants) {
      const createNotificationDTO = new CreateNotificationDTO({
        user_id: participant.userId,
        type: 'EXPENSE',
        reference_id: expenseId,
      });
      await NotificationService.create(createNotificationDTO);
    }
  }

  async getMembersByExpense(groupId, expenseId) {

    if(!(await GroupRepository.findById(groupId))){
      throw new AppError(('group not found', 404));
    }

    if(!(await this.expenseRepository.findById(expenseId))){
      throw new AppError('expense not found', 404);
    }

    if(!(await this.expenseRepository.findByIdAndGroup(expenseId, groupId))){
      throw new AppError('expense not found', 404);
    }

    const expenseMembers =
      await this.expenseMemberRepository.findAllByExpense(
        expenseId,
      );
    return expenseMembers;
  }
}

export { ExpenseMemberService };