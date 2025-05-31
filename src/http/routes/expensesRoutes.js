import { Router } from  'express';
import { ExpenseController } from '../controllers/ExpenseController.js';

const router = new Router();

router.get('/:groupId', ExpenseController.getAllByGroup);

export { router as expensesRoutes };
