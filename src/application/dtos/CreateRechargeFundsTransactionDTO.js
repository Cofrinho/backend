class CreateRechargeFundsTransactionDTO {
  constructor({ amount, user_id, institution_id, type }) {
    this.amount = amount;
    this.user_id = user_id;
    this.institution_id = institution_id;
    this.type = type;
  }
}

export { CreateRechargeFundsTransactionDTO };
