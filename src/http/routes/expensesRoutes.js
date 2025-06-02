import { Router } from  'express';
import { ExpenseController } from '../controllers/ExpenseController.js';

const router = new Router();

router.get('/:groupId', ExpenseController.getAllByGroup);
router.get('/:groupId/:id', ExpenseController.getByIdAndGroup);
router.post('/:groupId', ExpenseController.save);
router.get('/:id/payments', ExpenseController.getPayments);

export { router as expensesRoutes };
