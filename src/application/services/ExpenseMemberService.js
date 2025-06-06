import { ExpenseMemberRepository } from '../../domain/repositories/ExpenseMemberRepository.js';
import CreateNotificationDTO from '../dtos/CreateNotificationDTO.js';
import NotificationService from './NotificationService.js';

class ExpenseMemberService {
  constructor() {
    this.expenseMemberRepository = new ExpenseMemberRepository();
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
    const expenseMembers =
      await this.expenseMemberRepository.findAllByGroupAndExpense(
        groupId,
        expenseId,
      );
    return expenseMembers;
  }
}

export { ExpenseMemberService };
