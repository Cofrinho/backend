import { Router } from 'express';
import AccountController from '../controllers/AccountController.js';

const router = new Router();
router.get('/users/:userId/balance', AccountController.getBalance);
router.get('/home/:userId', AccountController.getInfo);

export { router as accountRoutes };
