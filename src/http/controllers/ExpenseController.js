import { ExpenseService } from '../../application/services/ExpenseService.js';
import { ExpenseMemberService } from '../../application/services/ExpenseMemberService.js';
import { createExpenseSchema } from '../../http/validations/expenseValidator.js';
import { ZodError } from 'zod';
import { CreateExpenseDTO } from '../../application/dtos/CreateExpenseDTO.js';

const expenseService = new ExpenseService();
const expenseMemberService = new ExpenseMemberService();

const ExpenseController = {
  async getAllByGroup(req, res) {
    try {
      const expense = await expenseService.getAllByGroup(req.params.groupId);
      return res.status(200).json(expense);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  async getByIdAndGroup(req, res) {
    try {
      const expenses = await expenseService.getByIdAndGroup(
        req.params.id,
        req.params.groupId,
      );
      return res.status(200).json(expenses);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  async save(req, res) {
    const body = req.body;
    const { groupId } = req.params;
    try {
      const bodyValidated = createExpenseSchema.parse(body);
      const expenseDTO = new CreateExpenseDTO(bodyValidated, groupId);
      const message = await expenseService.save(expenseDTO);
      return res.status(201).json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors
          .map((err) => err.message)
          .join(', ');
        return res.status(400).json({ error: formattedErrors });
      }

      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  async getPayments(req, res) {
    const { id } = req.params;
    try {
      const payments = await expenseMemberService.getPaymentsByExpense(id);
      return res.status(200).json(payments);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },
};

export { ExpenseController };
