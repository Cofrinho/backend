import { Router } from  'express';
import { ExpenseController } from '../controllers/ExpenseController.js';

const router = new Router();

router.get('/:id/members', ExpenseController.getMembers);
router.get('/:groupId/:id', ExpenseController.getByIdAndGroup);
router.get('/:groupId', ExpenseController.getAllByGroup);
router.post('/:groupId', ExpenseController.save);

export { router as expensesRoutes };
