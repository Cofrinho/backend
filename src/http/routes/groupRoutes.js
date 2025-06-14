import { Router } from 'express';
import GroupController from '../controllers/GroupController.js';
import { ExpenseController } from '../controllers/ExpenseController.js';

const router = new Router();

router.get('/:id/expenses', ExpenseController.getAllByGroup);
router.get('/:id/expenses/:expenseId', ExpenseController.getByIdAndGroup);
router.get('/:id/expenses/:expenseId/members', ExpenseController.getMembers);
router.post('/:groupId/expenses', ExpenseController.save);
router.post(
  '/expenses/:expenseId/transactions',
  ExpenseController.createExpenseTransaction,
);
router.post('/expenses/:expenseId/payments', ExpenseController.paymentsExpense);

router.get('/', GroupController.getAll);
router.get('/:id', GroupController.getById);
router.get('/user/:userId', GroupController.getByUserId);
router.get('/access/:accessCode', GroupController.getByAccessCode);
router.post('/', GroupController.create);
router.patch('/:id', GroupController.update);
router.delete('/:id', GroupController.delete);

export { router as groupRoutes };
