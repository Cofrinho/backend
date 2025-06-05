import { Router } from 'express';
import AccountController from '../controllers/AccountController.js';

const router = new Router();

router.get('/users/:userId/balance', AccountController.getBalance);

export { router as accountRoutes };
