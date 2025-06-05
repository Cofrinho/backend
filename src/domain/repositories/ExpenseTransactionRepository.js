import { ExpenseTransaction } from '../models/ExpenseTransaction.js';

class ExpenseTransactionRepository {
  async create(data) {
    return await ExpenseTransaction.create(data);
  }
}

export { ExpenseTransactionRepository };
