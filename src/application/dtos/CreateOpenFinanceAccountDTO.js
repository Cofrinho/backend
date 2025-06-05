class CreateOpenFinanceAccountDTO {
  constructor({
    user_id,
    institution_id,
    agency,
    account_number,
    is_active,
    expired_at,
  }) {
    this.user_id = user_id;
    this.institution_id = institution_id;
    this.agency = agency;
    this.account_number = account_number;
    this.is_active = is_active;
    this.expired_at = expired_at ?? null;
  }
}

export { CreateOpenFinanceAccountDTO };
