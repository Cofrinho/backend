import { ExpensePayment } from '../models/ExpensePayment.js';

export default class ExpensePaymentRepository {
  static async create(data) {
    return ExpensePayment.create(data);
  }
}
