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

export { router as openFinanceRoutes };
