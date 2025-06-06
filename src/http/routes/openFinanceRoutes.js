import { Router } from 'express';
import OpenFinanceController from '../controllers/OpenFinanceController.js';

const router = new Router();

router.post(
  '/users/:userId/institutions/:institutionId/consents',
  OpenFinanceController.createConsent,
);
router.patch('/consents/:consentId', OpenFinanceController.updateConsent);
router.delete('/consents/:consentId', OpenFinanceController.revokeConsent);
router.get('/consents/:consentId', OpenFinanceController.getByIdConsent);
router.get('/users/:userId/consents', OpenFinanceController.getAllConsent);
router.get(
  '/users/:userId/institutions/:institutionId/balance',
  OpenFinanceController.getBalanceByInstitution,
);
router.post(
  '/users/:userId/institutions/:institutionId/recharge',
  OpenFinanceController.createRecharge,
);

router.get('/users/:userId/balance', OpenFinanceController.getHomeOpenFinance);

export { router as openFinanceRoutes };
