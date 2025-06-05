export default class CreateNotificationDTO {
  constructor({ user_id, recharge_id, expenseId }) {
    this.user_id = user_id;
    this.recharge_id = recharge_id;
    this.expense_id = expenseId;
  }
}
