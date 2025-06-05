class CreateExpenseDTO {
  constructor(data, groupId) {
    this.group_id = groupId;
    this.name = data.name;
    this.description = data.description;
    this.value = data.value;
    this.balance = data.balance;
    this.due_date = data.dueDate;
    this.participants = data.participants;
    this.expense_type = data.expenseType;
  }
}

export { CreateExpenseDTO };
