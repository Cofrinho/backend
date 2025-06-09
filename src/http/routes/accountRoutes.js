import { Router } from 'express';
import AccountController from '../controllers/AccountController.js';

const router = new Router();
router.get('/users/balance', AccountController.getBalance);
router.get('/home', AccountController.getInfo);
router.get('/users/transactions', AccountController.getAllTransactions);

export { router as accountRoutes };
