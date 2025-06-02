import { Router } from 'express';
import GroupParticipantController from '../controllers/GroupParticipantController.js';

const router = new Router();

router.post('/', GroupParticipantController.create);
router.get('/group/:groupId', GroupParticipantController.getAllByGroupId);
router.get('/user/:userId', GroupParticipantController.getAllByUserId);
router.get('/:id', GroupParticipantController.getById);
router.patch('/:id', GroupParticipantController.update);
router.delete('/:id', GroupParticipantController.delete);
router.delete(
  '/group/:groupId/user/:userId',
  GroupParticipantController.deleteByGroupIdAndUserId,
); // Rota adicional específica

export { router as groupParticipantRoutes };
